import React from "react";

import { Link } from "react-router-dom";
import Navbar from "../Navbar";

export const WelcomeScreen = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar variant="question" />
      {/* Question Card */}
      <div className="card w-96 bg-base-200 shadow-sm m-auto p-4 card-xl">
        <div className="card-body m-auto text-center">
          <div className="flex justify-center">
            <h2 className="text-3xl font-bold">Let's Start 🚀</h2>
          </div>
          <p className="text-xl pt-4 font-bold">Are You Ready?</p>
          <p className="text-xl font-bold">
            Let's see how many questions you can answer.
          </p>
          <ul className="mt-6 flex flex-col gap-2 text-xs">
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 me-2 inline-block text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>There are 30 Questions</span>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 me-2 inline-block text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>You need to pick 1 answer</span>
            </li>
          </ul>
          <div className="mt-6">
            <button className="btn btn-primary btn-block">
              <Link to={"/questions"}>Start the Quiz</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
