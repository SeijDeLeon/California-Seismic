import { useState } from 'react';

import questionData from '../assets/data/questionData.js';
import QuestionDisplay from '../components/features/Practice/QuestionDisplay.jsx';
import QuestionTable from '../components/features/Practice/QuestionTable.jsx';

export default function Practice( ) {

  const [questionKey, setQuestionKey] = useState(questionData.data[0].questions[0].key);



    return (
      <main className='min-h-[calc(92vh-120px)] flex flex-col justify-center bg-gray-100'>
        <div className='max-w-screen-2xl mx-auto px-4'>
          <QuestionDisplay questionKey={questionKey} setQuestionKey={setQuestionKey}/>
          <QuestionTable setQuestionKey={setQuestionKey}/>
        </div>
      </main>
    )
  }
