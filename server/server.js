const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const expressGraphQL = require('express-graphql').graphqlHTTP
const schema = require('./routes/userRoutes')
const qnaSchema = require('./routes/qnaRoutes')
const serverless = require("serverless-http");

require('dotenv').config()


/**
 * Create Express app and enable necessary middlewares
 * Connect to MongoDB database with connection string from .env file
 * Define route for GraphQL endpoint
 */


const app = express()

// Set up MongoDB connection
const connectionString = process.env.MONGODB_CONNECTION_STRING
mongoose.connect(connectionString)
    .then(res => app.listen(process.env.PORT))
    .catch(err => console.log(err))

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());

// GraphQL endpoint configuration 
app.use('/users', expressGraphQL({
    schema: schema,
    graphiql: true
}));

// GraphQL endpoint configuration for QnA for testing back end.
app.use('/qna', expressGraphQL({
    schema: qnaSchema,
    graphiql: true
}));

// Start express server
const PORT = 4000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

module.exports.handler = serverless(app);