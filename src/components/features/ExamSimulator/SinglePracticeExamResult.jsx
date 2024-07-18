import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useLocation } from 'react-router-dom';
import {
  FaChevronDown,
  FaArrowAltCircleRight,
  FaArrowAltCircleLeft,
  FaChevronRight,
  FaChevronUp,
  FaChevronLeft,
} from 'react-icons/fa';
import { LiaTimesSolid, LiaCheckSolid } from 'react-icons/lia';
import { Element, Link as ScrollLink, scroller } from 'react-scroll';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const SinglePracticeExamResult = () => {
  const location = useLocation();
  const [questionsState, setQuestionsState] = useState({
    name: 'Title',
    questions: []
  })
  if(location.state && location.state.questionsState){
    const { questionsState } = location.state;
    setQuestionsState(questionsState)
  }

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
    console.log('prdf')
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

  useEffect(() => {
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
            <div className="h-40 w-40 flex justify-start mt-3">
              <Doughnut options={config.options} data={config.data} />
            </div>
          </div>



          {/* question table  */}
          <div>
            <div className="my-3 font-semibold text-gray-700 mt-6">
              Assessment Results
            </div>
            <div className="justify-start flex flex-col flex-wrap h-96 gap-1.5 p-2">
              {!showedInCorrectQuestions ? (
                questionsState.questions.length > 0 &&
                questionsState.questions.map((ques, quesIdx) => (
                  <ScrollLink
                    to={`question${quesIdx + 1}`}
                    smooth={true}
                    offset={-70}
                    key={`quesTable_${quesIdx}`}
                  >
                    <div
                      className={`font-light flex gap-1 rounded items-center pl-2 py-0.5 
                    bg-gray-50 shadow text-xs
                  hover:bg-zinc-300 duration-75 transition-colors hover:cursor-pointer
                  ${currentQuestion === ques.idx && 'bg-zinc-300'}`}
                      onClick={() => setCurrentQuestion(ques.idx)}
                    >
                      {ques.isCorrectAnswered ? (
                        <LiaCheckSolid
                          className={`text-blue-500 text-[10px]`}
                        />
                      ) : (
                        <LiaTimesSolid className={`text-red-500 text-[10px]`} />
                      )}
                      <p>{ques.idx + 1}</p>
                    </div>
                  </ScrollLink>
                ))
              ) : incorrectQuestionList.questions.length > 0 ? (
                incorrectQuestionList.questions.map((ques, quesIdx) => (
                  <ScrollLink
                    to={`question${ques.idx + 1}`}
                    smooth={true}
                    offset={-70}
                    key={`quesTable_${quesIdx}`}
                  >
                    <div className={`font-light flex gap-1 rounded items-center pl-2 py-0.5 bg-gray-50 shadow text-xs
                  hover:bg-zinc-300 duration-75 transition-colors hover:cursor-pointer
                  ${currentQuestion === ques.idx && 'bg-zinc-300'}`}
                      onClick={() => setCurrentQuestion(ques.idx)}
                    >
                      {ques.isCorrectAnswered ? (
                        <LiaCheckSolid
                          className={`text-blue-500 text-[10px]`}
                        />
                      ) : (
                        <LiaTimesSolid className={`text-red-500 text-[10px]`} />
                      )}
                      <p>{ques.idx + 1}</p>
                    </div>
                  </ScrollLink>
                ))
              ) : (
                <p className="text-sm">
                  Excellent! You don't have any incorrect questions.
                </p>
              )}
            </div>

            {/* Pre-Next buttons */}
            <div className="flex justify-center gap-2 text-gray-600 text-3xl mt-6">
              <button
                className={`
                ${!showedInCorrectQuestions && currentQuestion === 0 && 'text-gray-400 hover:cursor-default'} 
                ${(incorrectQuestionList.questions && showedInCorrectQuestions && currentQuestion === incorrectQuestionList.questions[0]?.idx) && 'text-gray-400 hover:cursor-default'}
                ${!showedInCorrectQuestions && currentQuestion !== 0 && 'hover:text-gray-800 duration-75'}
                ${(incorrectQuestionList.questions && showedInCorrectQuestions && currentQuestion !== incorrectQuestionList.questions[0]?.idx) && 'hover:text-gray-800 duration-75'}
                `}
                onClick={handlePreClick}
                disabled={ (!showedInCorrectQuestions && currentQuestion === 0) || (showedInCorrectQuestions && currentQuestion === incorrectQuestionList.questions[0]?.idx)}
              >
                <FaArrowAltCircleLeft />
              </button>
              <button
                className={`
                ${(!showedInCorrectQuestions && currentQuestion === questionsState.questions.length - 1) && 'text-gray-400 hover:cursor-default'} 
                ${(incorrectQuestionList.questions && showedInCorrectQuestions && currentQuestion === incorrectQuestionList.questions[incorrectQuestionList.questions.length - 1]?.idx) && 'text-gray-400 hover:cursor-default'}
                ${(!showedInCorrectQuestions && currentQuestion !== questionsState.questions.length - 1) && 'hover:text-gray-800 duration-75'}
                ${(incorrectQuestionList.questions && showedInCorrectQuestions && currentQuestion !== incorrectQuestionList.questions[incorrectQuestionList.questions.length - 1]?.idx) && 'hover:text-gray-800 duration-75'}
                `}
                onClick={handleNextClick}
                disabled={
                  (!showedInCorrectQuestions && questionsState.questions.length - 1 === currentQuestion) ||
                  (showedInCorrectQuestions && incorrectQuestionList.questions[incorrectQuestionList.questions.length - 1]?.idx === currentQuestion)
                }
              >
                <FaArrowAltCircleRight />
              </button>
            </div>

            {/* hint  */}
            <div className="mt-6 flex justify-start italic text-gray-600 text-xs">
              <div>
                <p className="font-semibold mr-1">Hint:</p>
              </div>

              <div>
                <div className=" items-center  flex">
                  <div className="w-4 h-4 flex items-center justify-center rounded shadow mx-3 bg-gray-100">
                    <FaChevronRight className="text-[8px]" />
                  </div>
                  <p>or</p>
                  <div className="w-4 h-4 flex items-center justify-center rounded shadow mx-3 bg-gray-100">
                    <FaChevronDown className="text-[8px]" />
                  </div>
                  next question
                </div>

                <div className="items-center flex mt-2">
                  <div className="w-4 h-4 flex items-center justify-center rounded shadow mx-3 bg-gray-100">
                    <FaChevronUp className="text-[8px]" />
                  </div>
                  <p>or</p>
                  <div
                    className="w-4 h-4 flex items-center justify-center rounded shadow
              mx-3 bg-gray-100"
                  >
                    <FaChevronLeft className="text-[8px]" />
                  </div>
                  previous question
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LIST OF ALL QUESTIONS  */}
        <section className="bg-white col-span-3 relative p-3">
          <div>
            {/* ACCORDION  */}
            {!showedInCorrectQuestions
              ? questionsState.questions.length > 0 &&
                questionsState.questions.map((ques, quesIdx) => (
                  <div
                    className={`mb-2 rounded-sm text-sm
                  ${expandedIndex === quesIdx && 'border'}`}
                    key={`question_${quesIdx}`}
                  >
                    {/* QUESTION DIV  */}
                    <div
                      onClick={() => handleOpenAccordionClick(quesIdx)}
                      className={`flex justify-between w-full p-3 leading-6 rounded-t-sm
                     bg-gray-100 hover:bg-gray-300 hover:cursor-pointer duration-74 transition-colors
                     ${quesIdx !== expandedIndex && 'h-12'}
                     ${currentQuestion === quesIdx && 'bg-gray-300'}`}
                    >
                      {/* question  */}
                      <div className="text-start overflow-hidden">
                        {ques.question
                          .trim()
                          .split('\n')
                          .map((line, idx) => (
                            <Element
                              name={`question${quesIdx + 1}`}
                              id={`question${quesIdx + 1}`}
                              key={`line_${idx}`}
                            >
                              <p
                                className={`${idx > 1 && '&& indent-6'} ${
                                  quesIdx !== expandedIndex && 'truncate'
                                }`}
                              >
                                {idx === 0 ? (
                                  <span className="font-semibold mr-1">
                                    Q{quesIdx + 1}:{' '}
                                  </span>
                                ) : null}
                                {line}
                              </p>
                            </Element>
                          ))}
                      </div>

                      {/* down/left icons  */}
                      <div className="flex items-center ml-4 text-gray-500">
                        <FaChevronDown
                          className={`duration-300 ${
                            quesIdx === expandedIndex ? 'rotate-0' : 'rotate-90'
                          }`}
                        />
                      </div>
                    </div>

                    {/* OPTIONS DIV  */}
                    {quesIdx === expandedIndex && (
                      <div>
                        {/* IMAGE FOR QUESTION  */}
                        <div>
                          {ques.question_img && (
                            <div className="flex gap-4 flex-wrap m-6">
                              {ques.question_img &&
                                ques.question_img.map((img, imgIdx) => (
                                  <img
                                    key={`img_${imgIdx}`}
                                    src={img}
                                    alt={img}
                                    className="object-contain max-h-40"
                                  />
                                ))}
                            </div>
                          )}
                        </div>

                        {/* OPTIONS  */}
                        <div className="grid grid-cols-1 gap-4 text-left p-6">
                          {ques.options.map((option, optionIdx) => (
                            <div key={option.id} className="flex items-center">
                              <input
                                type="radio"
                                className="form-radio"
                                name="answer"
                                value={option.id}
                                disabled
                                checked={
                                  questionsState.questions[quesIdx]
                                    .selectedOption === optionIdx
                                }
                              />
                              {/* generateRandomQuestions: add images for options   */}
                              <span
                                className={`${
                                  option.isCorrect &&
                                  'bg-gradient-to-r from-blue-100 to-blue-50'
                                }
                                ml-2 p-2 rounded`}
                              >
                                <p className="px-2">{option.text}</p>
                              </span>

                              {option.image && (
                                <img
                                  src={option.image.src}
                                  alt={option.image.alt}
                                  className="max-h-20 ml-3"
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              : incorrectQuestionList.questions.length > 0 &&
                incorrectQuestionList.questions.map((ques, quesIdx) => (
                  <div
                    className={`mb-2 rounded-sm text-sm
                    ${expandedIndex === ques.idx && 'border'}`}
                    key={`question_${quesIdx}`}
                  >
                    {/* QUESTION DIV  */}
                    <div
                      onClick={() => handleOpenAccordionClick(ques.idx)}
                      className={`flex justify-between w-full p-3 leading-6 rounded-t-sm 
                       bg-gray-100 hover:bg-gray-300 hover:cursor-pointer duration-74 transition-colors
                       ${ques.idx !== expandedIndex && 'h-12'}
                       ${currentQuestion === ques.idx && 'bg-gray-300'}`}
                    >
                      {/* question  */}
                      <div className="text-start overflow-hidden">
                        {ques.question
                          .trim()
                          .split('\n')
                          .map((line, idx) => (
                            <Element
                              name={`question${ques.idx + 1}`}
                              id={`question${ques.idx + 1}`}
                              key={`line_${idx}`}
                            >
                              <p
                                className={`${idx > 1 && '&& indent-6'} ${
                                  ques.idx !== expandedIndex && 'truncate'
                                }`}
                              >
                                {idx === 0 ? (
                                  <span className="font-semibold mr-1">
                                    Q{ques.idx + 1}:{' '}
                                  </span>
                                ) : null}
                                {line}
                              </p>
                            </Element>
                          ))}
                      </div>

                      {/* down/left icons  */}
                      <div className="flex items-center ml-4 text-gray-500">
                        <FaChevronDown
                          className={`duration-300 ${
                            ques.idx === expandedIndex
                              ? 'rotate-0'
                              : 'rotate-90'
                          }`}
                        />
                      </div>
                    </div>

                    {/* OPTIONS DIV  */}
                    {ques.idx === expandedIndex && (
                      <div>
                        {/* IMAGE FOR QUESTION  */}
                        <div>
                          {ques.question_img && (
                            <div className="flex gap-4 flex-wrap m-6">
                              {ques.question_img &&
                                ques.question_img.map((img, imgIdx) => (
                                  <img
                                    key={`img_${imgIdx}`}
                                    src={img}
                                    alt={img}
                                    className="object-contain max-h-40"
                                  />
                                ))}
                            </div>
                          )}
                        </div>

                        {/* OPTIONS  */}
                        <div className="grid grid-cols-1 gap-4 text-left p-6">
                          {ques.options.map((option, optionIdx) => (
                            <div key={option.id} className="flex items-center">
                              <input
                                type="radio"
                                className="form-radio"
                                name="answer"
                                value={option.id}
                                disabled
                                checked={
                                  questionsState.questions[ques.idx]
                                    .selectedOption === optionIdx
                                }
                              />
                              {/* generateRandomQuestions: add images for options   */}
                              <span
                                className={`${
                                  option.isCorrect &&
                                  'bg-gradient-to-r from-blue-100 to-blue-50'
                                }
                                  ml-2 p-2 rounded`}
                              >
                                <p className="px-2">{option.text}</p>
                              </span>

                              {option.image && (
                                <img
                                  src={option.image.src}
                                  alt={option.image.alt}
                                  className="max-h-20 ml-3"
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default SinglePracticeExamResult;
