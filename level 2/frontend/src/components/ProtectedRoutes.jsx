//First, we check authentication status using useAuthState (Is the user logged on or not)
// we use usenavigate to control navigation(allows app to redirect users programaticall)
// Inside useEffect, we continuously watch authentication

// ProtectedRoutes does not stop navigation; it controls visibility
//It decides whether page should be visible or hidden



import React, { useEffect } from "react";
import useAuthState from "../hooks/useAuthState";
import { routes } from "../App";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ element }) => {
  const { isAuthenticated } = useAuthState();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate(routes.login);
    }
  }, [navigate, isAuthenticated]);

  if (!isAuthenticated) return null;

  return <>{element}</>;
};

export default ProtectedRoutes;
