import React,{useEffect} from "react";
import useAuthState from "../../hooks/useAuthState"
import {logoutUser} from "../../store/thunks/authThunk"
import {routes} from "../../App"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Logout = () => {
  const {isAuthenticated} = useAuthState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{
    if(isAuthenticated){
      dispatch(logoutUser(false))
    }

    const timeoutId = setTimeout(()=>{
      navigate(routes.login,{replace:true})
    },5000)

    return ()=> clearTimeout(timeoutId)
  }, [navigate])
  return (
    <div >
      <h1>This page will redirect in 5 sec...</h1>
      <p>Redirecting to home...</p>
    </div>
  );
};

export default Logout;
