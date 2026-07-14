import MCQQuestion from "./MCQQuestion";
import SubjectiveQuestion from "./SubjectiveQuestion";
import CodingQuestion from "./CodingQuestion";
import { useAttempt } from "../../../context/AttemptContext";
import { useState } from "react";
const QuestionRenderer = ({ question, answer, onAnswerChange }) => {
  const { code, setCode, input, setInput, isSubmitted } = useAttempt();
  if (!question || !question.type) {
  console.log("INVALID QUESTION:", question);
  return <div>Invalid question</div>;
}

switch ((question?.type || "").toLowerCase()){
  case "mcq":
      return (
        <div className="relative z-10">
 <MCQQuestion
          question={question}
          answer={answer}
          onAnswerChange={onAnswerChange}
        />
  </div>

       
      );

    case "subjective":
      return (
        <SubjectiveQuestion
          question={question}
          answer={answer}
          onAnswerChange={onAnswerChange}
        />
      );

    case "coding":
      return (

   <CodingQuestion 
  question={question}
  code={code}
  setCode={setCode}
  input={input}
  setInput={setInput}
    isSubmitted={isSubmitted}
  onAnswerChange={onAnswerChange}   

/>

      );

    default:
      return <div>Unknown question type</div>;
  }
};

export default QuestionRenderer;