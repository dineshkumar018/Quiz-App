import React from "react";
import useQuestionState from "../../hooks/useQuestionState"

const ProgressBar = () => {
  const {activeQuestionNumber, totalQuestions} = useQuestionState()
  return (
    <progress
      className="progress progress-success w-full"
      value={activeQuestionNumber}      // current question number (static)
      max={totalQuestions}       // total questions (static)
    ></progress>
  );
};

export default ProgressBar;
