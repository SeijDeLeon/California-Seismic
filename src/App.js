import logo from './logo.svg';
import './App.css';
import Header from './components/Header.jsx';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home.jsx';
import Lectures from './components/Lectures.jsx';
import Practice from './components/Practice.jsx';
import ExamGuide from './components/ExamGuide.jsx';
import Contributors from './components/Contributors.jsx';
import UnderConstruction from './components/UnderConstruction.jsx';
import Footer from './components/Footer.jsx';



function App() {
  return (
    <div className="App overflow-x-hidden">
      <Header />
      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path = "/lectures" element = {<Lectures display='true' />} />
        <Route path = "/practice" element = {<Practice />} />
        <Route path = "/exam-guide" element = {<ExamGuide />} />
        <Route path = "/contributors" element = {<Contributors />} />
      </Routes>
      <UnderConstruction displayUnderConstruction={false}></UnderConstruction>
      <Footer />
    </div>
  );
}

export default App;
