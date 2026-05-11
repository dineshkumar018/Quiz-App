import React, { useMemo } from "react";
import useQuestionContext from "../../hooks/useQuestionContext";
import clsx from "clsx"

const ProgressBar = () => {
  const {activeQuestionNumber, totalQuestions} = useQuestionContext()

  const isFinalQuestion = useMemo(
    () => activeQuestionNumber === totalQuestions,[activeQuestionNumber, totalQuestions],
  )
  const progressPercent = useMemo(
    () => `${((activeQuestionNumber / totalQuestions)*100).toFixed(2)}%`,[activeQuestionNumber, totalQuestions]
  )

  return (
    <progress value={activeQuestionNumber} max={totalQuestions} className={clsx("progress-bar", isFinalQuestion && "final-question")} >
      {progressPercent}
    </progress>
  );
};

export default ProgressBar;
