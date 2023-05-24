import UnderConstruction from './UnderConstruction.jsx';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../App.css';

export default function Lectures({ display=false }) {
  //define stuff
  let { id } = useParams();
  const lectureLinks = [
    { title: '01: Intro to Seismic Exam', googleLink:'https://docs.google.com/document/d/e/2PACX-1vRXMDtgh4vUDHDi0YmJNOHZK_S6x-XqTingo_6fTYuu-rvtGR4IcrbAy5rb0SvDE4gzDlGIEfbdFcx7/pub?embedded=true', references:['https://www.asce.org/publications-and-news/asce-7', 'https://www.bpelsg.ca.gov/applicants/candidate_info.shtml']},
    { title: '02: Geology & Earthquakes', id:'02' },
    { title: '03: Code Provisions', id:'03' },
    { title: '04: Risk Categories', id:'04' },
    { title: '05: Building Systems', id:'05' },
    { title: '06: Ductility', id:'06' },
    { title: '07: Base Shear', id:'07' },
    { title: '08: Force Distribution', id:'08' },
    { title: '09: Drift', id:'09' },
    { title: '10: Flexible Diaphragms', id:'10A' },
    { title: '11: Rigid Diaphragms', id:'10B' },
    { title: '12: Irregularities', id:'11' },
    { title: '13: Non-structural Components', id:'12' },
    { title: '14: Seismic Detailing', id:'13' },
  ];

  const Sidebar = <div className='text-left sticky top-32'><ul>
    {lectureLinks.map((lecture) => <li className={(id===lecture.title.slice(0,2) ? 'bg-sky-100 font-bold py-2' : 'py-2')} key={lecture.title}>{lecture.title}</li>)}
    </ul></div>

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
      <div className='flex h-full'>
        <div className='sm:w-0 hidden lg:block lg:w-2/12 '>
          {Sidebar}
        </div>
        <section className='sm:w-full  lg:w-8/12 overflow-auto flex flex-col justify-center'>
          <iframe className='m-auto' width="560" height="315" src="https://www.youtube.com/embed/_exd39bNjDY" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
          <h1 className='text-center'>{`Lecture ${id}`}</h1>
          <div className="w-full px-6" id='googleDoc'></div>
        </section>
        <div className='sm:w-0 border hidden lg:flex lg:w-2/12'></div>
      </div>
      <div className='block' id='gdoc'>
        <h1>HERE</h1>
      </div>
    </main>
  )

}