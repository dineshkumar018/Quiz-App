import { useMemo } from "react";
import {useSelector} from "react-redux"

function useQuestionState(){

    const questionState = useSelector((state) => state.questions)

    const {
    questions,
    activeQuestionId,
    loading,
    isValidatingAnswer,
    isSubmittingQuiz,
    error,
    } = questionState;

    //find the active question

    const activeQuestion = useMemo(
        ()=> questions.find((question) => question._id === activeQuestionId),
        [activeQuestionId,questions]
    )

    //find question number
     const activeQuestionNumber = useMemo(
        ()=> questions.findIndex((question) => question._id === activeQuestionId) +1 ,
        [activeQuestionId,questions]
    )

    //count total questions
    const totalQuestions = useMemo(()=>questions.length,
        [questions.length])


    //collect everything into one object
    const values = useMemo(()=>({
        activeQuestion,
        activeQuestionId,
        activeQuestionNumber,
        totalQuestions,
        loading,
        error,
        isValidatingAnswer,
        isSubmittingQuiz
    }),
     [  activeQuestion,
        activeQuestionId,
        activeQuestionNumber,
        totalQuestions,
        loading,
        error,
        isValidatingAnswer,
        isSubmittingQuiz]
    ) ;
    return values;
}

export default useQuestionState;
