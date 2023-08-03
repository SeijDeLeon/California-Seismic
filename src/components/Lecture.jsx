import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'
import '../App.css';

export default function Lectures({ display=false }) {
  const { id } = useParams(); //retrieve lecture id from url
  const idInt = parseInt(id, 10) - 1; //array based integer corresponding to lecture


  const lectureData = [
    { title: '01: Intro to Seismic Exam',
      googleLink:'https://docs.google.com/document/d/e/2PACX-1vTCoo5R3ujLPCx-fGyiV8gpGRDKGBgnX7OPOwH4UKyGBUPePJp-uNvq6sw6vJXL9v2S9j89FZH0CZBi/pub?embedded=true',
      references:[['https://www.bpelsg.ca.gov/applicants/candidate_info.shtml','Exam Website'],['https://www.asce.org/publications-and-news/asce-7','ASCE 7'],['https://codes.iccsafe.org/content/CABC2022P1','CBC']],
      summary:'This lecture is an overview of the California Seismic Principles Exam. The basics of where the exam sits on the path to earning a PE license, and its requirements will be explained. Nothing in this lecture will be on the exam',
      prereqs:['none'],
      objectives:['Exam requirements and general information'],
      video:'https://www.youtube.com/embed/yjVDpxXzc5M'},

    { title: '02: Geology & Earthquakes',
      googleLink:'https://docs.google.com/document/d/e/2PACX-1vTgK-Wt0tdhKtZHpgY7Vl9qmvFnYJvq8QRpkGKhwJ8WvoHJ5UXdc-aRx0ABaoZ-Kl174yqejes51PYS/pub?embedded=true',
      references:[],
      summary:'How do earthquakes occur, and how does historical data make its way into the building code? The basics of seismology are discussed in this lecture, with a key emphasis on the modern building code.',
      prereqs:['none'],
      objectives:['Different types of seismic waves', 'The difference between different magnitudes', 'How ground motions can be used to develop spectral accelerations', 'How the building code approaches sets limits on seismic risk'],
      video:'https://www.youtube.com/embed/lUUr4ILz57w'},

    { title: '03: Code Provisions',
      googleLink:'https://docs.google.com/document/d/e/2PACX-1vTPD1IDa1z8BDbZwxCdZctVGOjdkFaDtSkaCAjuONNihWFK-R9jfeYD7WaHWSmN3WXiZDmOCs9CKgKQ/pub?embedded=true',
      references:['https://www.asce.org/publications-and-news/asce-7'],
      summary:'Building codes and reference standards are the basis for ensuring that structures are designed to a minimum standard. This lecture provides a brief history and overview of building codes to illustrate how ASCE 7 is related to the overall permitting process.',
      prereqs:['none'],
      objectives:['The origin of the building code', 'How design standards are enforced', 'The risk of collapse for building structures due to earthquakes in a 50 year period'],
      video:'https://www.youtube.com/embed/b3ootXSAaqE'},

      { title: '04: Site Conditions',
      googleLink:'https://docs.google.com/document/d/e/2PACX-1vQknLoQHe8mNiQ2Ic2liolj8oWzw9cPTfYuWeoykIzPbKeK3kDTtA7NcV5Lqu2fNg2P-egUT6FuB5iL/pub?embedded=true',
      references:[],
      summary:'The magnitude of seismic waves depend on local soil conditions. ASCE 7 provides a method for adjusting base line seismic accelerations for unique soil conditions, discussed in this lecture. Determining site condition parameters is a basic skill that will be tested thoroughly on the exam.',
      prereqs:['Basics of seismic waves', 'Spectral acceleration'],
      objectives:['How to define seismic risk in terms of probabilities','Calculate site class', 'Calculate design response acceleration'],
      video:'https://www.youtube.com/embed/b3ootXSAaqE'},

      { title: '05: Risk Categories',
      googleLink:'https://docs.google.com/document/d/e/2PACX-1vR4AJFSLC9m3AsH5npn-m7VfPP4SfIYK7ANlrOD1NvbdGxsTn5MVYz7hZT27Ub_8f7prOsQjuDZR-yH/pub?embedded=true',
      references:[],
      summary:'The expected performance of building structures is set by the type of structure. Depending on the importance of a building, stricter seismic guidelines and even larger design forces are required. ASCE 7 provides a procedure for setting up these guidelines through design categories and importance factors, discussed in this lecture.',
      prereqs:['none'],
      objectives:['Use the CBC to assess risk categories','Calculate Seismic Design Categories', 'Calculate Seismic Importance Factors'],
      video:'https://www.youtube.com/embed/b3ootXSAaqE'},

    { title: '06: Building Systems',
      googleLink:'https://docs.google.com/document/d/e/2PACX-1vTmlyy0HQ2Gdrn0goPAYsfl3fjF5X6rebd-4pv-Osh2zXtofAF33d6UU_EZOevgjsZNSL2cAYxhTzqW/pub?embedded=true',
      references:[],
      summary:'Modern buildings utilize vertical and lateral resisting systems to resist both gravity loads and seismic/wind loads. Different systems have better performance than others, and ASCE 7 places limitations on lateral systems depending on relative seismic risk. This lecture covers how to verify which type of lateral system can be used depending on seismic risk, as well as methods for calculating essential building properties like fundamental period',
      prereqs:['none'],
      objectives:['How to analyze a SDOF structure for moment and shear', 'Calculate the fundament period of an SDOF mass', 'Calculate building period using ASCE 7', 'Visually identify different structural systems', 'Assess structural height limitations', 'Understand the difference between stories and levels'],
      video:'https://www.youtube.com/embed/b3ootXSAaqE'},

    { title: '07: Ductility',
      googleLink:'https://docs.google.com/document/d/e/2PACX-1vTMQwKfzI9OhuFV6VtJb1oi8HQIBMFhXpgkW77zbJEn2GMeSx1qyIANBMuJIgPO5berjQKxPOTU_hlb/pub?embedded=true',
      references:[],
      summary:'Seismic loads are',
      prereqs:['Understand different types of building lateral systems','Determine seismic design category'],
      objectives:['Know the relationship between R, Omega, and Cd','Understand the different phases of an inelastic force-deformation curve','Understand the requirements for using ductility values in building design'],
      video:'https://www.youtube.com/embed/b3ootXSAaqE'},

    { title: '08: Base Shear',
      googleLink:'https://docs.google.com/document/d/e/2PACX-1vT3e4VzrfjX2L6B4tf9plvqGlwuuTzmeb7ZJdp1ACI9PRnUZxozbMmLnnx_L0YfmlI-XQNwUosMj1yM/pub?embedded=true',
      references:[],
      summary:'The backbone of seismic calculations is based on one of the most familiar equations on all of physics. As earthquakes cause ground shaking and acceleration, the mass of a building structure is accelerated and creates forces that must be resistaed by the lateral system. ASCE 7 provides a procedural method of combining seismic accelerations and building mass into a static force.',
      prereqs:['Lateral System Ductility', 'Basic Earthquake theory'],
      objectives:['Determine effective seismic weight','Calculate seismic response coefficient Cs', 'Calculate Base Shear', 'Interpret a spectral response acceleration graph', 'Equivalent Lateral Force Procedure'],
      video:'https://www.youtube.com/embed/b3ootXSAaqE'},

    { title: '09: Force Distribution',
      googleLink:'https://docs.google.com/document/d/e/2PACX-1vS0bFc-R1Mkyvx0b-lrMjq_1SdjWeqlmikgVLEydVm6vmGXPlqcv6WGdgGmH1RE1RGPuIGM6sXouK4r/pub?embedded=true',
      references:[],
      summary:'Before a lateral system can be designed, the forces acting at each level of the structure must be determined. ASCE 7 provides a procedure for determining the forces at each level based on the relative weight tributary to that level and the total base shear.',
      prereqs:['Calculate Seismic Base Shear'],
      objectives:['Calculate tributary width', 'Calculate floor and wall weights', 'Calculate k factors', 'Calculate vertical distribution factor Cvx', 'Calculate vertical force distribution', 'Calculate horizontal force distribution'],
      video:'https://www.youtube.com/embed/b3ootXSAaqE'},

    { title: '10: Drift',
      googleLink:'https://docs.google.com/document/d/e/2PACX-1vQbTIUgbGCs3z-PDv66ATWlF8eLPSppd66zGGcyIN7Bw9RGZhTyIASz8Hvc6zTo-t_9i3yp10K95FyM/pub?embedded=true',
      references:[],
      summary:'Building structures must not only be designed to withstand the force from seismic events, but also the lateral deflection associated with the forces. This lateral deflection is often computed relative to adjacent floors, known as story drift. ASCE 7 imposes drift limits on building structures, and also provides a procedure for adjusting seismic forces so that the deflections can be properly estimated for inelastic structures.',
      prereqs:['Vertical Force Distribution', 'Seismic Design Coefficients', 'Ductility', 'Seismic Base Shear'],
      objectives:['Understand deflection vs drift', 'Understand drift vs drift ratio', 'Determine correct forces for drift calculations', 'Calculate drift and drift ratios', 'Calculate structural separation', 'Assess when P-Delta effects must be included in design'],
      video:'https://www.youtube.com/embed/b3ootXSAaqE'},

    { title: '11: Flexible Diaphragms',
      googleLink:'https://docs.google.com/document/d/e/2PACX-1vSKqYE7pGVnX0gr066UPZ3HEokUvqDx8MweHrVeKI6PIwVWrIH5hcK_rIDeUo10sAz39zJSy_py1DVL/pub?embedded=true',
      references:[],
      summary:'Diaphragms are an essential element of building structures designed to resist seismic forces. Identifying the difference between a floor and a diaphragm requires examining the force flow from wall to lateral system. In addition to understanding the purpose of a diaphragm, there are two types each with their own analysis procedure. ASCE 7 provides procedure for determining forces to diaphragms. ASCE 7 does not provide the necessary background to perform diaphragm analysis, so this lecture provides extensive examples and background on analysis procedures for flexible diaphragms. The following lecture covers rigid diaphragms.',
      prereqs:['Vertical Force Distribution'],
      objectives:['Visually identify detailing requirements for diaphragm action', 'Understand requirements for a floor or roof to be considered an effective diaphragm', 'Calculate diaphragm design forces', 'Understand how flexible diaphragms can be treated as simply supported beams for analysis', 'Calculate bending moment in flexible diaphragm', 'Calculate unit shear in flexible diaphragm', 'Calculate shear forces to lateral systems from flexible diaphragms', 'Calculate flexible diaphragm chord forces', 'Calculate collector / drag forces'],
      video:'https://www.youtube.com/embed/b3ootXSAaqE'},

    { title: '12: Rigid Diaphragms',
      googleLink:'https://docs.google.com/document/d/e/2PACX-1vRXMDtgh4vUDHDi0YmJNOHZK_S6x-XqTingo_6fTYuu-rvtGR4IcrbAy5rb0SvDE4gzDlGIEfbdFcx7/pub?embedded=true',
      references:[],
      summary:'Rigid diaphragms transfer forces to the building lateral system based on the relative rigidity of the lateral system itself. Because the diaphragm is analytically very rigid compared to the lateral system, the analysis procedure is different, and more tedious, than that of flexible diaphragms. ASCE 7 provides requirements for location of forces applied through rigid diaphragm, and also provides checks to help the designer verify if the building contains torsional irregularities. ASCE 7 does not provide guidance on how to analyze the forces in the diaphragm itself, so this is covered extensively in this lecture.',
      prereqs:['Diaphragm Design Forces'],
      objectives:['Calculate center of mass of rigid diaphragm', 'Calculate center of rigidty at rigid diaphragm', 'Calculate relative rigidity of shearwalls', 'Calculate inherent torsional moment', 'Correctly apply the accidental torsional moment', 'Calculate torsional amplification factor Ax','Calculate forces to lateral resisting system'],
      video:'https://www.youtube.com/embed/b3ootXSAaqE'},

    { title: '13: Irregularities',
      googleLink:'https://docs.google.com/document/d/e/2PACX-1vRXMDtgh4vUDHDi0YmJNOHZK_S6x-XqTingo_6fTYuu-rvtGR4IcrbAy5rb0SvDE4gzDlGIEfbdFcx7/pub?embedded=true',
      references:[],
      summary:'The equivalent lateral force procedure is based somewhat on historical context of regular buildings. The analysis procedure is best suited for certain common building systems/layouts. If a building under design does not match the intent of the code provisions, then the structure may need to be designed with an entirely differently analysis procedure, or the seismic forces increased via redundancy factors. ASCE 7 provides guidelines for how to evaluate if a building structure has an irregularity, and how to select appropriate redundancy factors and analytical procedures.',
      prereqs:['Rigid diaphragms', 'Seismic base shear','Ductility', 'Building Period', 'Building systems'],
      objectives:['Identify Horizontal Irregularities', 'Identify Vertical Irregularities', 'Determine permitted analytical procedures', 'Determine redundancy factor ρ','Calculate seismic load effect Em', 'Evaluate torsional amplification factors'],
      video:'https://www.youtube.com/embed/b3ootXSAaqE'},

    { title: '14: Non-structural Components',
      googleLink:'https://docs.google.com/document/d/e/2PACX-1vRXMDtgh4vUDHDi0YmJNOHZK_S6x-XqTingo_6fTYuu-rvtGR4IcrbAy5rb0SvDE4gzDlGIEfbdFcx7/pub?embedded=true',
      references:[],
      summary:'There is increasingly more data that shows the biggest repair cost due to earthquakes is from damage to non-structural components. While the building lateral system provides life safety to the building occupants during a seismic event, the contents inside like walls and equipment also pose a safety risk, and a significant financial liability. ASCE 7 provides an explicit method for calculating design forces on non-structural components and other various non-buiding structures.',
      prereqs:['Seismic Base Shear'],
      objectives:['Determine appropriate ap, Rp factors', 'Calculate non-structural component forces Fp', 'Analyze forces in suspended equipment', 'Analyze overturning forces on floor mounted equipment'],
      video:'https://www.youtube.com/embed/b3ootXSAaqE'},

    { title: '15: Seismic Detailing',
      googleLink:'https://docs.google.com/document/d/e/2PACX-1vRXMDtgh4vUDHDi0YmJNOHZK_S6x-XqTingo_6fTYuu-rvtGR4IcrbAy5rb0SvDE4gzDlGIEfbdFcx7/pub?embedded=true',
      references:[],
      summary:'A building structure cannot adequately resist seismic forces unless each element can transfer load to the next element. A critical aspect of seismic design is identifying load paths to allow forces to transfer in an efficient manner without failing connectors or elements theselves. This procedure of connecting elements together and providing adequate load path for lateral forces is known as seismic detailing',
      prereqs:['none'],
      objectives:['Visually identify proper detailing procedures for common lateral resisting systems'],
      video:'https://www.youtube.com/embed/b3ootXSAaqE'},
  ];

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