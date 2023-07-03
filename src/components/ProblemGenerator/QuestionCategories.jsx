import React from "react";
import { useNavigate } from "react-router-dom";

const QuestionCategories = () => {
  const navigate = useNavigate();
  return (
    <div className="question-categories">
      <div
        className="question-category"
        onClick={() => navigate("/questionGeneratorDisplay")}
      >
        Category 1
      </div>
      <div
        className="question-category"
        onClick={() => navigate("/questionGeneratorDisplay")}
      >
        Category 2
      </div>
      <div
        className="question-category"
        onClick={() => navigate("/questionGeneratorDisplay")}
      >
        Category 3
      </div>
      <div
        className="question-category"
        onClick={() => navigate("/questionGeneratorDisplay")}
      >
        Category 4
      </div>
      <div
        className="question-category"
        onClick={() => navigate("/questionGeneratorDisplay")}
      >
        Category 5
      </div>
      <div
        className="question-category"
        onClick={() => navigate("/questionGeneratorDisplay")}
      >
        Category 6
      </div>
    </div>
  );
};

export default QuestionCategories;
