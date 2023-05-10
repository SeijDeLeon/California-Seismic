import { useState, useEffect } from 'react';

export default function Question( { question, title } ) {

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
      <div className='block'>Earthquakes</div>
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
        <p className='cursor-pointer' onClick={toggleSolutionDisplay} >Solution</p>
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
