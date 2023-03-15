import logo from './logo.svg';
import './App.css';
import Header from './components/Header.jsx';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home.jsx';
import Lectures from './components/Lectures.jsx';
import Practice from './components/Practice.jsx';
import ExamGuide from './components/ExamGuide.jsx';


function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path = "/lectures" element = {<Lectures />} />
        <Route path = "/practice" element = {<Practice />} />
        <Route path = "/exam-guide" element = {<ExamGuide />} />
      </Routes>
      <h1 className='text-3xl font-bolt underline'>Footer</h1>
    </div>
  );
}

export default App;
