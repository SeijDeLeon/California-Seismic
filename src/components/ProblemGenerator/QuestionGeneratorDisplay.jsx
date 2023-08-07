import React, { useState, useEffect } from "react";
import Timer from "./Timer";
import Question from "./Question";
import { Popover } from "@headlessui/react";
import Tooltip from "../Tooltip";
const QuestionGeneratorDisplay = () => {
  const categories = [
    "Fundamental Period",
    "Category 2",
    "Category 3",
    "Category 4",
    "Category 5",
    "Category 6",
  ];
  const [category, setCategory] = useState("Fundamental Period");
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [answeredCorrect, setAnsweredCorrect] = useState(0);
  const [bestScore, setBestScore] = useState(
    localStorage.getItem("bestScore")
      ? {
          correct: parseInt(
            JSON.parse(localStorage.getItem("bestScore")).correct
          ),
          total: parseInt(JSON.parse(localStorage.getItem("bestScore")).total),
        }
      : {
          correct: 0,
          total: 0,
        }
  );
  useEffect(() => {
    let prevBest = isNaN(bestScore.correct / bestScore.total)
      ? 0
      : bestScore.correct / bestScore.total;
    let currBest = isNaN(answeredCorrect / totalQuestions)
      ? 0
      : answeredCorrect / totalQuestions;
    if (answeredCorrect > bestScore.correct || currBest > prevBest) {
      setBestScore({
        ...bestScore,
        correct: answeredCorrect,
        total: totalQuestions,
      });
    }
  }, [totalQuestions]);
  useEffect(() => {
    localStorage.setItem("bestScore", JSON.stringify(bestScore));
  }, [bestScore]);
  return (
    <div className="w-2/3 m-auto">
      <div className="grid grid-cols-3 gap-5 m-5 ">
        {categories.map((item) => (
          <div
            className="border-2 rounded-lg cursor-pointer font-bold hover:bg-slate-300"
            onClick={(e) => setCategory(e.target.value)}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="flex justify-around m-10">
        <Tooltip content={"Streak of correctly answered in current session."}>
          <div className="border-2 rounded-full shadow-xl w-40 font-bold">
            <p>Current</p>
            <p className="font-extrabold text-xl">{answeredCorrect}</p>
          </div>
        </Tooltip>
        <Tooltip
          content={
            "Timer for 2:45 mins. Changes to red color after specified time."
          }
        >
          <Timer />
        </Tooltip>
        <Tooltip content={"Best streak of correctly answered in all sessions."}>
          <div className="border-2 rounded-full shadow-xl w-40 font-bold">
            <p>Best</p>
            {bestScore.correct}/{bestScore.total}
          </div>
        </Tooltip>
      </div>
      <Question
        category={category}
        totalQuestions={setTotalQuestions}
        answeredCorrect={setAnsweredCorrect}
      />
    </div>
  );
};

export default QuestionGeneratorDisplay;
