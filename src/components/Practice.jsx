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
      <main>
        <h1> Practice</h1>
        <QuestionDisplay questionKey={questionKey}/>
        <QuestionTable setQuestionKey={setQuestionKey}/>
      </main>
    )
  }


}