import { useState, useEffect } from 'react';
import questionData from '../assets/questionData.js';

export default function QuestionDisplay( { questionKey='a1', setQuestionKey } ) {

  //search for the question that contains this questionKey. for future use, this questionKey can be an ID used in a 'GET' request to a server that has a database which contains all questions.
  var primaryIndex = questionKey.charCodeAt(0) - 97; //ASCII code for letter 'a' is 97
  var secondaryIndex = Number(questionKey.slice(1))-1;

  var question = [];
  var title = '';

  try {
    question =  questionData.data[primaryIndex].questions[secondaryIndex] ?  questionData.data[primaryIndex].questions[secondaryIndex] : questionData.data[0].questions[0];
    title = questionData.data[primaryIndex].title ? questionData.data[primaryIndex].title : questionData.data[0].title;

  } catch (error) {
    console.log('unable to find question selected for display in QuestionDisplay.jsx using questionKey ' + questionKey);
    question = questionData.data[0].questions[0];
    title = questionData.data[0].title;

  }

  const [checkedItem, setCheckedItem] = useState('');
  const [solutionDisplay, setSolutionDisplay] = useState(false);

  var answers = [question.answer, question.false1, question.false2, question.false3];

  var randomizedAnswers = [];

  const arrowChevronDown = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M12 17.414 3.293 8.707l1.414-1.414L12 14.586l7.293-7.293 1.414 1.414L12 17.414z"/></svg>;
  const arrowChevronUp = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="m12 6.586-8.707 8.707 1.414 1.414L12 9.414l7.293 7.293 1.414-1.414L12 6.586z"/></svg>
  useEffect(()=> {
  }, []);
  const getRandomBoolean = () => {
    var currentTime = new Date();
    return currentTime.getMilliseconds() % 2;
  };

  for (let i = 0; i < 4; i++) {
    if (getRandomBoolean()) {
      if (getRandomBoolean()) {
        randomizedAnswers.push(answers.pop());
      } else {
        randomizedAnswers.unshift(answers.pop());
      }
    } else {
      if (getRandomBoolean()) {
        randomizedAnswers.push(answers.shift());
      } else {
        randomizedAnswers.unshift(answers.shift());
      }
    }
  }

  const handleChange = (e) => {
    setCheckedItem(e.currentTarget.value);
  }

  const toggleSolutionDisplay = () => {
    setSolutionDisplay(!solutionDisplay);
  }



  return (
    <div className='max-w-4xl px-16 bg-white border-solid border rounded-md m-auto py-4'>
      <div className='block'>{title}</div>
      <div className='flex justify-center'>
        <p>Previous</p>
        <p>Next</p>
      </div>
      <p className='flex max-w-md m-auto border-solid border'>{`Q: ${question.question}`}</p>
      <div className='block py-4 m-auto'>
        {randomizedAnswers.map((answer, index) => {
          return (
            <label key={index} className={`block text-left ${(answer===question.answer && solutionDisplay)? 'bg-gradient-to-r from-yellow-200' : ''}`}>
              <input type='radio' value={answer} onChange={handleChange} checked={checkedItem === answer}/> &#160;{answer}
            </label>
          )
        })}
      </div>
      <section className='bg-gradient-to-r from-blue-300 via-sky-200 to-sky-100 rounded m-auto shadow-inner'>
        <p className='cursor-pointer' onClick={toggleSolutionDisplay}>{solutionDisplay ? 'Hide Solution': 'Show Solution' }</p>
        {solutionDisplay ?
          <div>
            <p>{`Answer: ${question.answer}`}</p>
            <p className='text-left p-4'>{question.solution}</p>
          </div>
        : <></>}
        <div className='fill-white hover:fill-black m-auto flex justify-center cursor-pointer' onClick={toggleSolutionDisplay}>{solutionDisplay ? arrowChevronUp : arrowChevronDown}</div>
      </section>
    </div>


  )
}
