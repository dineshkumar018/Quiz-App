import {createSlice} from "@reduxjs/toolkit";
import{fetchQuestionsAPI,validateAnswerAPI,submitQuizAPI}from "../thunks/questionsThunk"

const initialState={
    questions:[],
    activeQuestionId:" ",
    loading:true,
    isValidatingAnswer:false,
    isSubmittingQuiz:false,
    error:null
}

const questionSlice = createSlice({
    name:"questions",
    initialState,
    reducers:{
        activeNextQuestion(state){
            const currentIndex =state.questions.findIndex((question)=>question._id ===state.activeQuestionId);
            if(currentIndex!==-1 && currentIndex+1<state.questions.length){
                state.activeQuestionId = state.questions[currentIndex+1]._id
            }
        }
    },
    extraReducers(builder){
        //fetchquestionsAPI.pending
        builder.addCase(fetchQuestionsAPI.pending,(state)=>{
            state.questions=[];
            state.activeQuestionId="",
            state.loading=true;
            state.isValidatingAnswer=false;
            state.error=null
        })
        //fetchQuestionsAPI.fulfilled
        builder.addCase(fetchQuestionsAPI.fulfilled,(state,action)=>{
            state.questions=action.payload.questions;
            const activeQuestionId=action.payload.questions?.find((question)=> !question.attempted)?._id || "";
            state.activeQuestionId=activeQuestionId
            state.loading=false
        })
        //fetchQuestionsAPI.rejected
        builder.addCase(fetchQuestionsAPI.rejected,(state,action)=>{
            state.error= action.payload,
            state.loading=false
        })

          //validatAnswerAPI.pending
        builder.addCase(validateAnswerAPI.pending,(state)=>{
            state.isValidatingAnswer =true;
            state.error = null;
        })

        //validateAnswerAPI.fulfilled
        builder.addCase(validateAnswerAPI.fulfilled,(state,action)=>{
            state.isValidatingAnswer = false
            const isCorrect = action.payload.status ===1
            const activeQuestionId = state.activeQuestionId
            const activeQuestionIndex = state.questions.findIndex((question) => question._id === activeQuestionId)
             state.questions[activeQuestionIndex].attempted =true;
             state.questions[activeQuestionIndex].answer_status = isCorrect? "right":"wrong";
        })
        //validateAnswer.rejected
        builder.addCase(validateAnswerAPI.rejected, (state,action)=>{
            state.isValidatingAnswer = false;
            state.error = action.payload
        })

        //submitQuizAPI.pending
        builder.addCase(submitQuizAPI.pending,(state)=>{
            state.error =null;
            state.isSubmittingQuiz = true
        })
        //submitQuizAPI.fullfilled
        builder.addCase(submitQuizAPI.fulfilled,(state,action)=>{
            state.isSubmittingQuiz =false;
            if(action.payload.status){
                state.questions =[];
                state.activeQuestionId="";
            }else{
                state.error="Could not submit the quiz............ something went wrong............"
            }
        })
        //submitQuizaPI.rejected
        builder.addCase(submitQuizAPI.rejected,(state,action)=>{
            state.error =action.payload;
            state.isSubmittingQuiz =false
        })

    }
})

export default questionSlice.reducer;
export const{activeNextQuestion} = questionSlice.actions;
