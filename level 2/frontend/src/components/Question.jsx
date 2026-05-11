import React, { useState, useCallback,useEffect,useMemo } from "react";
import { Option } from "./Option";
import useQuestionState from "../hooks/useQuestionState"
import {fetchQuestionsAPI, submitQuizAPI, validateAnswerAPI} from "../store/thunks/questionsThunk"
import { useDispatch } from "react-redux";
import {activeNextQuestion} from "../store/slices/questionSlice"
import { useNavigate } from "react-router-dom";


export const Question = () => {
  const [userSelectedOption, setUserSelectedOption] = useState(null);
  //prevent user from clicking ans again
  const [isAnswered,setIsAnswered] = useState(false)

  const dispatch = useDispatch();
  const navigate = useNavigate()

  // reading data from redux
  const {
    activeQuestion,
        activeQuestionId,
        activeQuestionNumber,
        totalQuestions,
        loading,
        error,
        isValidatingAnswer,
        isSubmittingQuiz
  } = useQuestionState()

  //fetch questions when page loads
  useEffect(()=>{
    dispatch(fetchQuestionsAPI());
  },[dispatch])

  //reset state when question changes
  useEffect(()=>{
    setUserSelectedOption(null);
    setIsAnswered(false)
  }, [activeQuestionId])

  // are we on last question?
  const isFinalQuestion = useMemo(
    ()=> activeQuestionNumber === totalQuestions,
    [activeQuestionNumber,totalQuestions]
  )

   //option click handler
   const handleOptionClick = useCallback(
    async(selectedOption) =>{
      if(isAnswered || isValidatingAnswer) return;

      setUserSelectedOption(selectedOption);
      try{
      await dispatch(
        validateAnswerAPI({questionId : activeQuestionId, answer: selectedOption})
      ).unwrap();
      setIsAnswered(true)
    }catch(error){
      console.error("Error validating answer", error)
    }
    },
    [activeQuestionId,dispatch,isAnswered,isValidatingAnswer]
   )

   //move tp next/ submit
   const moveForward = useCallback(
    function(){
      //if last question
      if(isFinalQuestion){
        dispatch(submitQuizAPI());
        navigate("/result")
      }else{
        dispatch(activeNextQuestion())
      }

      }, [dispatch,isFinalQuestion]
   ) 

    //loading state 
      if(loading || !activeQuestionId){
        return (
          <div  className="flex justify-center items-center min-h-screen">
               <span className="loading loading-spinner text-primary loading-xl"></span>
          </div>
        )
      }

    //Error state
        if(Boolean(error)){
         return 
         (
         <div className="toast toast-center toast-middle">
             <div className="alert alert-error">
                  <span>{error}</span>
             </div>
         </div>)
        }
      
   
  return (
    <div className="relative card bg-base-200 w-full max-w-4xl shadow-xl m-auto pt-10">
      {/* Question Counter */}
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
        <div className="avatar avatar-placeholder">
          <div className="bg-neutral text-neutral-content w-16 rounded-full">
            <span className="text-xl">{activeQuestionNumber}/{totalQuestions}</span>
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="card-body items-center text-center">
        <h2 className="card-title text-2xl mb-6">{activeQuestion.question}</h2>

        {/* Options */}
        <ul className="w-full max-w-2xl space-y-2">
          {activeQuestion.options.map((option) => {

          const isThisSelected = userSelectedOption 
          ? userSelectedOption?.id === option.id : false
          const isCorrect = activeQuestion.answer_status === "right" && isThisSelected
          
          return (
            <Option
              key={option.id}
              option={option}
              isSelected={isThisSelected}
              isAnswered={isAnswered}        // static page – no answer checking
              isCorrect={isCorrect}         // static – no correctness display
              onclick={handleOptionClick}
              isValidating={isValidatingAnswer && isThisSelected}
            />
          );
          })}
        </ul>

        {/* Next Button */}
         <div className="card-actions mt-6">
          <button
            className={`btn ${
              isFinalQuestion ? "btn-success" : "btn-primary"
            } ${isSubmittingQuiz ? "loading" : ""}`}
            onClick={moveForward}
            disabled={!isAnswered || isSubmittingQuiz}
          >
            {isSubmittingQuiz
              ? "Submitting..."
              : isFinalQuestion
              ? "Submit Quiz"
              : "Next Question"}
          </button>
        </div>
      </div>
    </div>
  );
};
