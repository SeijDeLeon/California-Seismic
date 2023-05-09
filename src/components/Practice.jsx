import UnderConstruction from './UnderConstruction.jsx';
import questionData from '../assets/questionData.js';
import QuestionList from './QuestionList.jsx';
import Question from './Question.jsx';

export default function Practice( { display=true }) {

  if (display === false) {
    return (
      <UnderConstruction displayUnderConstruction={true}></UnderConstruction>
    );
  } else {
    return (
      <main>
        <h1> Practice</h1>
        <Question question={questionData.data[0].questions[0]} title={questionData.data[0].title}/>
        <div className='sm:max-w-2xl md:max-w-4xl m-auto py-4'>
          {questionData.data.map((questionList, index) =>
            <QuestionList questionList={questionList} key={questionList.title ? questionList.title : index}/>
          )}
        </div>
      </main>
    )
  }


}