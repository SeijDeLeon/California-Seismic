import { useNavigate } from "react-router-dom";

function StartExamPopUpModal({
  visible,
  onClose,
  selectedExam,
  index,
  onStartExam,
}) {
  const navigate = useNavigate();
  const handleStartExam = (selectedExam) => {
    onStartExam(selectedExam); // Call the callback function with the selected exam
    onClose(); // Close the modal after starting the exam
    navigate(`/practice/exams/${index}`);
  };

  function handleContinueAndStartExam() {
    // handleContinue();
    handleStartExam();
  }

  if (!visible) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg w-4/5 md:w-1/3 h-auto">
        <div className="max-w-4xl px-5 py-10 mx-auto mt-10 text-center">
          <h1 className="text-2xl md:text-3xl font-semibold text-center text-gray-700">
            Do you want to begin?
            <br />
            {selectedExam.name}
          </h1>
        </div>
        {/* Buttons */}
        <div className="text-xl flex justify-center px-5 py-5">
          <button
            className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-full"
            onClick={onClose}
          >
            Go Back
          </button>
          <button
            className="px-4 py-2 bg-orange-500 text-white rounded-full"
            onClick={handleContinueAndStartExam}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default StartExamPopUpModal;
