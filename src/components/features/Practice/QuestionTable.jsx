import questionData from '../../../assets/data/questionData.js';
import QuestionSubTable from './QuestionSubTable.jsx';
export default function QuestionTable({ setQuestionKey }) {

  return (
    <div className='sm:max-w-2xl md:max-w-4xl m-auto py-4'>
      {questionData.data.map((questionList, index) =>
        <QuestionSubTable setQuestionKey={setQuestionKey} questionList={questionList} key={questionList.title ? questionList.title : index}/>
      )}
    </div>
  )
}