import { Route, Routes } from "react-router-dom";
import{ useEffect } from "react";

import logo from "./logo.svg";
import "./App.css";

import Header from "./components/common/Header.jsx";
import Home from "./routes/Home.jsx";
import Lectures from "./routes/Lectures.jsx";
import Lecture from "./routes/Lecture.jsx";
import Practice from "./routes/Practice.jsx";
import ExamGuide from "./routes/ExamGuide.jsx";
import Contributors from "./routes/Contributors.jsx";
import Footer from "./components/common/Footer.jsx";
import Error404 from "./routes/Error404";
import PracticeExams from "./routes/PracticeExams.jsx";
import PracticeExamSingle from "./routes/PracticeExamSingle.jsx";
import USGS from "./routes/USGS.jsx";
import PracticeRandom from "./routes/PracticeRandom.jsx";
import ASCE7 from "./routes/ASCE7.jsx";



//Google Analytics
import ReactGA from 'react-ga4';
const TRACKING_ID = "G-7M8L6VYQZH";
ReactGA.initialize(TRACKING_ID);


function App() {

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/index.html" element={<Home />} />
        <Route path="/lectures" element={<Lectures display="true" />} />
        <Route path="/lectures/:id" element={<Lecture display="true" />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/practice/exams" element={<PracticeExams />} />
        <Route path="/practice/exams/:examId" element={<PracticeExamSingle />} />
        <Route path="/exam-guide" element={<ExamGuide display="true"/>} />
        <Route path="/contributors" element={<Contributors />} />
        <Route path="/practice/random" element={<PracticeRandom />} />
        <Route path="/USGS" element={<USGS />} />
        <Route path="/ASCE7" element={<ASCE7 />} />
        <Route path="/ASCE7/:sectionParam" element={<ASCE7 />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
