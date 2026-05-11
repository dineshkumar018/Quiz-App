import {createAsyncThunk} from "@reduxjs/toolkit"
import apiRequest from "../../utils/apiRequest"
import {FETCH_QUESTIONS_ENDPOINT,VALIDATE_ANSWERS_ENDPOINT,SUBMIT_QUIZ_ENDPOINT}from "../../utils/endpoints"


//fetch all questions
//fetches all questions from the server

//Create async function with createAsyncThunk
//Do API req. to FETCH_QUESTIONS_ENDPOINT
//Converts the response into JSON
// If res is successfull => return the questions
//If server sends error => reject the thunk with msg

export const fetchQuestionsAPI = createAsyncThunk("questions/fetch", async(_, thunkAPI)=>{
    try{
        const response = await apiRequest({
            endpoint:FETCH_QUESTIONS_ENDPOINT
        })
        const resJson = await response.json()
        if(response.ok){
            return resJson;
        }else{
            return thunkAPI.rejectWithValue(resJson.message)
        }
    }catch(error){
         let sendError = "Could not fetch questions, something went wrong......"
        if("message" in error){
            sendError = error.message
        }
        return thunkAPI.rejectWithValue(sendError)

    }
})


//validateAnswerAPI: validates users quiz answer
// Sending the selected ans to the server
//checking whether the selected ans is correct or wrong
//receiving the result from backend

//Accept the selcetd ans as value
//call the API VALIDATE_ANSWERS_ENDPOINT using POST method
//convert the res to JSON
// If succ => returns servere result
// If server sends error => reject with its message

export const validateAnswerAPI = createAsyncThunk("questions/validateAnswer", async(value,thunkAPI)=>{
    try{
        const response = await apiRequest({
            endpoint: VALIDATE_ANSWERS_ENDPOINT,
            method: "POST",
            body:value,
        })

        const resJson = await response.json();
        if(response.ok){
            return resJson;
        }else{
            return thunkAPI.rejectWithValue(resJson.message)
        }
    }catch(error){
        let sendError = "Could not validate answer, something went wrong......"
        if("message" in error){
            sendError = error.message
        }
        return thunkAPI.rejectWithValue(sendError)

    }
})

//submitQuizAPI
// It submits the quiz to the server after the user finishes answering

//Creates asn async function using createAsynThunk
// calls the SUBMIT_QUIZ_ENDPOINT API  using POST method
//Converts the server response to JSON
//If success => return sfinal quiz result
//If error => reject with server message


//Not sending "value" bcoz in above validateAnswerAPI  already send each asn one by one when the student selects it.
// thatis, every question's ans is already sent to the backend immediatley
// so the time user clicks "SUBMIT QUIZ" button
//backend already has everything so nthng else is needed to be sent in he final submit req
// User finsished the quiz . Now calculate the final result

// it does not need any body bcoz backend already has all answer data, so no need to send again

export const submitQuizAPI = createAsyncThunk("questions/submitQuiz",async(_,thunkAPI)=>{
    try{
        const response = await apiRequest({
            endpoint: SUBMIT_QUIZ_ENDPOINT,
            method:"POST"
        });
        const resJson = await response.json();
        if(response.ok){
            return resJson;
        }else{
            return thunkAPI.rejectWithValue(resJson.message)
        }
    }catch(error){
      let sendError = "Could not submit Quiz, something went wrong......"
        if("message" in error){
            sendError = error.message
        }
        return thunkAPI.rejectWithValue(sendError)
    }

})
