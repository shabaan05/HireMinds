const NavigationButtons = ({
  handlePrev,
  handleNext,
  handleSubmit,
  currentIndex,
  total,
  isSubmitting,
}) => {
  return (
    <>
      
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="px-4 py-2 bg-blue-500 rounded"
        >
          Previous
        </button>

        <button
          onClick={handleNext}
          disabled={currentIndex === total - 1}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default NavigationButtons;