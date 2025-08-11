import { useState, useEffect, useRef } from "react";
import QuestionChoices from "./QuestionChoices";
import generatorLogic from "./GeneratorLogic";
import problemIcon from "./problemIcon.png"
import { ArrowPathIcon, XMarkIcon } from "@heroicons/react/24/solid";

const valuesEqual = (val1, val2) => {
  if (Array.isArray(val1) && Array.isArray(val2)) {
    if (val1.length !== val2.length) return false;
    for (let i = 0; i < val1.length; i++) {
      if (val1[i] !== val2[i]) return false;
    }
    return true;
  }
  return val1 === val2;
};

const Question = ({ category, answeredCorrect, resetTimer }) => {
  const [question, setQuestion] = useState();
  const [viewSolution, setViewSolution] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [chosen, setChosen] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const colorRef = useRef();
  useEffect(() => {
    setQuestion(generatorLogic(category));
    setChosen(null);
    setViewSolution(false);
    setSubmitted(false);
  }, [category]);

  const handleSubmit = () => {
    setSubmitted(true);
    if (valuesEqual(question.answer, chosen)) {
      answeredCorrect((prev) => prev + 1);
      setIsCorrect(true);
      colorRef.current.classList.remove("bg-slate-200");
      colorRef.current.classList.add("bg-green-200");
    } else {
      answeredCorrect(0);
      colorRef.current.classList.remove("bg-slate-200");
      colorRef.current.classList.add("bg-red-200");
    }
  };

  const handleRegenerate = () => {
    setChosen(null);
    setQuestion(generatorLogic(category));
    if (!submitted) {
      answeredCorrect(0);
    }
    setSubmitted(false);
    setViewSolution(false);
    resetTimer();
  }

  if (!question) return <section className="h-screen" />;

  return (
    <section className="flex flex-col lg:flex-row gap-8">
      <div className="flex-1">
        <h1 className="flex items-center gap-2 font-semibold text-2xl text-sky-800 mb-3">
          <img src={problemIcon} alt="problem icon" />
          Random Problem Generator
        </h1>

        <p>{question.question}</p>
        <img
          src={question.image}
          alt="question pic"
          className="w-96 block mx-auto"
        />

        <p className="mt-5 mb-3">Please choose one of the following answers:</p>
        <QuestionChoices
          question={question}
          chosen={chosen}
          setChosen={setChosen}
          colorRef={colorRef}
          submitted={submitted}
        />

        <div className="flex justify-end items-center gap-5 font-semibold mt-8">
          <button
            className={`bg-slate-200 w-44 p-2.5 rounded ${submitted ? "" : "text-gray-500"}`}
            onClick={() => setViewSolution(!viewSolution)}
            disabled={!submitted}
          >
            {viewSolution ? "Hide Solution" : "View Solution"}
          </button>

          {(!chosen || submitted) ? (
            <button
              className=" bg-slate-700 text-white w-44 p-2.5 rounded flex justify-center items-center gap-2"
              onClick={handleRegenerate}
            >
              Regenerate <ArrowPathIcon className="h-5 w-5" />
            </button>
          ) : (
            <button
              className="bg-slate-700 text-white w-44 p-2.5 rounded"
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}
        </div>
      </div>

      {viewSolution &&
        <section className="bg-slate-200 rounded lg:sticky lg:top-[7.5vh] lg:max-h-[85vh] lg:w-[400px] lg:overflow-y-auto">
          <div className="p-5 text-sm w-full lg:absolute">
            <button
              className="float-right bg-slate-200 lg:sticky lg:top-0"
              onClick={() => setViewSolution(!viewSolution)}
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
            {question.solution}
          </div>
        </section>
      }
    </section>
  );
};

export default Question;