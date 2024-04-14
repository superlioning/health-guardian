const { QnaQueryType, QnaMutations } = require('../controllers/qnaController');
const { GraphQLSchema } = require('graphql');

const schema = new GraphQLSchema({
    query: QnaQueryType,
    mutation: QnaMutations
});

module.exports = schema;
