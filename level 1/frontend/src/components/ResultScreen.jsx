import Button from "./ui/Button";
import Card from "./ui/Card";
import QuizLogo from "./ui/QuizLogo";
import RestartIconPath from "../assets/restart-icon.svg";
import Trophy from "../assets/trophy.png";
import { useCallback, useState } from "react";
import useQuestionContext from "../hooks/useQuestionContext";
import handleError from "../utils/handleError";
import fetchQuestionAPI from "../api/fetchQuestion";

function RestartIcon() {
  return <img src={RestartIconPath} alt="" />;
}

function ResultScreen({ showQuestionScreen }) {
  const [loading, setLoading] = useState(false);
  const { totalQuestions, correctAnswers, processQuestions } = useQuestionContext();

  const handleResponse = useCallback(
    function (responseData) {
      console.log(responseData.questions);
      processQuestions(responseData.questions);
      showQuestionScreen();
    },
    [processQuestions, showQuestionScreen],
  );

  const beginQuiz = useCallback(
    function () {
      fetchQuestionAPI(handleResponse, handleError, setLoading);
    },
    [handleResponse],
  );
  //   const totalQuestions = 10;
  //   const correctAnswers = 7;

  let feedbackText = "YOU DID OKAY.";
  const percentage = "correctAnswers / totalQuestions" * 100;

  if (percentage >= 90) {
    feedbackText = "EXCELLENT JOB!";
  } else if (percentage >= 70) {
    feedbackText = "GOOD JOB!";
  } else if (percentage >= 50) {
    feedbackText = "YOU DID OKAY.";
  } else {
    feedbackText = "YOU CAN DO BETTER!";
  }

  return (
    <section className="result-section">
      <QuizLogo />
      <Card className="result-card">
        <div className="result-icon-wrapper">
          <img src={Trophy} alt="" />
        </div>
        <h1 className="result-text">{feedbackText}</h1>
        <div className="result-details">
          <span className="correct-answers">{correctAnswers} </span>
          <p>
            Questions <br /> out of
            <span className="weight-700">{totalQuestions}</span>
          </p>
        </div>
        <Button
          onClick={beginQuiz}
          loading={loading}
          loadingText="Restarting..."
          icon={<RestartIcon />}
          iconPosition="right"
          size="small"
        >
          Restart
        </Button>
      </Card>
    </section>
  );
}

export default ResultScreen;
