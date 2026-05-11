const QuestionModel = require("../models/question-model");

const MAX_QUESTION_COUNT = 10;
const fetchQuestions = async (req, res) => {
  try {
    const questions = await QuestionModel.aggregate([
      { $sample: { size: MAX_QUESTION_COUNT } },
      { $project: { question: 1, options: 1,  } },
    ]);
    res.status(200).json({ questions });
  } catch (error) {
    console.error("error fetching questions :", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const validate_answer = async (req, res) => {
  try {
    const { id, answer } = req.body;

    if (!id || !answer || !answer.id || !answer.value) {
      return res.status(400).json({ message: "Invalid request" });
    }

    const question = await QuestionModel.findById(id);

    if (!question) {
      return res.status(400).json({ message: "Question does not exist" });
    }

    if (
      question.answer.id == answer.id &&
      question.answer.value == answer.value
    ) {
      return res.status(200).json({ status: 1, message: "Correct answer :)" });
    }

    return res.status(200).json({ status: 0, message: "wrong answer :(" });
  } catch (error) {
    console.error("Error creatin task:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
module.exports = { fetchQuestions, validate_answer };
