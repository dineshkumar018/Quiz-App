import React, { useCallback, useEffect, useMemo, useState } from "react";
import QuizLogo from "./ui/QuizLogo";
import ProgressBar from "./ui/ProgressBar";
import Card from "./ui/Card";
import clsx from "clsx";
import Button from "./ui/Button";
import NextArrowIcon from "../assets/chevron-left-rounded.svg";
import IncorrectCross from "../assets/incorrect-cross.svg";
import correctCheckmark from "../assets/white-checkmark.svg";
import useQuestionContext from "../hooks/useQuestionContext";
import validateAnswerAPI from "../api/validateAnswerAPI.js";
import handleError from "../utils/handleError";

const QuestionScreen = ({ showResultScreen }) => {
  const {
    activeQuestion,
    activeQuestionNumber,
    totalQuestions,
    updateQuestionStatus,
    activateNextQuestion,
    correctAnswers,
  } = useQuestionContext();
  const [userSelectedOption, setUserSelectedOption] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResponse = useCallback(
    function (responseData) {
      const isAnswerCorrect = responseData.status === 1;
      updateQuestionStatus(isAnswerCorrect);
    },
    [updateQuestionStatus],
  );

  const handleClick = useCallback(
    (selectedOption) => {
      console.log(selectedOption);
      setUserSelectedOption(selectedOption.id);

      validateAnswerAPI(
        activeQuestion._id,
        selectedOption,
        handleResponse,
        handleError,
        setLoading,
      );
    },
    [activeQuestion._id, handleResponse],
  );

  const hasAttempted = Boolean(userSelectedOption);
  useEffect(() => {
    setUserSelectedOption("");
  }, [activeQuestion._id]);

  const isFinalQuesstion = useMemo(
    () => activeQuestionNumber === totalQuestions,
    [activeQuestionNumber, totalQuestions],
  );
  
  return (
    <section className="question-section">
      <QuizLogo />
      <ProgressBar />
      <div className="question-content">
        <Card className="question-card">
          <div className="question-number">
            {activeQuestionNumber}/{totalQuestions}
          </div>
          <p className="question-text">{activeQuestion.question}</p>
          <div className="question-options">
            {activeQuestion.options.map((option) => {
              const isThisSelected = option.id === userSelectedOption;
              const isOptionCorrect =
                isThisSelected && activeQuestion.isAnswerCorrect;
              const isOptionIncorrect =
                isThisSelected && !activeQuestion.isAnswerCorrect;
              const isLoading = !isThisSelected && loading;
              return (
                <button
                  className={clsx(
                    "option",
                    !hasAttempted && "not-answered",
                    isLoading && "loading",
                    isOptionCorrect && "correct-answer",
                    isOptionIncorrect && "incorrect-answer",
                  )}
                  key={activeQuestion._id + "-" + option.id}
                  onClick={() => handleClick(option)}
                  disabled={hasAttempted}
                >
                  {option.value}
                  {isThisSelected ? (
                    <span
                      className={clsx(
                        isOptionCorrect && "correct-radio",
                        isOptionIncorrect && "incorrect-radio",
                      )}
                    >
                      {isOptionCorrect && <img src={correctCheckmark} />}
                      {isOptionIncorrect && <img src={IncorrectCross} />}
                    </span>
                  ) : (
                    <span className="unattempted-radio"></span>
                  )}
                </button>
              );
            })}
          </div>
          {isFinalQuesstion ? (
            <Button onClick={showResultScreen} disabled={!activeQuestion.hasAttempted} size="small" >Submit</Button>
          ) : (
            <Button
              onClick={activateNextQuestion}
              disabled={!activeQuestion.hasAttempted}
              icon={<img src={NextArrowIcon} alt="next" />}
              iconPosition="right"
              size="small"
            >
              Next
            </Button>
          )}
        </Card>
      </div>
    </section>
  );
};

export default QuestionScreen;
