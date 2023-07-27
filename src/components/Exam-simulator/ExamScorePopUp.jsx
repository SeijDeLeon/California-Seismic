import { Link } from "react-router-dom";

function ExamScorePopUpModal({visible, onClose, score, restartExam, answeredQuestionsLength, selectedExamQuestionsList}){

    if(!visible) return null;
    return(
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg w-4/5 md:w-2/5 h-auto">
                <div className="max-w-6xl px-5 py-5 mx-auto mt-6 text-center">
                {answeredQuestionsLength === selectedExamQuestionsList ? (
                    score > 2 ? (
                    <h1 className="text-xl md:text-3xl font-semibold text-green-600 text-gray-700">
                        Congratulations! You passed!
                    </h1>
                    ) : (
                    <h1 className="text-xl md:text-3xl font-semibold text-red-600 text-gray-700">
                        Unfortunately, you failed
                    </h1>
                    )
                ) : (
                    <h1 className="text-xl md:text-3xl font-semibold text-red-600 text-gray-700">
                    You still have {selectedExamQuestionsList - answeredQuestionsLength} unanswered questions. <br />
                    Are you sure you want to quit?
                    </h1>
                )}
                </div>
                <div className="max-w-6xl px-5 mx-auto mt-4 text-center">
                <h1 className="text-2xl md:text-2xl font-semibold text-gray-700">
                    Your score is {score}
                </h1>
                </div>
                <div className="text-lg flex justify-center mt-5">
                <div className="flex flex-row gap-4">
                    <div>
                    <Link to={`/practice/exams/`}>
                        <button className="px-4 py-2 bg-orange-500 text-white rounded-full">
                        Retake exam?
                        </button>
                    </Link>
                    </div>
                    <div>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-full" onClick={onClose}>
                        Go Back
                    </button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default ExamScorePopUpModal;