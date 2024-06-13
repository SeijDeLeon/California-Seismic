import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'
import '../App.css';
import { lectureData } from '../assets/data/lectureData.js';

export default function Lectures({ display=false }) {
  const { id } = useParams(); //retrieve lecture id from url
  const idInt = parseInt(id, 10) - 1; //array based integer corresponding to lecture
  console.log("The parameter returned from useParams is: ");
  console.log({id});


  const Sidebar = <aside className='text-left sticky top-0'>
    <p className='text-lg text-left py-3 text-slate-500'>Lectures</p>
      <ul>
        {lectureData.map((lecture) => <li className={(id===lecture.title.slice(0,2) ? 'bg-sky-50 py-2' : 'text-slate-500 py-2')} key={lecture.title}> <NavLink to={`/lectures/${lecture.title.slice(0,2)}`}>{lecture.title}</NavLink> </li>)}
      </ul>
    </aside>

useEffect(()=> {
  const target = document.getElementById('googleDoc');
  var xhr = new XMLHttpRequest();
  xhr.open('GET', lectureData[idInt].googleLink, true);
  xhr.onload = function() {
    // write contents of google doc (inlcuding images) to div
    target.innerHTML = xhr.responseText;
  };
  xhr.send();
},[id])

  return (
    <main className='max-w-screen-2xl m-auto px-4'>
      <h1 className='text-center text-sky-800 text-3xl tracking-wide font-semibold'>{`Lecture ${lectureData[parseInt(id, 10)-1].title}`}</h1>
      <div className='flex h-full'>
        <div className='sm:w-0 hidden lg:block lg:w-2/12'>
          {Sidebar}
        </div>
        <section className='sm:w-full  lg:w-8/12 overflow-auto flex flex-col justify-center px-4'>
          <p className='text-sky-800 font-semibold text-lg text-left max-w-full border-b-2 border-r-0 border-t-0 border-l-0 border pt-4'>Overview</p>
          <div className='max-w-full m-auto bg-yellow-50 px-4 mt-4'>
            <h3 className='font-semibold pt-2'>Summary</h3>
            <p className='text-left pl-4'>{lectureData[idInt].summary}</p>
            <h3 className='font-semibold'>Pre-Requisites</h3>
            <ul className='text-left pl-4 list-disc'>{lectureData[idInt].prereqs.map((prereq) => <li key={prereq}>{prereq}</li>)}</ul>
            <h3 className='font-semibold'>Learning Goals</h3>
            <ul className='text-left pl-4 list-disc pb-4'>{lectureData[idInt].objectives.map((objective) => <li key={objective}>{objective}</li>)}</ul>
          </div>
          <p className='text-sky-800 font-semibold text-lg text-left max-w-full border-b-2 border-r-0 border-t-0 border-l-0 border pt-4'>Video Lecture</p>
          <iframe className='m-auto mt-8' width="560" height="315" src={lectureData[idInt].video} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
          <span className='flex max-w-full border-b-2 border-r-0 border-t-0 border-l-0 border pt-8 mb-8'>
            <p className='text-sky-800 font-semibold text-lg text-left '>Written Lecture</p>
            <a className='text-left text-sky-700 underline pl-8' href={lectureData[idInt].googleLink} target='_blank' rel='noopener noreferrer'>Open lecture in google docs &#10132;</a>
          </span>
          <div className="w-full px-6" id='googleDoc'></div>
        </section>
        <div className='sm:w-0 hidden lg:block lg:w-2/12'>
          <aside className='text-center sticky top-0'>
            <p className='text-lg text-left py-4 text-slate-500'>References</p>
              <ul className='text-left'>
                {lectureData[idInt].references.map((reference, index)=> <li className='py-2 text-sky-700 underline' key={index}><a target='_blank' rel='noopener noreferrer' href={reference[0]}>{reference[1]}</a></li>)}
              </ul>
          </aside>
        </div>
      </div>
    </main>
  )

}