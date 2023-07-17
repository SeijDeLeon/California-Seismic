import React, { useState } from "react";
import Timer from "./Timer";
import Question from "./Question";

const QuestionGeneratorDisplay = () => {
  const [category, setCategory] = useState("fundamentalPeriod");
  return (
    <div className="w-2/3 m-auto">
      <div className="grid grid-cols-3 gap-5 m-5 ">
        <div
          className="border-2 border-black rounded cursor-pointer"
          onClick={() => setCategory("fundamentalPeriod")}
        >
          Fundamental Period
        </div>
        <div
          className="border-2 border-black rounded cursor-pointer"
          onClick={(e) => setCategory(e.target.value)}
        >
          Category 2
        </div>
        <div
          className="border-2 border-black rounded cursor-pointer"
          onClick={(e) => setCategory(e.target.value)}
        >
          Category 3
        </div>
        <div
          className="border-2 border-black rounded cursor-pointer"
          onClick={(e) => setCategory(e.target.value)}
        >
          Category 4
        </div>
        <div
          className="border-2 border-black rounded cursor-pointer"
          onClick={(e) => setCategory(e.target.value)}
        >
          Category 5
        </div>
        <div
          className="border-2 border-black rounded cursor-pointer"
          onClick={(e) => setCategory(e.target.value)}
        >
          Category 6
        </div>
      </div>
      <div className="flex justify-around">
        <div className="border-2 border-black rounded-full w-40">Current</div>
        <Timer />
        <div className="border-2 border-black rounded-full w-40">Best</div>
      </div>
      <Question category={category} />
    </div>
  );
};

export default QuestionGeneratorDisplay;
