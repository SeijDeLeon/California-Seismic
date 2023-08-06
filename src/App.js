import logo from './logo.svg';
import './App.css';
import Header from './components/Header.jsx';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home.jsx';
import Lectures from './components/Lectures.jsx';
import Lecture from './components/Lecture.jsx';
import Practice from './components/Practice.jsx';
import ExamGuide from './components/ExamGuide.jsx';
import Contributors from './components/Contributors.jsx';
import UnderConstruction from './components/UnderConstruction.jsx';
import Footer from './components/Footer.jsx';

import BaseShear from './components/BaseShear.jsx';
import floorCalc from './components/floorCalc.jsx';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path = "/lectures" element = {<Lectures display='true' />} />
        <Route path = "/lectures/:id" element = {<Lecture display='true'/>} />
        <Route path = "/practice" element = {<Practice />} />
        <Route path = "/exam-guide" element = {<ExamGuide />} />
        <Route path = "/contributors" element = {<Contributors />} />
        <Route path = "/baseshear" element = {<BaseShear />} />
        <Route path = "/fc" element = {<floorCalc />} />
      </Routes>
      <UnderConstruction displayUnderConstruction={false}></UnderConstruction>
      <Footer />
    </div>
  );
}

export default App;
