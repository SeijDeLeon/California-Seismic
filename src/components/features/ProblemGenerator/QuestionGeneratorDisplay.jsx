import { useState, useEffect, useRef } from "react";
import Timer from "./Timer";
import Question from "./Question";
import CategoryList from "./CategoryList";
import Tooltip from "./Tooltip";

const QuestionGeneratorDisplay = () => {
  const [category, setCategory] = useState("Fundamental Period");
  const [answeredCorrect, setAnsweredCorrect] = useState(0);
  const [bestScore, setBestScore] = useState(
    localStorage.getItem("bestScore")
      ? parseInt(JSON.parse(localStorage.getItem("bestScore")))
      : 0
  );
  useEffect(() => {
    if (answeredCorrect > bestScore) {
      setBestScore(answeredCorrect);
    }
  }, [answeredCorrect]);
  useEffect(() => {
    localStorage.setItem("bestScore", JSON.stringify(bestScore));
  }, [bestScore]);

  const timerRef = useRef();
  const resetTimer = () => timerRef.current?.resetTimer();

  return (
    <main className="text-start px-4 mx-auto my-8 max-w-screen-xl relative">
      <CategoryList
        category={category}
        setCategory={setCategory}
        resetTimer={resetTimer}
      />
      <section className="flex justify-between items-center text-sm lg:block lg:absolute lg:bottom-0 my-5 lg:my-0 z-10">
        <Tooltip content="Timer for 2:45 mins. Changes to red color after specified time.">
          <Timer ref={timerRef} />
        </Tooltip>
        <div className="flex justify-between w-[175px]">
          <Tooltip content="Streak of correctly answered in current session.">
            <div className="flex items-center gap-5">
              <p className="text-gray-500">Current</p>
              <p className="font-bold">{answeredCorrect}</p>
            </div>
          </Tooltip>
          <Tooltip content="Best streak of correctly answered in all sessions.">
            <div className="flex items-center gap-5">
              <p className="text-gray-500">Best</p>
              <p className="font-bold">{bestScore}</p>
            </div>
          </Tooltip>
        </div>
      </section>
      <Question
        category={category}
        answeredCorrect={setAnsweredCorrect}
        resetTimer={resetTimer}
      />
    </main>
  );
};

export default QuestionGeneratorDisplay;