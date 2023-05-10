import QuestionRow from './QuestionRow.jsx';
import { useState, useEffect } from 'react';

export default function QuestionSubTable( { setQuestionKey, questionList }) {

  const heightDefault = '0';
  const maxTableHeight = 2*questionList.questions.length +2; //table row height is set as h-8 or 2rem
  const heightToggle = maxTableHeight+'rem';
  const bgColorDefault = 'bg-sky-800';
  const bgColorToggle = 'bg-sky-500';
  const textColorDefault = 'text-white';
  const textColorToggle = 'text-black';
  const borderStyle = 'border-solid border-2'

  const [tableHeight, setTableHeight] = useState(heightDefault);
  const [bgColorClass, setBgColorClass] = useState(bgColorDefault);
  const [textColorClass, setTextColorClass] = useState(textColorDefault);
  const [completedCount, setCompletedCount] = useState(0);

  //setup for recording total number of questions completed

  const total = questionList.questions.length;

  useEffect(() => {
    if (!localStorage.getItem(questionList.title)) {
      //set new data to localStorage
      console.log('writing new data to' + questionList.title);
      var defaultKeys = {};
      for (let i = 0; i < total; i++) {
        defaultKeys[questionList.questions[i].key] = false;
      }
      localStorage.setItem(questionList.title, JSON.stringify(defaultKeys));
    } else {
      //retrieve existing data from localStorage
      var localStorageData = JSON.parse(localStorage.getItem(questionList.title));
      var count = 0;
      for (var key in localStorageData) {
        if (localStorageData[key]) {
          count++;
        }
        setCompletedCount(count);
      }
    }
  }, [])

  const toggleVisibility = () => {
    tableHeight === heightDefault ? setTableHeight(heightToggle) : setTableHeight(heightDefault);
    bgColorClass === bgColorDefault ? setBgColorClass(bgColorToggle) : setBgColorClass(bgColorDefault);
    textColorClass === textColorDefault ? setTextColorClass(textColorToggle) : setTextColorClass(textColorDefault);
  }

  return (
    <>
      <div onClick={toggleVisibility} className={`cursor-pointer flex justify-between hover:bg-sky-700 border-solid border border-slate-500 ${bgColorClass} ${textColorClass}`}>
        <p className='w-1/2 text-lg text-left pl-4'>{questionList.title} </p>
        <div className='w-1/2 flex items-center'>
          <p className='w/1-4 text-left pr-2'>{`(${completedCount}/${total})`}</p>
          <div className='bg-gray-100 h-4 w-3/4'>
            <div style={ {width: `${completedCount/total*100}%`} } className={`bg-amber-300 text-left h-full transition-all`}></div>
          </div>
        </div>
      </div>
      <div style={ {maxHeight: `${tableHeight}`, transition: 'max-height 0.1s linear'}} className={`overflow-hidden`}>
        <table className={`w-full border-spacing-0 border-collapse ${borderStyle}`} >
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
              <QuestionRow question={question} completedCount={completedCount} setCompletedCount={setCompletedCount} title={questionList.title} borderStyle={borderStyle} key={question.key ? question.key : index} />
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}