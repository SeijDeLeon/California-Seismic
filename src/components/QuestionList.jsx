import Question from './Question.jsx';
import { useState } from 'react';

export default function QuestionList( { questionList }) {

  const visibilityDefault = 'hidden';
  const visibilityToggle = 'default'
  const bgColorDefault = 'bg-sky-800';
  const bgColorToggle = 'bg-sky-500';
  const textColorDefault = 'text-white';
  const textColorToggle = 'text-black';
  const borderStyle = 'border-solid border-2'

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
      <div onClick={toggleVisibility} className={`cursor-pointer flex hover:bg-sky-700 ${bgColorClass} ${textColorClass}`}>
        <div className='w-1/2 text-lg text-left'>{questionList.title} </div>
        <div className='w-1/2 flex items-center'>
          <p className='w/1-4 text-left'>{`(${completed}/${total})`}</p>
          <div className='bg-gray-100 h-4 w-3/4'>
            <div style={ {width: `${completed/total*100}%`} } className={`bg-amber-300 text-left h-full`}></div>
          </div>
        </div>
      </div>
      <table className={`w-full border-spacing-0 border-collapse ${borderStyle} ${visibilityClass}`} >
        <thead className={`${borderStyle}`}>
          <tr className={borderStyle}>
            <th className={`${borderStyle}`}>Status</th>
            <th className={`text-left pl-4 ${borderStyle}`}>Problem</th>
            <th className={` ${borderStyle}`}>Difficulty</th>
            <th className={` ${borderStyle}`}>Related Lectures</th>
          </tr>
        </thead>
        <tbody className={borderStyle}>
          {questionList.questions.map( (question, index) =>
            <Question question={question} borderStyle={borderStyle} key={question.key ? question.key : index} />
          )}
        </tbody>
      </table>
    </>
  )
}