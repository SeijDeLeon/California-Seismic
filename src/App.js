import { Route, Routes, useLocation } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Header from './components/common/Header.jsx';
import Home from './routes/Home.jsx';
import Lectures from './routes/Lectures.jsx';
import Lecture from './routes/Lecture.jsx';
import Practice from './routes/Practice.jsx';
import ExamGuide from './routes/ExamGuide.jsx';
import Contributors from './routes/Contributors.jsx';
import Footer from './components/common/Footer.jsx';
import Error404 from './routes/Error404';
import PracticeExams from './routes/PracticeExams.jsx';
import PracticeExamSingle from './routes/PracticeExamSingle.jsx';
import SinglePracticeExamResult from './components/features/ExamSimulator/SinglePracticeExamResult.jsx';
import USGS from './routes/USGS.jsx';
import PracticeRandom from './routes/PracticeRandom.jsx';
import ASCE7 from './routes/ASCE7.jsx';
import BaseShearApp from './routes/BaseShearApp.jsx';
import Demo from './routes/Demo.jsx';
import Solver from './routes/SolverPage.jsx';

//Google Analytics
import ReactGA from 'react-ga4';
import ExamsHistory from './components/features/ExamSimulator/ExamsHistory.jsx';
const TRACKING_ID = 'G-7M8L6VYQZH';
ReactGA.initialize(TRACKING_ID);

function App() {
  const location = useLocation();
  const hideHeaderFooter =
    location.pathname.startsWith('/practice/exams/') &&
    !location.pathname.endsWith('/result');

  return (
    <div className="App">
      {!hideHeaderFooter && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/index.html" element={<Home />} />
        <Route path="/lectures" element={<Lectures display="true" />} />
        <Route path="/lectures/:id" element={<Lecture display="true" />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/practice/exams" element={<PracticeExams />} />
        <Route
          path="/practice/exams/:examId"
          element={<PracticeExamSingle />}
        />
        <Route
          path="/practice/exams/:examId/result"
          element={<SinglePracticeExamResult />}
        />
        <Route
          path="/practice/exams-history"
          element={<ExamsHistory />}
        />
        <Route path="/exam-guide" element={<ExamGuide display="true" />} />
        <Route path="/contributors" element={<Contributors />} />
        <Route path="/practice/random" element={<PracticeRandom />} />
        <Route path="/USGS" element={<USGS />} />
        <Route path="/ASCE7" element={<ASCE7 />} />
        <Route path="/ASCE7/:sectionParam" element={<ASCE7 />} />
        <Route path="/baseshear" element={<BaseShearApp />} />
        <Route path="/Solver" element={<Solver />} />
        <Route path="/demo" element={<Demo visible={true} />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

export default App;
