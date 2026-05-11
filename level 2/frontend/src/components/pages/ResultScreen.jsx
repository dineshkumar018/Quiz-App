import React,{useCallback,useEffect,useMemo, useState} from "react";
import Navbar from "../Navbar";
import useResultState from "../../hooks/useResultState"
import ResultQuestions from "../ResultQuestions";
import {useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import {fetchAttemptsAPI, fetchCompletedQuizAPI} from "../../store/thunks/resultThunk"
import {routes} from "../../App"


export default function ResultScreen() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const[displayCorrectAnswers,setDisplayCorrectAnswers ] = useState(false)

  //reading data from redux
  const { 
        inCorrectAnswers,
        correctAnswers,
        attempts,
        noOfCorrectAnswers,
        noOfIncorrectAnswers,
        totalQuestions,
        status,
        loading,
        error
      } = useResultState();

      useEffect(() =>{
        if(status && !noOfIncorrectAnswers){
          setDisplayCorrectAnswers(true)
        }
      }, [noOfIncorrectAnswers,status])

      //fetch result data on load
      useEffect(()=>{
        dispatch(fetchCompletedQuizAPI());
        dispatch(fetchAttemptsAPI())
      },[dispatch])

      //score calculation
      const correctPercentage = useMemo(()=>{
        return Math.floor((noOfCorrectAnswers/totalQuestions)*100)
      },[noOfCorrectAnswers,totalQuestions])

      // restart handler
      const handleReset = useCallback(()=>{
        navigate(routes.ProtectedRoutes.questions)
      },[navigate])

      //deciide which questions to show
      const displayQuestions = useMemo(()=>
      (displayCorrectAnswers ? correctAnswers : inCorrectAnswers),
    [displayCorrectAnswers,correctAnswers,inCorrectAnswers])

      //loading state 
      if(loading){
        return (
          <div  className="flex flex-col h-screen">
            <Navbar variant="result"/>
               <span className="loading loading-infinity loading-xl m-auto"></span>
          </div>
        )
      }

    //Error state
        if(error){
         return (
         <div className="flex flex-col h-screen">
          <Navbar variant="result"/>
             <div className="badge badge-error badge-xl m-auto">
                  {error}
             </div>
         </div>)
        }

  return (
    <div className="flex flex-col h-screen">
      <Navbar variant="result" />

      <div className="flex justify-evenly my-4 max-h-[600px] overflow-hidden">
        {/* Left card - Scoreboard */}
        <div className="card bg-base-200 w-128 shadow-sm mt-4 h-full">
          <div className="w-full px-6 py-4 bg-base-300 card">
            <p className="text-xl font-semibold">Score Board</p>
          </div>

          {/* Radial Progress */}
          <div
            className="radial-progress bg-warning text-warning-content border-warning border-4 mx-auto mt-5"
            style={{ "--value": correctPercentage, "--size": "8rem" }}
          >
            <span className="m-auto text-5xl font-bold">{noOfCorrectAnswers}</span>
          </div>
          <p className="mt-2 text-center">Your Score</p>

          {/* Tabs */}
          <div className="tabs tabs-bordered w-full mt-6">
            <input type="radio" name="tabs" className="tab" aria-label="Completion" defaultChecked />
            <div className="tab-content">
              <p className="text-center text-xl font-semibold">Completion: 100%</p>
            </div>

            <input type="radio" name="tabs" className="tab" aria-label="Total Questions" />
            <div className="tab-content">
              <p className="text-center text-xl font-semibold">Total: {totalQuestions}</p>
            </div>

            <input type="radio" name="tabs" className="tab" aria-label="Correct" />
            <div className="tab-content">
              <p className="text-center text-xl font-semibold text-green-600">
                Correct: {noOfCorrectAnswers}
              </p>
            </div>

            <input type="radio" name="tabs" className="tab" aria-label="Wrong" />
            <div className="tab-content">
              <p className="text-center text-xl font-semibold text-red-600">
                Wrong: {noOfIncorrectAnswers}
              </p>
            </div>
          </div>

          {/* Restart Button */}
          <div className="mt-6 text-center" onClick={handleReset}>
            <button className="btn btn-info">Restart ➰</button>
          </div>
        </div>

        {/* Right card - Questions Review */}
        <div className="card bg-base-200 w-128 shadow-sm mt-4 max-h-[600px]">
          <div className="w-full px-6 py-4 bg-base-300 card">
            <p className="text-xl font-semibold">Introspection</p>
          </div>
          <div className="overflow-y-scroll p-4 h-full">
            {displayQuestions.length ? (
              displayQuestions.map((q, idx) => (
                <ResultQuestions
                key={"result-" + q.question_id}
                question={q}
                number={idx+1}
                displayCorrectAnswers = {displayCorrectAnswers}
                />
              ))
            ) : (
              <p>No Answers Found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
