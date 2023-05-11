import { useState, useEffect } from 'react';
import questionData from '../assets/questionData.js';

export default function QuestionDisplay( { questionKey='a1', setQuestionKey } ) {
  const arrowChevronDown = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M12 17.414 3.293 8.707l1.414-1.414L12 14.586l7.293-7.293 1.414 1.414L12 17.414z"/></svg>;
  const arrowChevronUp = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="m12 6.586-8.707 8.707 1.414 1.414L12 9.414l7.293 7.293 1.414-1.414L12 6.586z"/></svg>;
  const arrowChevronRight = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z"/></svg>;
  const arrowChevronLeft = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M15.293 3.293 6.586 12l8.707 8.707 1.414-1.414L9.414 12l7.293-7.293-1.414-1.414z"/></svg>;

  const splitText = (text) => {
    return text.split('\n').map((line, index) => (
      <p key={index}>
        {line}
        <br />
      </p>
    ));
  }

  //search for the question that contains this questionKey. for future use, this questionKey can be an ID used in a 'GET' request to a server that has a database which contains all questions.
  var primaryIndex = questionKey.charCodeAt(0) - 97; //ASCII code for letter 'a' is 97
  var secondaryIndex = Number(questionKey.slice(1))-1;

  var question = [];
  var title = '';
  var description='';
  var data = questionData.data;

  try {
    question =  data[primaryIndex].questions[secondaryIndex] ?  data[primaryIndex].questions[secondaryIndex] : data[0].questions[0];
    title = data[primaryIndex].title ? data[primaryIndex].title : data[0].title;
    description = data[primaryIndex].questions[secondaryIndex].description ? data[primaryIndex].questions[secondaryIndex].description : data[0].questions[0].description

  } catch (error) {
    console.log('unable to find question selected for display in QuestionDisplay.jsx using questionKey ' + questionKey);
    question = data[0].questions[0];
    title = data[0].title;
  }

  //determine total number of question in this section
  const totalQuestions = data[primaryIndex].questions.length;
  const totalSections = data.length;
  //get keys for the next and previous question
  var nextQuestionKey = 'a2'; //hardcode default if next is not found
  var prevQuestionKey = 'a1'; //hardcode default if prev is not found

  //set next key
  if (secondaryIndex + 1 < totalQuestions) {
    //same section, next question
    nextQuestionKey = data[primaryIndex].questions[secondaryIndex + 1].key;
  }
  else {
    //change section
    if (primaryIndex + 1 < totalSections) {
      //next section, first question
      nextQuestionKey = data[primaryIndex+1].questions[0].key;
    } else {
      //first section, first question
      nextQuestionKey = data[0].questions[0].key;
    }
  }

  //set previous key
  if (secondaryIndex > 0) {
    //same section, prev question
    prevQuestionKey = data[primaryIndex].questions[secondaryIndex - 1].key;
  } else {
    //change section
    if (primaryIndex > 0) {
      //prev section, last question
      prevQuestionKey = data[primaryIndex - 1].questions.slice(-1)[0].key;
    } else {
      //last section, last question
      prevQuestionKey = data.slice(-1)[0].questions.slice(-1)[0].key;
    }
  }



  const [checkedItem, setCheckedItem] = useState('');
  const [solutionDisplay, setSolutionDisplay] = useState(false);

  var answers = [question.answer, question.false1, question.false2, question.false3];

  var randomizedAnswers = [];


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

  const handleNextClick = () => {
    setSolutionDisplay(false);
    setCheckedItem('');
    setQuestionKey(nextQuestionKey);
  }

  const handlePrevClick = () => {
    setSolutionDisplay(false);
    setCheckedItem('');
    setQuestionKey(prevQuestionKey);
  }

  useEffect(() => {
    setSolutionDisplay(false);
    setCheckedItem('');
  },[questionKey])


  return (
    <div className='max-w-3xl px-16 bg-white border-solid border rounded-md m-auto py-4' id='QuestionDisplay'>
      <p className='text-lg font-bold underline-offset-2 underline'>{`${title} ${secondaryIndex + 1}/${totalQuestions}`}</p>
      <div className='flex justify-center fill-slate-400 text-slate-400 pb-4 text-sm'>
        <p onClick={handlePrevClick} className='flex items-center pr-3 hover:fill-slate-600 hover:cursor-pointer hover:text-slate-600 transition-all'> {arrowChevronLeft} Previous</p>
        <p onClick={handleNextClick} className='flex items-center pl-3 hover:fill-slate-600 hover:cursor-pointer hover:text-slate-600 transition-all'>Next {arrowChevronRight}</p>
      </div>
      <p className='flex m-auto'>{`Q: ${question.question}`}</p>
      <div className='block py-4 m-auto'>
        {randomizedAnswers.map((answer, index) => {
          return (
            <label key={index} className={`block text-left transition-all ${(answer===question.answer && solutionDisplay)? 'bg-gradient-to-r from-yellow-200' : ''}`}>
              <input type='radio' value={answer} onChange={handleChange} checked={checkedItem === answer}/> &#160;{answer}
            </label>
          )
        })}
      </div>
      <section className='bg-sky-200 rounded m-auto shadow-inner'>
        <p className='cursor-pointer' onClick={toggleSolutionDisplay}>{solutionDisplay ? '': 'Solution' }</p>
        {solutionDisplay ?
          <div className='text-left p-4 mx-5'>
            <p className='py-4'>{`Answer: ${question.answer}`}</p>
            <p className=''>{splitText(question.solution)}</p>
          </div>
        : <></>}
        <div className=' transition-all fill-white hover:fill-black m-auto flex justify-center cursor-pointer' onClick={toggleSolutionDisplay}>{solutionDisplay ? arrowChevronUp : arrowChevronDown}</div>
        <p className='hover:cursor-pointer' onClick={toggleSolutionDisplay}>{solutionDisplay ? '' : ''}</p>
      </section>
    </div>


  )
}
