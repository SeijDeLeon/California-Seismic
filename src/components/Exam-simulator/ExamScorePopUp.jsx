import { Link } from "react-router-dom";

function ExamScorePopUpModal({visible, score, restartExam}){

    if(!visible) return null;
    return(
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg w-4/5 md:w-2/5 h-auto">
                <div className="max-w-6xl px-5 py-5 mx-auto mt-6 text-center">
                {score > 2 ? (
                    <h1 className="text-4xl md:text-6xl font-semibold text-green-600 text-gray-700">
                    Congratulations you passed!
                    </h1>
                ) : (
                    <h1 className="text-4xl md:text-6xl font-semibold text-red-600 text-gray-700">
                    You failed
                    </h1>
                )}
                </div>
                <div className="max-w-6xl px-5 mx-auto mt-4 text-center">
                <h1 className="text-2xl md:text-3xl font-semibold text-gray-700">
                    Your score is {score}
                </h1>
                </div>
                <div className="text-xl flex justify-center px-5 py-5 mt-5">
                <Link to={`/practice/exams/`}>
                    <button className="px-4 py-2 bg-orange-500 text-white rounded-full" onClick={restartExam}>
                    Retake exam?
                    </button>
                </Link>
                </div>
            </div>
            </div>
    )
}

export default ExamScorePopUpModal;