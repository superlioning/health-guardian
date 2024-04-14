const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLFloat,
  GraphQLInt,
} = require("graphql");
const QnA = require("../models/qnaModel");
const QnAAnswer = require("../models/qnaAnswerModel");
const qna = require("@tensorflow-models/qna");
require("@tensorflow/tfjs-node");

/**
 * Controller handling QnA Symptoms which is coming in from user input.
 * Passage and Question list is taken from the data file
 * @author Awas Jomail
 */

// Define AnswerType
const AnswerType = new GraphQLObjectType({
  name: "Answer",
  fields: () => ({
    text: { type: GraphQLString },
    score: { type: GraphQLFloat },
    startIndex: { type: GraphQLInt },
    endIndex: { type: GraphQLInt },
  }),
});

// Define QnAType
const QnAType = new GraphQLObjectType({
  name: "QnA",
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLString) },
    symptom: { type: GraphQLNonNull(GraphQLString) },
    passage: { type: GraphQLNonNull(GraphQLString) },
    questionList: { type: GraphQLNonNull(GraphQLList(GraphQLString)) },
    answers: { type: GraphQLList(AnswerType) },
  }),
});

//QnA Query for getting all data, this is not necessary for functionality, but is needed for graphql API
const QnaQueryType = new GraphQLObjectType({
  name: "query",
  description: "Query for QnA data",
  fields: () => ({
    allQnaData: {
      type: new GraphQLList(QnAType),
      description:
        "List of All info stored in MongoDb back end with symptom, passage to be used in mutation, and question list",
      resolve: async () => {
        try {
          const allQnaData = await QnA.find();
          return allQnaData;
        } catch (error) {
          throw new Error("Failed to fetch users");
        }
      },
    },
  }),
});

// QnA mutations
const QnaMutations = new GraphQLObjectType({
  name: "Mutation",
  description:
    "Running the data loading and retrieving the answers in this mutation",
  fields: () => ({
    createQnA: {
      type: QnAType,
      args: {
        symptom: { type: GraphQLString },
      },
      resolve: async (parent, { symptom }) => {
        try {
          // Fetch passage from MongoDB based on symptom
          const qnaDocument = await QnA.findOne({ symptom });

          // Check if document exists
          if (!qnaDocument) {
            throw new Error("QnA document not found for the given symptom");
          }

          // Extract passage from the retrieved document
          const passage = qnaDocument.passage;
          const questionList = qnaDocument.questionList;

          // Load the model
          require("@tensorflow/tfjs");
          const model = await qna.load();

          // Finding the answers
          const answersArray = [];
          const bestAnswers = [];

          // Iterate through question list
          for (const question of questionList) {
            // Find answer for each question
            const answers = await model.findAnswers(question, passage);

            // Store best answer and all answers
            const bestAnswer = answers[0];
            answersArray.push({ question, answer: bestAnswer });
            bestAnswers.push(bestAnswer);
          }

          // Save data to new model
          const newQnAAnswer = new QnAAnswer({
            symptom,
            passage,
            questionList,
            answers: answersArray
          });
          const savedQnAAnswer = await newQnAAnswer.save();
          return savedQnAAnswer;
        } catch (error) {
          console.error("Error creating QnA:", error.message);
          throw new Error("Error creating QnA");
        }
      },
    },
  }),
});

module.exports = {
  QnaQueryType,
  QnaMutations,
};
