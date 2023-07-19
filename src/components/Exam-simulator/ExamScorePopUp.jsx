import { Link } from "react-router-dom";

function ExamScorePopUpModal({visible, handleOnSubmit}){

    if(!visible) return null;
    return(
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
            <div className="bg-white p-2 rounded-lg w-2/5 h-2/5">
                <div className="max-w-6xl px-5 py-5 mx-auto mt-10 text-center">
                    <h1 className="text-5xl font-semibold text-center text-xl text-gray-700">
                        Congratulations you passed!
                    </h1>
                </div>
                <div className="max-w-6xl px-5 mx-auto mt-5 text-center">
                    <h1 className="text-5xl font-semibold text-center text-xl text-gray-700">
                        Your score is 100
                    </h1>
                </div>
                <div>
                    {/* Buttons */}
                    <div className="text-xl flex justify-center px-5 py-5 mt-5">
                        <Link to={`/practice/exams/1`}>
                        <button className="px-4 py-2 bg-orange-500 text-white rounded-full" link='/practice'>Retake exam?</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default ExamScorePopUpModal;