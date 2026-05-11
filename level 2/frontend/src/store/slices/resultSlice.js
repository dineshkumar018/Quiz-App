import {createSlice} from "@reduxjs/toolkit";
import {fetchAttemptsAPI,fetchCompletedQuizAPI} from "../thunks/resultThunk"

const initialState ={
    status:false,
    inCorrectAnswers:[],
    correctAnswers:[],
    attempts:0,
    loading:true,
    error:null
}

const resultSlice = createSlice({
    name: "result",
    initialState,
    extraReducers(builder){

        //fetchCompletedQuizAPI.pending
        builder.addCase(fetchCompletedQuizAPI.pending,(state)=>{
            state.loading =true;
            state.error=null;
            state.status =false
        })
        //fetchCompletedQuizAPI.fulfilled
        builder.addCase(fetchCompletedQuizAPI.fulfilled,(state,action)=>{
            state.loading = false;
            state.status =action.payload.status;
            state.correctAnswers = action.payload.correct_questions;
            state.inCorrectAnswers = action.payload.incorrect_questions
        })
        //rejected 
        builder.addCase(fetchCompletedQuizAPI.rejected,(state,action) =>{
            state.loading = false;
            state.error =action.payload
        })

        //fetchAttemptsAPI.pending
        builder.addCase(fetchAttemptsAPI.pending, (state) =>{
            state.loading =true
        })
        //fulfiled state
        builder.addCase(fetchAttemptsAPI.fulfilled,(state,action)=>{
            state.loading =false;
            state.attempts =action.payload
        })
        //rejected state
        builder.addCase(fetchAttemptsAPI.rejected,(state,action)=>{
            state.loading =false
            state.error = action.payload
        })
    }
})

export default resultSlice.reducer

