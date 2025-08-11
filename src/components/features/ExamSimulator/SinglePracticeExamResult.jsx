import React, { useState, useEffect, useCallback } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useLocation, useNavigate } from 'react-router-dom';
import { scroller } from 'react-scroll';
import ExitReviewExamResultModal from './ExitReviewExamResultModal';
import ListOfQuestions from './ListOfQuestions';
import ControlButtons from './ControlButtons';
import QuestionAccordion from './QuestionAccordion';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const SinglePracticeExamResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [questionsState, setQuestionsState] = useState({
    name: 'Title',
    questions: [],
  });
  const [showPopUp, setShowPopUp] = useState(false);

  // AVOID: Too many re-renders. React limits the number of renders to prevent an infinite loop.
  useEffect(() => {
    // console.log('check')
    if (!location.state?.fromExamPage) {
      navigate('/practice/exams');
    }
    if (location.state && location.state.questionsState) {
      setQuestionsState(location.state.questionsState);
    }
  }, [location.state, navigate]);

  const [expandedIndex, setExpandedIndex] = useState(-1);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showedInCorrectQuestions, setShowedInCorrectQuestions] =
    useState(false);

  const [incorrectQuestionList, setIncorrectQuestionList] = useState([]);

  //----------- START - DATA FOR CHART
  let correctAnswerCount = 0;
  let incorrectAnswerCount = 0;
  if (questionsState.questions.length > 0) {
    correctAnswerCount = questionsState.questions.filter(
      (ques) => ques.isCorrectAnswered
    ).length;
    incorrectAnswerCount = questionsState.questions.length - correctAnswerCount;
  }

  const config = {
    data: {
      labels: [
        `Correct: ${correctAnswerCount}`,
        `Incorrect: ${incorrectAnswerCount}`,
      ],
      datasets: [
        {
          data: [correctAnswerCount, incorrectAnswerCount],
          backgroundColor: ['rgb(54, 162, 235)', '#fff'],
          borderColor: ['rgba(54, 162, 235, 1)', '#000'],
          borderWidth: 0.5,
          borderRadius: `${
            correctAnswerCount === questionsState.questions.length ||
            correctAnswerCount === 0
              ? 0
              : 2
          }`,
          spacing: `${
            correctAnswerCount === questionsState.questions.length ||
            correctAnswerCount === 0
              ? 0
              : 1
          }`,
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
            `Your Score: ${(
              (correctAnswerCount / questionsState.questions.length) *
              100
            ).toFixed(2)} / 100`,
          ],
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
  ///----------- END - DATA FOR CHART;

  const handleOpenAccordionClick = (quesIdx) => {
    setExpandedIndex(() => {
      if (quesIdx === expandedIndex) {
        return -1;
      } else {
        setExpandedIndex(quesIdx);
      }
    });
    setCurrentQuestion(quesIdx);
  };

  const handlePreClick = () => {
    setCurrentQuestion(currentQuestion - 1);
    scroller.scrollTo(`question${currentQuestion - 1}`, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
      offset: -70,
    });
    handleOpenAccordionClick(currentQuestion - 1);
    console.log('prdf');
  };

  const handleNextClick = () => {
    setCurrentQuestion(currentQuestion + 1);
    scroller.scrollTo(`question${currentQuestion + 1}`, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
      offset: -70,
    });
    handleOpenAccordionClick(currentQuestion + 1);
  };

  const handleToggleClick = () => {
    setShowedInCorrectQuestions(!showedInCorrectQuestions);

    const updatedIncorrectQuestionList = {
      ...questionsState,
      questions: { ...questionsState }.questions.filter(
        (ques) => !ques.isCorrectAnswered
      ),
    };
    setIncorrectQuestionList(updatedIncorrectQuestionList);

    if (questionsState && questionsState.questions.length > 0) {
      if (showedInCorrectQuestions) {
        setCurrentQuestion(0);
        scroller.scrollTo('question1', {
          duration: 500,
          smooth: true,
          offset: -70,
        });
      } else {
        let firstIdx = questionsState.questions.findIndex(
          (ques) => !ques.isCorrectAnswered
        );
        if (firstIdx !== -1) {
          setCurrentQuestion(questionsState.questions[firstIdx].idx);
          scroller.scrollTo(
            `question${questionsState.questions[firstIdx].idx + 1}`,
            {
              duration: 500,
              smooth: true,
              offset: -90,
            }
          );
        }
      }
    }

    setExpandedIndex(-1);
  };

  // another solution ? try to use useEffect
  useEffect(() => {
    console.log('check for rendering')
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        if (currentQuestion < questionsState.questions.length - 1) {
          handleNextClick();
        }
      } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        if (currentQuestion > 0) {
          handlePreClick();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentQuestion, questionsState.questions.length]);


  return (
    <main className="bg-gray-100 p-3 relative">
      <div className="grid grid-cols-4 gap-2 bg-gray-100">
        {/* SUMMARY OF SCORES */}
        <section
          className="h-[calc(98vh)] bg-white col-span-1
        sticky top-3 left-0 p-6 overflow-hidden overflow-y-auto"
        >
          {/* toggle button  */}
          <div className="flex justify-center">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                onChange={handleToggleClick}
              />
              <span className="ms-3 text-xs font-medium text-gray-500">
                All Questions
              </span>
              <div
                className="relative w-4 h-2 bg-gray-300 peer-focus:outline-none rounded-full peer mx-2
         peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
         after:content-[''] after:absolute after:top-[0px] after:right-[9px] 
        after:bg-gray-600 after:border-none after:border after:rounded-full after:h-2 after:w-2 after:transition-all
         dark:border-none peer-checked:bg-gray-300"
              ></div>
              <span className="ms-3 text-xs font-medium text-gray-500">
                Incorrect Questions
              </span>
            </label>
          </div>

          {/* chart  */}
          <div className="flex flex-col items-center py-3 rounded mt-3 border border-gray-100 shadow">
            <div className="font-bold">Exam: {questionsState.name}</div>
            <div className='text-xs mt-1 text-gray-800'><span className='font-semibold'>Time:</span> {Math.floor(questionsState.timer / 60)} minutes</div>
            <div className="h-40 w-40 flex justify-start mt-3">
              <Doughnut options={config.options} data={config.data} />
            </div>
          </div>

          {/*   LIST OF QUESTIONS  */}
          <div>
            <ListOfQuestions
              showedInCorrectQuestions={showedInCorrectQuestions}
              questionsState={questionsState}
              currentQuestion={currentQuestion}
              setCurrentQuestion={setCurrentQuestion}
              incorrectQuestionList={incorrectQuestionList}
            />

            {/* CONTROL BUTTONS  */}
            <ControlButtons
              showedInCorrectQuestions={showedInCorrectQuestions}
              currentQuestion={currentQuestion}
              incorrectQuestionList={incorrectQuestionList}
              handlePreClick={handlePreClick}
              handleNextClick={handleNextClick}
              questionsState={questionsState}
            />

            {/* EXIT BUTTON  */}
            <div className="mt-8 flex justify-start">
              <button
                className="text-sm text-gray-500 px-4 py-1 border border-gray-200 rounded hover:bg-gray-200 duration-75 transition-colors"
                onClick={() => setShowPopUp(true)}
              >
                Exit
              </button>
            </div>
          </div>
        </section>

        {/* LIST OF ALL QUESTIONS  */}
        <section className="bg-white col-span-3 relative p-3">
          {/* ACCORDION  */}
          <div>
            {!showedInCorrectQuestions
              ? questionsState.questions.length > 0 &&
                questionsState.questions.map((ques, quesIdx) => (
                  <QuestionAccordion
                    key={ques.id || quesIdx}
                    ques={ques}
                    quesIdx={quesIdx}
                    expandedIndex={expandedIndex}
                    handleOpenAccordionClick={handleOpenAccordionClick}
                    currentQuestion={currentQuestion}
                    questionsState={questionsState}
                  />
                ))
              : incorrectQuestionList.questions.length > 0 &&
                incorrectQuestionList.questions.map((ques, quesIdx) => (
                  <QuestionAccordion
                    key={ques.id || quesIdx}
                    ques={ques}
                    quesIdx={quesIdx}
                    expandedIndex={expandedIndex}
                    handleOpenAccordionClick={handleOpenAccordionClick}
                    currentQuestion={currentQuestion}
                    questionsState={questionsState}
                  />
                ))}
          </div>
        </section>
      </div>

      {/* Pop Up to ask before exiting exam result*/}
      <ExitReviewExamResultModal
        visible={showPopUp}
        onClose={() => setShowPopUp(false)}
      />
    </main>
  );
};

export default SinglePracticeExamResult;
