import { useState, useEffect } from 'react';
import ScrollToTop from './ScrollToTop.jsx';

export default function QuestionRow( { question, borderStyle, title, completedCount, setCompletedCount, setQuestionKey } ) {
  //returns a single Question

  const [checked, setChecked] = useState(false);
  const buttonClass = 'w-5 h-5 cursor-pointer text-xs text-sky-50 border-solid border border-slate-200';

  useEffect(() => {
    try {
        var data = JSON.parse(localStorage.getItem(title));
        var questionCompleted = data[question.key];
        if (questionCompleted) {
          setChecked(true);
        }
    } catch (error) {
      console.log(error);
    }
  }, []);
  //update check mark based on localstorage during initial render

  const updateLocalStorage = (completionStatus) => {
    try {
      var localStorageData = JSON.parse(localStorage.getItem(title));
      localStorageData[question.key] = completionStatus;
      localStorage.setItem(title, JSON.stringify(localStorageData));
     } catch (error) {
      console.log(error);
     }
  }
  const handleBoxClick = () => {
    if (checked) {
      //previously marked as true, now set to false
      updateLocalStorage(false);
      setChecked(false);
      setCompletedCount(completedCount-1);
    } else {
      //previously set as false, now set to true
      updateLocalStorage(true);
      setChecked(true);
      setCompletedCount(completedCount+1);
    }
  }

  const handleQuestionClick = () => {
    var QuestionDisplay = document.getElementById('QuestionDisplay');
    var questionDisplayHeight = QuestionDisplay.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({top: questionDisplayHeight, behavior: 'smooth'});
    setQuestionKey(question.key);
  }

  const Button = () => {
    return (
      <div className='flex justify-center'>
        <button type='checkbox' onClick={handleBoxClick} className={checked ? `bg-sky-500 ${buttonClass}` : `bg-sky-50 ${buttonClass}`}>&#10004;</button>
      </div>
    )
  }

  return (
    <tr className={`${borderStyle} h-8`}>
      <th className={borderStyle}><Button /></th>
      <th className={`${borderStyle} text-left pl-4 hover:cursor-pointer`} onClick={handleQuestionClick}>{question.description}</th>
      <th className={borderStyle}>{question.difficulty}</th>
      <th className={borderStyle}>{question.lectures}</th>
    </tr>

  )
}