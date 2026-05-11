import { useCallback, useEffect, useMemo, useState } from "react";
import QuestionContext from "./QuestionContext";

function QuestionProvider({ children }) {
  const [questions, setQuestions] = useState([]);
  const [activeQuestionId, setActiveQuestionId] = useState("");

  const processQuestions = useCallback(function (questionApiResponse) {
    setQuestions(
      questionApiResponse.map((question) => ({
        ...question,
        hasAttempted: false,
        isAnswerCorrect: false,
      })),
    );
    setActiveQuestionId(questionApiResponse[0]._id);
  }, []);

  useEffect(() => {
    console.log("Modified : " + questions);
  }, [questions]);

  const activeQuestion = useMemo(
    () => questions.find((question) => question._id === activeQuestionId),
    [activeQuestionId, questions],
  );

  const activeQuestionNumber = useMemo(
    () => questions.findIndex((question) => question._id === activeQuestionId) + 1,
    [activeQuestionId, questions],
  );

  const totalQuestions = useMemo(() => questions.length, [questions.length]);

  const updateQuestionStatus = useCallback(
    (isAnswerCorrect) => {
      setQuestions((prevQuestions) =>
        prevQuestions.map((question) =>
          question._id === activeQuestionId
            ? { ...question, hasAttempted: true, isAnswerCorrect }
            : question,
        ),
      );
    },
    [activeQuestionId],
  );

  const activateNextQuestion = useCallback(() => {
    const currentIndex = questions.findIndex(
      (question) => question._id === activeQuestionId,
    );
    if (currentIndex !== -1 && currentIndex + 1 < questions.length) {
      setActiveQuestionId(questions[currentIndex + 1]._id);
    }
  }, [activeQuestionId, questions]);

  const correctAnswers = useMemo(() => {
    return questions.filter((q) => q.isAnswerCorrect).length;
  }, [questions]);

  const contextValue = useMemo(
    () => ({
      processQuestions,
      activeQuestionNumber,
      activeQuestion,
      updateQuestionStatus,
      totalQuestions,
      activateNextQuestion,
      correctAnswers,
    }),
    [
      processQuestions,
      activeQuestionNumber,
      activeQuestion,
      activateNextQuestion,
      correctAnswers,
      updateQuestionStatus,
      totalQuestions,
    ],
  );
  return (
    <QuestionContext.Provider value={contextValue}>
      {children}
    </QuestionContext.Provider>
  );
}

export default QuestionProvider;
