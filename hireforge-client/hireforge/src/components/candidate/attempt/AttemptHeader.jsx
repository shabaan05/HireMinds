
import Timer from "../../candidate/attempt/Timer";
const AttemptHeader = ({ currentIndex, total, attempt, handleSubmit }) => {
  return (
    <>
      <p>Question {currentIndex + 1} of {total}</p>

      {attempt && (
        <Timer
          startedAt={attempt.startedAt}
          duration={attempt?.interviewId?.duration}
          onTimeUp={handleSubmit}
        />
      )}
    </>
  );
};

export default AttemptHeader;