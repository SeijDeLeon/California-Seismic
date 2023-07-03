import React from "react";

const Question = () => {
  const questionAnswer = {
    question: `Determine the fundamental period of the below SDOF structure. The
          height is [8-30] ft, the modulus of elasticity for the column is
          [29,000] ksi, and the mass at the top weighs [5-100] kips?`,
    choices: ["Option A", "Option B", "Option C", "Option D"],
  };
  return (
    <div className="question-container">
      <p>Question:</p>
      <div className="question">
        <p>{questionAnswer.question}</p>
        <ul className="choices">
          {questionAnswer.choices.map((choice) => (
            <li>{choice}</li>
          ))}
        </ul>
        <div>solution</div>
        <div>next >></div>
      </div>
    </div>
  );
};

export default Question;
