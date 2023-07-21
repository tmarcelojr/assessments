const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizSchema = new Schema({
  category: String,
  question: {
    type: String,
    required: true,
  },
  answers: {
    type: [
      {
        choice: {
          type: String,
          required: true,
        },
        data: {
            type: Schema.Types.Mixed,
            required: true,
        },
        isCorrect: {
          type: Boolean,
          required: true,
        },
      },
    ],
    required: true,
    validate: {
      validator: (v) =>
        v.length === 4 && v.filter((answer) => answer.isCorrect).length === 1,
      message:
        "Answers array must contain exactly 4 elements, with exactly 1 correct answer.",
    },
  },
});

module.exports = mongoose.model("Quiz", quizSchema);
