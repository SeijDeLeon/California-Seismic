import React, {useState} from 'react';
import Button from './Button.jsx';
import StartExamPopUpModal from './StartExamPopUpModal.jsx';

function ExamsListPage(){

    const [showPopUp, setShowPopUp] = useState(false);

    const handleOnStart = () => setShowPopUp(true);

    const handleOnGoBack = () => setShowPopUp(false);

    return (
        <>
            <main>
                <section>
                    {/* Container for Heading and List of Exams */}
                    <div className="max-w-6xl px-5 mx-auto mt-24 text-center">
                        {/*Heading*/}
                        <div className="bg-white p-4 rounded shadow mb-4">
                                <h3 className="text-lg font-bold">Select an exam to begin</h3>
                                {/* Add exam number content here */}
                                </div>
                    </div>
                        {/*Container to hold List of Exams and Start Buttons*/}
                    <div className="max-w-6xl px-5 mx-auto mt-24 text-center">
                        <div className="grid grid-rows-3 grid-flow-col gap-4">
                            <div className="grid grid-rows-3 grid-flow-col gap-4">
                                <div className="row-span-2 bg-white p-2 rounded shadow border border-gray-300">Sample Exam-1</div>
                                <button className="rounded-full bg-emerald-200 row-span-2 col-span-2 bg-white p-2 rounded shadow border border-gray-300" onClick={handleOnStart}>
                                    Click Here to Begin
                                </button>
                            </div>
                            <div className="grid grid-rows-3 grid-flow-col gap-4">
                                <div className="row-span-2 bg-white p-2 rounded shadow border border-gray-300">Sample Exam-2</div>
                                <button className="rounded-full bg-emerald-200 row-span-2 col-span-2 bg-white p-2 rounded shadow border border-gray-300" onClick={handleOnStart}>
                                    Click Here to Begin
                                </button>
                            </div>
                            <div className="grid grid-rows-3 grid-flow-col gap-4">
                                <div className="row-span-2 bg-white p-2 rounded shadow border border-gray-300">Sample Exam-3</div>
                                <button className="rounded-full bg-emerald-200 row-span-2 col-span-2 bg-white p-2 rounded shadow border border-gray-300" onClick={handleOnStart}>
                                    Click Here to Begin
                                </button>
                            </div>
                        </div>  
                    </div>
                    <StartExamPopUpModal visible={showPopUp} onClose={handleOnGoBack}/>
                </section> 
            </main>
        </>
    )

    }

export default ExamsListPage;