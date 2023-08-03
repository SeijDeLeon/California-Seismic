import React, { useState } from 'react';
import { exams } from '../../assets/duplicateQuestionData.js';
import StartExamPopUpModal from './StartExamPopUpModal.jsx';

function ExamsListPage() {
  const [index, setIndex] = useState(null);
  const [showPopUp, setShowPopUp] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);

  const handleOnStart = (exam, index) => {
    setIndex(index);
    setSelectedExam(exam);
    setShowPopUp(true);
  };

  return (
    <main className='min-h-screen items-center justify-center bg-gray-100'>
      <div className='max-w-screen-2xl m-auto px-4'>
        <section>
          {/* Container for Heading and List of Exams */}
          <div className="max-w-6xl px-5 py-6 mx-auto mt-24 text-center">
            {/* Heading */}
            <div className="bg-white p-4 rounded shadow mb-4">
              <h3 className="text-lg font-bold">Select an exam to begin</h3>
            </div>
          </div>
          {/* Container to hold List of Exams and Start Buttons */}
          <div className="max-w-6xl px-5 mx-auto text-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {exams.map((exam, index) => (
                  <div key={index} className="bg-white p-4 rounded shadow border border-gray-300">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">{exam.name}</h2>

                    <button
                      key={index}
                      className="rounded-full bg-emerald-200 p-2 px-4 mt-4"
                      onClick={() => handleOnStart(exam, index)}
                    >
                      Click Here to Begin
                    </button>
                  </div>
                ))}
              </div>
              {/* Pop Up to ask before starting exam */}
              <StartExamPopUpModal visible={showPopUp} onClose={() => setShowPopUp(false)} selectedExam={selectedExam} index={index} onStartExam={handleOnStart} />
          </div>
        </section>
      </div>
    </main>
  );
}

export default ExamsListPage;