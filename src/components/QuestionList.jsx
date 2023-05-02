import Question from './Question.jsx';
import { useState } from 'react';

export default function QuestionList( { questionList }) {

  const visibilityDefault = 'hidden';
  const visibilityToggle = 'block'
  const bgColorDefault = 'bg-sky-800';
  const bgColorToggle = 'bg-gray-100';
  const textColorDefault = 'text-white';
  const textColorToggle = 'text-black';

  var fraction = '1/10';
  var completed = 2;
  var total = questionList.questions.length;

  const [visibilityClass, setVisibilityClass] = useState(visibilityDefault);
  const [bgColorClass, setBgColorClass] = useState(bgColorDefault);
  const [textColorClass, setTextColorClass] = useState(textColorDefault);


  const toggleVisibility = () => {
    visibilityClass === visibilityDefault ? setVisibilityClass(visibilityToggle) : setVisibilityClass(visibilityDefault);
    bgColorClass === bgColorDefault ? setBgColorClass(bgColorToggle) : setBgColorClass(bgColorDefault);
    textColorClass === textColorDefault ? setTextColorClass(textColorToggle) : setTextColorClass(textColorDefault);

  }

  return (
    <>
      <div onClick={toggleVisibility} className={`cursor-pointer flex ${bgColorClass} ${textColorClass}`}>
        <div className='w-1/2 text-lg text-left'>{questionList.title} </div>
        <div className='w-1/2 flex items-center'>
          <p className='w/1-4 text-left'>{`(${completed}/${total})`}</p>
          <div className='bg-gray-100 h-4 w-3/4'>
            <div style={ {width: `${completed/total*100}%`} } className={`bg-amber-300 text-left h-full`}></div>
          </div>
        </div>
      </div>
      <div className={visibilityClass} >
        {questionList.questions.map( (question, index) =>
          <Question question={question} key={question.key ? question.key : index} />
        )}
      </div>
    </>
  )
}