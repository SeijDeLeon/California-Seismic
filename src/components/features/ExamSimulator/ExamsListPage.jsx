import React from 'react';
import { randomExams as exams } from '../../../assets/data/randomExams.js';
import { useNavigate, Link } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

function ExamsListPage() {
  const navigate = useNavigate();
  let allExams = JSON.parse(localStorage.getItem('allExams'))?.reverse() || [];
  // console.log('allExams: ', allExams);

  let totalScoreForCorrectAnswer = 0;
  let averageScore = 0;
  let totalScore = 0;

  if(allExams.length > 0){
    allExams.forEach((exam) => {
      totalScoreForCorrectAnswer += exam.questions.filter(ques => ques.isCorrectAnswered).length
      totalScore += exam.questions.length;
    })
    averageScore = ((totalScoreForCorrectAnswer/totalScore)*100).toFixed(2)
  }


  const config = {
    data: {
      labels: [`Average Score: ${averageScore} %`],
      datasets: [
        {
          data: [averageScore, 100],
          backgroundColor: ['rgb(54, 162, 235)', '#fff'],
          borderColor: ['rgba(54, 162, 235, 1)', '#000'],
          borderWidth: 0.5,
          borderRadius: 2,
          spacing: 1,
          innerRadius: 2,
          cutout: '80%',
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: [
            `Your Average Score: ${averageScore} %`],
        },
        legend: {
          position: 'bottom',
          align: 'start',
          labels: {
            boxWidth: 20,
            borderRadius: 10,
            font: {
              size: 10,
            },
          },
        },
      },

      maintainAspectRatio: false, // Ensure the chart does not maintain the aspect ratio,
    },
  };

  return (
    <main className="min-h-screen max-w-screen-2xl bg-gray-100">
      <section className="py-2 px-6">
        {/* CHART  */}
        <div className="flex flex-col items-center py-3 rounded mt-3 border border-gray-100 shadow overflow-hidden">
          <div className="font-bold text-gray-700">Your completed exam: {allExams.length}</div>
          <div className="h-40 w-40 flex justify-start mt-1">
            <Doughnut options={config.options} data={config.data} />
          </div>
        </div>

        {/* Heading */}
        <div className="py-4 text-gray-700 sm:flex justify-between">
          <h3 className="text-xl font-bold text-start">All Exams</h3>
          <button className="text-sm text-gray-500 px-4 py-1 border border-gray-200 rounded hover:bg-gray-200 duration-75 transition-colors">
            <Link to={`/practice/exams-history`}>
              View All Your Exam History
            </Link>
          </button>
        </div>

        {/* Container to hold List of Exams and Start Buttons */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {exams.map((exam, index) => (
              <div
                key={`exam_${index}`}
                className="bg-white rounded-lg shadow p-4 overflow-hidden"
              >
                <h2 className="text-gray-700 text-start">{exam.name}</h2>
                <p className="bg-indigo-100 w-24 text-center text-xs rounded-xl mt-1 p-1">
                  {exam.questions.length} questions
                </p>

                <div className="flex justify-end">
                  <button
                    key={`button_${index}`}
                    className="px-2 border text-sm border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white
                     duration-75 transition-colors"
                    onClick={() => navigate(`/practice/exams/${index}`)}
                  >
                    Start
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default ExamsListPage;
