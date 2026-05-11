import { createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/apiRequest";
import {QUIZ_ATTEMPTS_ENDPOINTS,COMPLETED_QUIZ_ENDPOINT} from "../../utils/endpoints"

//fetchcompleteQuizAPI
//fetch the completed quiz from the backend
// data like : stud score, correct/incorrect answers, percentage, time taken...

//No data needed
//Call api endpoint
//convert response to JSON
//If success => return result data
//If error from server =>reject with that message
//If any unexpected error => reject with fallback message

// this thunk fetches the quiz results. Since all answers were already validated earlier, we don't need to send 
//  extra data 

export const fetchCompletedQuizAPI = createAsyncThunk("result/fetchQuiz", async(_,thunkAPI)=>{
    try{
        const response = await apiRequest({
            endpoint: COMPLETED_QUIZ_ENDPOINT
        })

        const jsonData = await response.json()
        if(response.ok){
            return jsonData;
        }else{
            return thunkAPI.rejectWithValue(jsonData.message)
        }
    }catch(error){
       let sendError="Could fetch results, something went wrong............."
       if("message" in error){
        sendError = error.message
       }
       return thunkAPI.rejectWithValue(sendError)
    }
})

//fetchAttemptsAPI
// fetch how many attempts the student has made in the quiz

export const fetchAttemptsAPI = createAsyncThunk("result/fetchAttempts", async(_,thunkAPI) =>{
    try{
        const response = await apiRequest(
            {
                endpoint:QUIZ_ATTEMPTS_ENDPOINTS
            }
        )

        const jsonData = await response.json();
        if(response.ok){
            return jsonData;
        }else{
            return thunkAPI.rejectWithValue(jsonData.message)
        }
    }
    catch(error){

        let sendError="Couldn't fetch Attempts count, something went wrong............."

       if("message" in error){
        sendError = error.message
       }
       return thunkAPI.rejectWithValue(sendError)

    }
})
