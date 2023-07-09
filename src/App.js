import logo from './logo.svg';
import './App.css';
import Header from './components/Header.jsx';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home.jsx';
import Lectures from './components/Lectures.jsx';
import Lecture from './components/Lecture.jsx';
import Practice from './components/Practice.jsx';
import ExamsListPage from './components/ExamsListPage';
import SinglePracticeExam from './components/SinglePracticeExam';
import ExamGuide from './components/ExamGuide.jsx';
import Contributors from './components/Contributors.jsx';
import UnderConstruction from './components/UnderConstruction.jsx';
import Footer from './components/Footer.jsx';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path = "/lectures" element = {<Lectures display='true' />} />
        <Route path = "/lectures/:id" element = {<Lecture display='true'/>} />
        <Route path = "/practice" element = {<Practice />} />
        <Route path = "/practice/exams" element = {<ExamsListPage />}/>
        <Route path = "/practice/exams/:examId" element = {<SinglePracticeExam />}/>
        <Route path = "/exam-guide" element = {<ExamGuide />} />
        <Route path = "/contributors" element = {<Contributors />} />
      </Routes>
      <UnderConstruction displayUnderConstruction={false}></UnderConstruction>
      <Footer />
    </div>
  );
}

export default App;
