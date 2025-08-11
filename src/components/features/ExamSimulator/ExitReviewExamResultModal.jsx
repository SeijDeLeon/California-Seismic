import {Link } from 'react-router-dom';

function ExitReviewExamResultModal({
  visible,
  onClose,
}) {




  if (!visible) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center border-4">
      <div className="bg-white rounded-lg w-4/5 md:w-2/5 h-auto">
        {/* HEADER  */}
        <div className="py-3 pl-6 text-start">
          <p className="font-medium text-gray-600">EXIT EXAM RESULT</p>
        </div>

        <hr />

        {/* Buttons */}
        <div className="px-6 py-6 text-sm">
          <div className="flex justify-center gap-4">
            <button
              className="px-4 py-2 rounded border border-blue-500 text-blue-500 
              hover:bg-blue-100 duration-75 transition-colors"
            >
              <Link to='/practice/exams'>Back to All Exams</Link>
            </button>

            <button
              className="px-4 py-2 rounded border border-blue-500 text-blue-500 
              hover:bg-blue-100 duration-75 transition-colors"
            >
              <Link to={`/practice/exams-history`}>
                View All Your Exam History
                </Link>
            </button>

            <button
              className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-200 duration-75 transition-colors"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExitReviewExamResultModal;
