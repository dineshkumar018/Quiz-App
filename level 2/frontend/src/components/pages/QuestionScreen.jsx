import React, { useState } from "react";
import Navbar from "../Navbar";
import ProgressBar from "../ui/ProgressBar"
import { Question } from "../Question";


const QuestionScreen = () => {
  
  return (
   <div className=" flex flex-col h-screen">
    {/* NAvbar */}
    <Navbar variant="question"/>
    <ProgressBar/>
    <Question/>
   </div>
  );
};

export default QuestionScreen;
