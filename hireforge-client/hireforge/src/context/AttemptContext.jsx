import { createContext, useContext, useState } from "react";

const AttemptContext = createContext();

export const AttemptProvider = ({ children }) => {
const defaultCode = `// Write your solution here

function solve() {
  // Example:
  // const n = Number(inputFn());
}

solve();`;

const [code, setCode] = useState(defaultCode);


  const [input, setInput] = useState("");
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <AttemptContext.Provider
      value={{
        code,
        setCode,
        input,
        setInput,
        answers,
        setAnswers,
        currentIndex,
        setCurrentIndex,
        isSubmitted,
        setIsSubmitted,
      }}
    >
      {children}
    </AttemptContext.Provider>
  );
};

export const useAttempt = () => useContext(AttemptContext);