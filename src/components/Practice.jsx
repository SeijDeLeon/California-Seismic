import { useState } from 'react';

import UnderConstruction from './UnderConstruction.jsx';
import questionData from '../assets/questionData.js';
import QuestionDisplay from './QuestionDisplay.jsx';
import QuestionTable from './QuestionTable.jsx';

export default function Practice( { display=true }) {

  const [questionKey, setQuestionKey] = useState(questionData.data[0].questions[0].key);
  if (display === false) {
    return (
      <UnderConstruction displayUnderConstruction={true}></UnderConstruction>
    );
  } else {
    return (
      <main className='min-h-[calc(92vh-120px)] flex flex-col justify-center bg-gray-100'>
        <div className='max-w-screen-2xl mx-auto px-4'>
          <QuestionDisplay questionKey={questionKey} setQuestionKey={setQuestionKey}/>
          <QuestionTable setQuestionKey={setQuestionKey}/>
        </div>
      </main>
    )
  }


}