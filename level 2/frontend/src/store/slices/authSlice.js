//this slice manages :
//Login
//Signup
//Logout
//Token expiry
//User email
//Lodaing States
// Error messages

//Reducers => instant tasks : Works immediatley inside the slice
//extraReducers =>delayed tasks : Handled after an API call is completed (login, signup,fetch data)
//                 they depend on server response(succ/fail)

//Use reducers when state changes instantly
//Use extraReducers when you wait for server
//Builder is only a helper to connect async thunk actions to ur slice

//pending :API call started
//fulfilled => API call success
//rejected => API call failed

import {createSlice} from "@reduxjs/toolkit"
import {loginAPI,signupAPI,logoutUser} from "../thunks/authThunk"


const initialState ={
    isAuthenticated:Boolean(localStorage.getItem("accessToken")?.trim()),
    email:localStorage.getItem("email")?.trim()||null,
    loading:false,
    error:null,
    isTokenExpired:false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers(builder){
        //signupApi.pending
        builder.addCase(signupAPI.pending, (state)=>{
            state.isAuthenticated = false;
            state.email=null;
            state.error=null;
            state.loading=true
        })
        //sihnupApi.fulfilled
        builder.addCase(signupAPI.fulfilled,(state,action)=>{
            const {user} = action.payload;
            state.loading = false;
            state.email = user.email
        })
        //signupAPI.rejected
        builder.addCase(signupAPI.rejected,(state,action)=>{
            const errorMessage = action.payload;
            state.loading = false;
            state.error= errorMessage
        })

        //loginApi.pending
        builder.addCase(loginAPI.pending,(state)=>{
            state.loading=true;
            state.error=null;
            state.isAuthenticated=false;
            state.email=null;
            state.isTokenExpired=false
        })
        //loginApi.fulfilled
        builder.addCase(loginAPI.fulfilled,(state,action)=>{
            const email = action.payload;
            state.loading =false;
            state.isAuthenticated=true;
            state.email =email
        })
        //loginApi.rejected
        builder.addCase(loginAPI.rejected,(state,action)=>{
             const errorMessage = action.payload;
            state.loading = false;
            state.error= errorMessage
        })

        //logout
        builder.addCase(logoutUser.fulfilled,(state,action) =>{
            state.isAuthenticated = false;
            state.email =null;
            state.isTokenExpired =action.payload
        })

    }
})

export default authSlice.reducer