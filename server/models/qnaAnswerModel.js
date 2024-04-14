// Import Mongoose
const mongoose = require("mongoose");

// Define subdocument schema for answer
const answerSchema = new mongoose.Schema({
    text: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    startIndex: {
      type: Number,
      required: true,
    },
    endIndex: {
      type: Number,
      required: true,
    },
  });

// Define schema for QnA
const qnaAnswerSchema = new mongoose.Schema(
  {
    symptom: {
      type: String,
      required: true,
    },
    passage: {
      type: String,
      required: true,
    },
    questionList: {
      type: [String],
      required: true,
    },
    answers: [
      {
        question: {
          type: String,
        },
        answer: {
          type: [answerSchema],
        },
      },
    ],
  },
  { timestamps: true, expires: 5 * 24 * 60 * 60 } //5 day expiry 
);

// Define QnA model
const QnAAnswer = mongoose.model("QnAAnswer", qnaAnswerSchema);

module.exports = QnAAnswer;
