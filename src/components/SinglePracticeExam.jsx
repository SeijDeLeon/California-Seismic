import React, {useState} from 'react';
import ExamScorePopUpModal from './ExamScorePopUp.jsx';

function SinglePracticeExam(){

    const[showPopUp, setShowPopUp] = useState(false);

    const handleOnSubmit = () => setShowPopUp(true);
    
    return (
        <>
            <main>
                
                <div class="container mx-auto px-6 py-6">
                    <div class="flex flex-row flex-wrap py-4">
                        <aside class="w-full sm:w-1/3 md:w-1/4 px-2">
                            <div class="top-0 p-4 w-full">
                                
                                <ul class="flex flex-col overflow-hidden list-image-[url(checkmark.png)] space-y-2">
                                    {/* List of items */}
                                    
                                    {/* Render the list items dynamically
                                    {listItems.map((item, index) => (
                                        <li key={index} className="bg-white p-2 rounded shadow border border-gray-300">{item}</li>
                                    ))} */}
                                    <li className="bg-white p-2 rounded shadow border border-gray-300">01</li>
                                    <li className="bg-white p-2 rounded shadow border border-gray-300">02</li>
                                    <li className="bg-white p-2 rounded shadow border border-gray-300">01</li>
                                    <li className="bg-white p-2 rounded shadow border border-gray-300">02</li>
                                    
                                </ul>
                                
                            </div>
                        </aside>
                        <section class="w-full sm:w-2/3 md:w-3/4 pt-1 px-2">
                        <div>
                                {/* Exam tab */}
                                <div className="bg-white p-4 rounded shadow mb-4">
                                <h3 className="text-lg font-bold">Exam Number</h3>
                                {/* Add exam number content here */}
                                </div>

                                {/* Timer */}
                                <div className="bg-white p-4 rounded shadow mb-4">
                                <h3 className="text-lg font-bold">Timer</h3>
                                {/* Add timer content here */}
                                </div>

                                {/* Question container */}
                                <div className="bg-white p-4 rounded shadow mb-4">
                                <h3 className="text-lg font-bold">Question</h3>
                                <p className="mb-4">What is the answer to the question?</p>
                                <ul className="space-y-2">
                                    <li>
                                    <label className="inline-flex items-center">
                                        <input type="radio" className="form-radio" name="answer" value="option1" />
                                        <span className="ml-2">Option 1</span>
                                    </label>
                                    </li>
                                    <li>
                                    <label className="inline-flex items-center">
                                        <input type="radio" className="form-radio" name="answer" value="option2" />
                                        <span className="ml-2">Option 2</span>
                                    </label>
                                    </li>
                                    <li>
                                    <label className="inline-flex items-center">
                                        <input type="radio" className="form-radio" name="answer" value="option3" />
                                        <span className="ml-2">Option 3</span>
                                    </label>
                                    </li>
                                    <li>
                                    <label className="inline-flex items-center">
                                        <input type="radio" className="form-radio" name="answer" value="option4" />
                                        <span className="ml-2">Option 4</span>
                                    </label>
                                    </li>
                                </ul>
                                </div>

                                {/* Buttons */}
                                <div className="flex justify-end">
                                <button className="px-4 py-2 mr-2 bg-blue-500 text-white rounded">Previous</button>
                                <button className="px-4 py-2 bg-orange-500 text-white rounded">Next</button>
                                </div>
                                {/* Submit */}
                                <div className="bg-white p-4 rounded shadow mb-4">
                                <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={handleOnSubmit}>Submit</button>
                                {/* Add submit content here */}
                                </div>
                                <ExamScorePopUpModal visible={showPopUp} handleOnSubmit={handleOnSubmit}/>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </>
    )
}

export default SinglePracticeExam;