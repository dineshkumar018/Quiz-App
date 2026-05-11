import { useMemo } from "react";
import { useSelector } from "react-redux";

function useResultState(){
    //extract result data from redux
    const{status, inCorrectAnswers, correctAnswers,attempts,loading,error} =useSelector((state)=>state.result)

    //calculating number of correct +incorrect answers
    const [noOfCorrectAnswers, noOfIncorrectAnswers] = useMemo(()=>{
        const correct= correctAnswers?.length ?? 0;
        const incorrect = inCorrectAnswers?.length ??0;
        return [correct,incorrect];
    },[correctAnswers?.length, inCorrectAnswers?.length])

    //total questions
    const totalQuestions = useMemo(
    ()=> noOfCorrectAnswers + noOfIncorrectAnswers,
    [noOfCorrectAnswers,noOfIncorrectAnswers]
    )

    //Prepare final Values object
    const values = useMemo(()=>({
        inCorrectAnswers,
        correctAnswers,
        attempts,
        noOfCorrectAnswers,
        noOfIncorrectAnswers,
        totalQuestions,
        status,
        loading,
        error
    }),[
        inCorrectAnswers,
        correctAnswers,
        attempts,
        noOfCorrectAnswers,
        noOfIncorrectAnswers,
        totalQuestions,
        status,
        loading,
        error
    ])

    return values;
}

export default useResultState;