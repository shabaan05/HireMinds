import MCQQuestion from "./MCQQuestion";
import SubjectiveQuestion from "./SubjectiveQuestion";
import CodingQuestion from "./CodingQuestion";

const QuestionRenderer = ({ question, answer, onAnswerChange }) => {
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
          answer={answer}
          onAnswerChange={onAnswerChange}
        />
      );

    default:
      return <div>Unknown question type</div>;
  }
};

export default QuestionRenderer;