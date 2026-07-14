const QuestionNavigator = ({ total, currentIndex, setCurrentIndex }) => {
  return (
    <div className="flex gap-2 mt-4 flex-wrap">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => setCurrentIndex(i)}
          className={`px-3 py-1 border ${
            currentIndex === i ? "bg-blue-500 text-white" : ""
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default QuestionNavigator;