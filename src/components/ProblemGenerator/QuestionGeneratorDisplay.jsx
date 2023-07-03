import React from "react";
import Timer from "./Timer";
import Question from "./Question";

const QuestionGeneratorDisplay = () => {
  return (
    <>
      <div>
        <Timer />
      </div>
      <Question />
    </>
  );
};

export default QuestionGeneratorDisplay;
