import { useContext } from "react";
import QuestionContext from "../store/QuestionContext";

function useQuestionContext() {
    return useContext (QuestionContext);
}
export default useQuestionContext;