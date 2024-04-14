const mongoose = require("mongoose");

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

const qnaSchema = new mongoose.Schema({
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
});

const QnA = mongoose.model("QnA", qnaSchema);

module.exports = QnA;
