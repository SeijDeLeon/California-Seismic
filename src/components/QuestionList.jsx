import Question from './Question.jsx';
import { useState } from 'react';

export default function QuestionList( { questionList }) {

  const visibilityDefault = 'hidden';
  const visibilityToggle = 'block'
  const bgColorDefault = 'bg-sky-800';
  const bgColorToggle = 'bg-gray-100';
  const textColorDefault = 'text-white';
  const textColorToggle = 'text-black';

  const [visibilityClass, setVisibilityClass] = useState(visibilityDefault);
  const [bgColorClass, setBgColorClass] = useState(bgColorDefault);
  const [textColorClass, setTextColorClass] = useState(textColorDefault);


  const toggleVisibility = () => {
    visibilityClass === visibilityDefault ? setVisibilityClass(visibilityToggle) : setVisibilityClass(visibilityDefault);
    bgColorClass === bgColorDefault ? setBgColorClass(bgColorToggle) : setBgColorClass(bgColorDefault);
    textColorClass === textColorDefault ? setTextColorClass(textColorToggle) : setTextColorClass(textColorDefault);

  }

  return (
    <div>
      <div onClick={toggleVisibility} className={`cursor-pointer ${bgColorClass} ${textColorClass}`}>{questionList.title} </div>
      <div className={visibilityClass} >
        {questionList.questions.map( (question, index) =>
          <Question question={question} key={question.key ? question.key : index} />
        )}
      </div>
    </div>
  )
}