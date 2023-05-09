import { useState, useEffect } from 'react';

export default function Question( { question, title } ) {

  const [checkedItem, setCheckedItem] = useState('');
  const [solutionDisplay, setSolutionDisplay] = useState(false);

  var answers = [question.answer, question.false1, question.false2, question.false3];

  var randomizedAnswers = [];

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
    <div className='max-w-4xl bg-white border-solid border rounded-md m-auto'>
      <div className='block'>Earthquakes</div>
      <div className='flex justify-center'>
        <p>Previous</p>
        <p>Next</p>
      </div>
      <div className='flex max-w-md m-auto border-solid border' >
        <p>Q</p>
        <p>{question.question}</p>
      </div>
      <div className='block'>
        {randomizedAnswers.map((answer, index) => {
          return (
            <label key={index} className={`block text-left ${(answer===question.answer && solutionDisplay)? 'bg-yellow-200' : ''}`}>
              <input type='radio' value={answer} onChange={handleChange} checked={checkedItem === answer}/> {answer}
            </label>
          )
        })}
      </div>
      <section >
        <p className="cursor-pointer" onClick={toggleSolutionDisplay} >Solution</p>
        {solutionDisplay ?
          <div>
            <p>{`Answer: ${question.answer}`}</p>
            <p>{question.solution}</p>
          </div>
        : <></>}
      </section>
    </div>


  )
}
