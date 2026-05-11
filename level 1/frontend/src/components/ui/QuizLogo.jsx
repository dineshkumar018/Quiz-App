import Logo from "../../assets/quiz-logo.svg";
import React from "react"
const allSizes = {
  small: 168,
  large: 306,
};

export default function QuizLogo({ size = "small" }) {
    return <img src={Logo} alt="Quiz Logo" width={allSizes[size]} />
}
