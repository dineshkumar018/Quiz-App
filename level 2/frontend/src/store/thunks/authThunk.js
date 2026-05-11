//Thunk is an middle agent  betn UI and API. It handles async API calls and triggers 
// pending => fulfilled =>rejected actions. 
//Reducers update Redux state based on theses actions, and the UI re-renders automatically.


import {createAsyncThunk} from "@reduxjs/toolkit"
import apiRequest from "../../utils/apiRequest"
import {SIGNUP_ENDPOINT, LOGIN_ENDPOINT} from "../../utils/endpoints"

// reusable redux thunk action called signupAPI :
//accepts form values from the UI => values
//send those values to the backend signup endpoint,
// wiats for the backend response,
//returns the success data if signup succeeded,
//or returns a clean, controlled error message if signup failed


//createAsyncThunk : generates an async action createor + action types and automatically handles pending/fulfiled/
//rejected action lifecycle for the thunk

// It performs 3 major tasks:
//1. It sends user's signup data(name, email,pass) to the bknd using reusable apiRequest()
//2.Handles success resposne
//3. handle error

export const signupAPI = createAsyncThunk( "auth/signup", async(values ,thunkAPI) =>{
    try{
        const response = await apiRequest({
            endpoint: SIGNUP_ENDPOINT,
            method: "POST",
            includeAuth:false,
            body:{
                name: values.username,
                email: values.email,
                password:values.password
            }
        })

        const resJson = await response.json();
        if(response.ok){
            return resJson
        }else{
            return thunkAPI.rejectWithValue(resJson.message)
        }
    }catch(error){
        let sendError = "Could not register user, something went wrong......"
        if("message" in error){
            sendError = error.message
        }
        return thunkAPI.rejectWithValue(sendError)
    }

}
)


//loginAPI
//It accepts user login values (email, pasword)
//It sends those details to backend login API using our reusable apiRequest()
//waits for server response
//server gives either => success=> login succesfull or error => wrong pass.wrong email....
//If login is successfull: 
//                   server sends back accessToken
//                   save this token in Localstorage
//                   save users email
//                   then we return the user's email as the success value of this thunk
// If login fails => sent error message
// redux toolkit withh auto run:
//                         pending => loading = true
//                         fulfilled => login sucess
//                         rejected => show error message

export const loginAPI = createAsyncThunk("auth/login", async(values,thunkAPI)=>{
    try{
        const response = await apiRequest({
            endpoint:LOGIN_ENDPOINT,
            method:"POST",
            includeAuth:false,
            body:values
        })
        const resJson = await response.json()
        if(response.ok){
            const {accessToken} = resJson
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("email", values.email)
            return values.email;
        }else{
            return thunkAPI.rejectWithValue(resJson.message)
        }
    }
    catch(error){
         let sendError = "Could not login user, something went wrong......"
        if("message" in error){
            sendError = error.message
        }
        return thunkAPI.rejectWithValue(sendError)

    }
})


//logout 
//clear the stored login details

export const logoutUser = createAsyncThunk("auth/logout", async(isTokenExpired = false, _thunkAPI)=>{
    localStorage.removeItem("accessToken")
    localStorage.removeItem("email")
    return isTokenExpired
    //If true => show message : "Your session expired"
    //If false => Logout successfull
})


