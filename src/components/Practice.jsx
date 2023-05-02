import UnderConstruction from './UnderConstruction.jsx';
import questionList from '../assets/questionData.js';
import QuestionList from './QuestionList.jsx';

export default function Practice( { display=true }) {

  if (display === false) {
    return (
      <UnderConstruction displayUnderConstruction={true}></UnderConstruction>
    );
  } else {
    return (
      <main>
        <h1> Practice</h1>
        {questionList.data.map((questionList, index) =>
          <QuestionList questionList={questionList} key={questionList.title ? questionList.title : index}/>
        )}

      </main>
    )
  }


}