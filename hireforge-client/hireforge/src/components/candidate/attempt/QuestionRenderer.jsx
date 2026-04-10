import MCQQuestion from "./MCQQuestion";
import SubjectiveQuestion from "./SubjectiveQuestion";
import CodingQuestion from "./CodingQuestion";
import { useAttempt } from "../../../context/AttemptContext";
import { useState } from "react";
const QuestionRenderer = ({ question, answer, onAnswerChange }) => {
  const { code, setCode, input, setInput, isSubmitted } = useAttempt();
  if (!question) return null;

  switch (question.type) {
    case "mcq":
      return (
        <MCQQuestion
          question={question}
          answer={answer}
          onAnswerChange={onAnswerChange}
        />
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

/>
      );

    default:
      return <div>Unknown question type</div>;
  }
};

export default QuestionRenderer;