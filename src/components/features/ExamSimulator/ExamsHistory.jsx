import React from 'react';
import { Link } from 'react-router-dom';

const ExamsHistory = () => {
  let allExams = JSON.parse(localStorage.getItem('allExams'))?.reverse();
  // console.log('allExams: ', allExams);

  // allExams = [...allExams, ...allExams, ...allExams, ...allExams, ...allExams, ...allExams].reverse()

  return (
    <main className="bg-gray-100 p-3 relative">
      <div className=" bg-gray-100">
        {/* Table of theexam history */}
        <section className="h-[71vh] bg-white col-span-3 relative p-6 text-start overflow-hidden overflow-y-auto">
          <div className="flex justify-between">
            <h5 className="uppercase text-gray-700 font-semibold">
              History of Your Exams
            </h5>
            <button className="text-sm text-gray-500 px-4 py-1 border border-gray-200 rounded hover:bg-gray-200 duration-75 transition-colors">
              <Link to={`/practice/exams`}>Back to All Exams</Link>
            </button>
          </div>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6 ">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    No.
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Exam Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Correct Answers
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Time
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date of Submission
                  </th>
                </tr>
              </thead>
              <tbody>
                {allExams ? (
                  allExams.map((exam, idx) => (
                    <tr
                      key={`row_${idx}`}
                      className="bg-white border-b  hover:bg-gray-50"
                    >
                      <td className="px-6 py-4">{allExams.length - idx}</td>
                      <td className="px-6 py-4">{exam.name}</td>
                      <td className="px-6 py-4">
                        {
                          exam.questions.filter(
                            (ques) => ques.isCorrectAnswered
                          ).length
                        }{' '}
                        / {exam.questions.length}
                      </td>
                      <td className="px-6 py-4">
                        {Math.floor(exam.timer / 60)} minutes
                      </td>
                      <td className="px-6 py-4">{exam.date}</td>
                    </tr>
                  ))
                ) : (
                  <tr className="bg-white  hover:bg-gray-50 ">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      N/A
                    </th>
                    <td className="px-6 py-4">N/A</td>
                    <td className="px-6 py-4">N/A</td>
                    <td className="px-6 py-4">N/A</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ExamsHistory;
