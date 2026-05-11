import React, { useCallback, useState } from "react";
import QuizLogo from "./ui/QuizLogo";
import QuestionBubble from "../assets/question-bubble.png";
import GreenCheckmark from "../assets/check-circle-green.svg";
import Card from "./ui/Card";
import Button from "./ui/Button.jsx";
import fetchQuestionAPI from "../api/fetchQuestion.js";
import useQuestionContext from "../hooks/useQuestionContext.jsx";
import handleError from "../utils/handleError.js";

const WelcomeScreen = ({ showQuestionScreen }) => {
  const [loading, setLoading] = useState(false);
  const { processQuestions } = useQuestionContext();

  const handleResponse = useCallback(
    function (responseData) {
      console.log(responseData.questions);
      processQuestions(responseData.questions);
      showQuestionScreen();
    },
    [processQuestions, showQuestionScreen],
  );

  const beginQuiz = useCallback(function () {
    fetchQuestionAPI(handleResponse, handleError, setLoading);
  },[handleResponse]);
  return (
    <section className="welcome-section">
      <QuizLogo size="large" />
      <Card className="welcome-card">
        <div className="welcome-card-content-top">
          <img src={QuestionBubble} alt="image not available" width={172} />
          <h2>Are you ready?</h2>
          <h3>Let's see how many question you can answer:</h3>
        </div>
        <ul className="welcome-card-list">
          <li className="list-item">
            <img src={GreenCheckmark} alt="" />
            These are 30 questions
          </li>
          <li className="list-item">
            <img src={GreenCheckmark} alt="" />
            you need to pick 1 answer
          </li>
        </ul>
        <Button
          size="large"
          onClick={beginQuiz}
          loading={loading}
          loadingText="Starting the Quiz"
        >
          I'm Ready - Start the Quiz
        </Button>
      </Card>
    </section>
  );
};

export default WelcomeScreen;
