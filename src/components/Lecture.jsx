import UnderConstruction from './UnderConstruction.jsx';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../App.css';

export default function Lectures({ display=false }) {
  //define stuff
  const { id } = useParams();
  const idInt = parseInt(id, 10) - 1;


  const lectureData = [
    { title: '01: Intro to Seismic Exam',
      googleLink:'https://docs.google.com/document/d/e/2PACX-1vRXMDtgh4vUDHDi0YmJNOHZK_S6x-XqTingo_6fTYuu-rvtGR4IcrbAy5rb0SvDE4gzDlGIEfbdFcx7/pub?embedded=true',
      references:['https://www.bpelsg.ca.gov/applicants/candidate_info.shtml'],
      summary:'This lecture is an overview of the California Seismic Principles Exam. The basics of where the exam sits on the path to earning a PE license, and its requirements will be explained. Nothing in this lecture will be on the exam',
      prereqs:['none'],
      objectives:['Exam requirements and general information']},

    { title: '02: Geology & Earthquakes',
      googleLink:'https://docs.google.com/document/d/e/2PACX-1vRXMDtgh4vUDHDi0YmJNOHZK_S6x-XqTingo_6fTYuu-rvtGR4IcrbAy5rb0SvDE4gzDlGIEfbdFcx7/pub?embedded=true',
      references:['https://www.asce.org/publications-and-news/asce-7', 'https://www.bpelsg.ca.gov/applicants/candidate_info.shtml'],
      summary:'How do earthquakes occur, and how does historical data make its way into the building code? The basics of seismology are discussed in this lecture, with a key emphasis on the modern building code.',
      prereqs:['none'],
      objectives:['Different types of seismic waves', 'The difference between different magnitudes', 'How ground motions can be used to develop spectral accelerations', 'How the building code approaches sets limits on seismic risk']},

    { title: '03: Code Provisions',
      googleLink:'https://docs.google.com/document/d/e/2PACX-1vRXMDtgh4vUDHDi0YmJNOHZK_S6x-XqTingo_6fTYuu-rvtGR4IcrbAy5rb0SvDE4gzDlGIEfbdFcx7/pub?embedded=true',
      references:['https://www.asce.org/publications-and-news/asce-7'],
      summary:'Building codes and reference standards are the basis for ensuring that structures are designed to a minimum standard. This lecture provides a brief history and overview of building codes to illustrate how ASCE 7 is related to the overall permitting process.',
      prereqs:['none'],
      objectives:['The origin of the building code', 'How design standards are enforced', 'The risk of collapse for building structures due to earthquakes in a 50 year period']},

      { title: '04: Site Conditions',
      googleLink:'https://docs.google.com/document/d/e/2PACX-1vRXMDtgh4vUDHDi0YmJNOHZK_S6x-XqTingo_6fTYuu-rvtGR4IcrbAy5rb0SvDE4gzDlGIEfbdFcx7/pub?embedded=true',
      references:[],
      summary:'The magnitude of seismic waves depend on local soil conditions. ASCE 7 provides a method for adjusting base line seismic accelerations for unique soil conditions, discussed in this lecture. Determining site condition parameters is a basic skill that will be tested thoroughly on the exam.',
      prereqs:['Basics of seismic waves', 'Spectral acceleration'],
      objectives:['How to define seismic risk in terms of probabilities','Calculate site class', 'Calculate design response acceleration']},

      { title: '05: Risk Categories',
      googleLink:'https://docs.google.com/document/d/e/2PACX-1vRXMDtgh4vUDHDi0YmJNOHZK_S6x-XqTingo_6fTYuu-rvtGR4IcrbAy5rb0SvDE4gzDlGIEfbdFcx7/pub?embedded=true',
      references:[],
      summary:'The expected performance of building structures is set by the type of structure. Depending on the importance of a building, stricter seismic guidelines and even larger design forces are required. ASCE 7 provides a procedure for setting up these guidelines through design categories and importance factors, discussed in this lecture.',
      prereqs:['none'],
      objectives:['Use the CBC to assess risk categories','Calculate Seismic Design Categories', 'Calculate Seismic Importance Factors']},

    { title: '06: Building Systems',
      googleLink:'https://docs.google.com/document/d/e/2PACX-1vRXMDtgh4vUDHDi0YmJNOHZK_S6x-XqTingo_6fTYuu-rvtGR4IcrbAy5rb0SvDE4gzDlGIEfbdFcx7/pub?embedded=true',
      references:[],
      summary:'Modern buildings utilize vertical and lateral resisting systems to resist both gravity loads and seismic/wind loads. Different systems have better performance than others, and ASCE 7 places limitations on lateral systems depending on relative seismic risk. This lecture covers how to verify which type of lateral system can be used depending on seismic risk, as well as methods for calculating essential building properties like fundamental period',
      prereqs:['none'],
      objectives:['How to analyze a SDOF structure for moment and shear', 'Calculate the fundament period of an SDOF mass', 'Calculate building period using ASCE 7', 'Visually identify different structural systems', 'Assess structural height limitations', 'Understand the difference between stories and levels']},

    { title: '07: Ductility',
      googleLink:'https://docs.google.com/document/d/e/2PACX-1vRXMDtgh4vUDHDi0YmJNOHZK_S6x-XqTingo_6fTYuu-rvtGR4IcrbAy5rb0SvDE4gzDlGIEfbdFcx7/pub?embedded=true',
      references:[],
      summary:'',
      prereqs:['none'],
      objectives:['']},

    { title: '08: Base Shear',
      googleLink:'https://docs.google.com/document/d/e/2PACX-1vRXMDtgh4vUDHDi0YmJNOHZK_S6x-XqTingo_6fTYuu-rvtGR4IcrbAy5rb0SvDE4gzDlGIEfbdFcx7/pub?embedded=true',
      references:[],
      summary:'',
      prereqs:['none'],
      objectives:['']},

    { title: '09: Force Distribution',
      googleLink:'https://docs.google.com/document/d/e/2PACX-1vRXMDtgh4vUDHDi0YmJNOHZK_S6x-XqTingo_6fTYuu-rvtGR4IcrbAy5rb0SvDE4gzDlGIEfbdFcx7/pub?embedded=true',
      references:[],
      summary:'',
      prereqs:['none'],
      objectives:['']},

    { title: '10: Drift',
      googleLink:'https://docs.google.com/document/d/e/2PACX-1vRXMDtgh4vUDHDi0YmJNOHZK_S6x-XqTingo_6fTYuu-rvtGR4IcrbAy5rb0SvDE4gzDlGIEfbdFcx7/pub?embedded=true',
      references:[],
      summary:'',
      prereqs:['none'],
      objectives:['']},

    { title: '11: Flexible Diaphragms',
      googleLink:'https://docs.google.com/document/d/e/2PACX-1vRXMDtgh4vUDHDi0YmJNOHZK_S6x-XqTingo_6fTYuu-rvtGR4IcrbAy5rb0SvDE4gzDlGIEfbdFcx7/pub?embedded=true',
      references:[],
      summary:'',
      prereqs:['none'],
      objectives:['']},

    { title: '12: Rigid Diaphragms',
      googleLink:'https://docs.google.com/document/d/e/2PACX-1vRXMDtgh4vUDHDi0YmJNOHZK_S6x-XqTingo_6fTYuu-rvtGR4IcrbAy5rb0SvDE4gzDlGIEfbdFcx7/pub?embedded=true',
      references:[],
      summary:'',
      prereqs:['none'],
      objectives:['']},

    { title: '13: Irregularities',
      googleLink:'https://docs.google.com/document/d/e/2PACX-1vRXMDtgh4vUDHDi0YmJNOHZK_S6x-XqTingo_6fTYuu-rvtGR4IcrbAy5rb0SvDE4gzDlGIEfbdFcx7/pub?embedded=true',
      references:[],
      summary:'',
      prereqs:['none'],
      objectives:['']},

    { title: '14: Non-structural Components',
      googleLink:'https://docs.google.com/document/d/e/2PACX-1vRXMDtgh4vUDHDi0YmJNOHZK_S6x-XqTingo_6fTYuu-rvtGR4IcrbAy5rb0SvDE4gzDlGIEfbdFcx7/pub?embedded=true',
      references:[],
      summary:'',
      prereqs:['none'],
      objectives:['']},

    { title: '15: Seismic Detailing',
      googleLink:'https://docs.google.com/document/d/e/2PACX-1vRXMDtgh4vUDHDi0YmJNOHZK_S6x-XqTingo_6fTYuu-rvtGR4IcrbAy5rb0SvDE4gzDlGIEfbdFcx7/pub?embedded=true',
      references:[],
      summary:'',
      prereqs:['none'],
      objectives:['']},
  ];

  const Sidebar = <aside className='text-left sticky top-32'><ul>
    {lectureData.map((lecture) => <li className={(id===lecture.title.slice(0,2) ? 'bg-sky-100 font-bold py-2' : 'py-2')} key={lecture.title}>{lecture.title}</li>)}
    </ul></aside>

useEffect(()=> {
  const target = document.getElementById('googleDoc');
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://docs.google.com/document/d/e/2PACX-1vRXMDtgh4vUDHDi0YmJNOHZK_S6x-XqTingo_6fTYuu-rvtGR4IcrbAy5rb0SvDE4gzDlGIEfbdFcx7/pub?embedded=true', true);
  xhr.onload = function() {
    // write contents of google doc (inlcuding images) to div
    target.innerHTML = xhr.responseText;
  };
  xhr.send();
},[])

  return (
    <main className='max-w-screen-xl m-auto'>
      <h1 className='text-center text-sky-800 text-3xl tracking-wide font-semibold'>{`Lecture ${lectureData[parseInt(id, 10)-1].title}`}</h1>
      <div className='flex h-full'>
        <div className='sm:w-0 hidden lg:block lg:w-2/12 '>
          {Sidebar}
        </div>
        <section className='sm:w-full  lg:w-8/12 overflow-auto flex flex-col justify-center'>
          <iframe className='m-auto mt-8' width="560" height="315" src="https://www.youtube.com/embed/_exd39bNjDY" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
          <div className='max-w-lg m-auto'>
            <h3>Lecture summary</h3>
            <p className='text-left pl-4'>{lectureData[idInt].summary}</p>
            <h3>Lecture Pre-Requisites</h3>
            <ul className='text-left pl-4'>{lectureData[idInt].prereqs.map((prereq) => <li key={prereq}>{prereq}</li>)}</ul>
            <h3>After this lecture you will know</h3>
            <ul className='text-left pl-4'>{lectureData[idInt].objectives.map((objective) => <li key={objective}>{objective}</li>)}</ul>

          </div>
          <div className="w-full px-6" id='googleDoc'></div>
        </section>
        <div className='sm:w-0 border hidden lg:flex lg:w-2/12'></div>
      </div>
    </main>
  )

}