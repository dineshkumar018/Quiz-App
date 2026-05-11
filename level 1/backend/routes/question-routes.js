const express = require("express");
const {fetchQuestions, validate_answer} = require("../controller/question-controller")
const router = express.Router();

router.get("/", fetchQuestions); //controller name
router.post("/validate-answer",validate_answer);

module.exports = router;
