import React, { useState } from "react";
import Timer from "./Timer";
import Question from "./Question";

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
  return (
    <div className="w-2/3 m-auto">
      <div className="grid grid-cols-3 gap-5 m-5 ">
        {categories.map((item) => (
          <div
            className="border-2 rounded-lg cursor-pointer"
            onClick={(e) => setCategory(e.target.value)}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="flex justify-around">
        <div className="border-2 rounded-full shadow-xl w-40">Current</div>
        <Timer />
        <div className="border-2  shadow-xl rounded-full w-40">Best</div>
      </div>
      <Question category={category} />
    </div>
  );
};

export default QuestionGeneratorDisplay;
