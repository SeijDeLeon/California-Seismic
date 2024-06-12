import defaultImage from '../../assets/images/underConstruction.png'
import '../../App.css';
import { useEffect } from 'react';

export default function UnderConstruction( {displayUnderConstruction}) {

var updateGoogleDocStyle = () => {
  var count = 0;
  var searchClass = (className = 'doc-content') => {
/*     count++;
    console.log(document.getElementsByClassName('iframe'));
    if (document.getElementsByClassName(className).length === 0 && count < 10) {
      setTimeout(searchClass, 10000);
    } else {
      if (count >= 10) {
        console.log('could not find a match within recursive limit');
        return;
      } else {
        console.log('found a match');
        var docContent = document.getElementsByClassName('doc-content')[0];
        docContent.classList.add('m-auto');
      }
    } */
  };
  searchClass();
  //console.log(document.getElementsByClassName('App'));
};

  if (displayUnderConstruction === false) {
    return (<></>)
  } else {
    return (
      <>
      <p className="text-lg font-bold">Webpage Temporarily Under Construction!</p>
      <p className="p-4">If you would like to look at our current progress, check out <a href="https://docs.google.com/document/d/1aRLzEveYaZKGCn7DV82JvnDxy762QYwFrXvsRqLlSZg/edit?usp=sharing" className="underline decoration-yellow-500 text-sky-500"> this link to our blog!</a></p>
      <img className = "m-auto max-w-xs md:max-w-lg pb-3" src={defaultImage} alt="Construction worker on top of calculator with construction background"></img>

      <p className="hidden md:block pt-3"> Our progress document is shown below:</p>
      <iframe className="hidden md:block min-h-screen h-fit w-full iframe-padding-left" title="California Seismic Progress Journal" src="https://docs.google.com/document/d/e/2PACX-1vRXMDtgh4vUDHDi0YmJNOHZK_S6x-XqTingo_6fTYuu-rvtGR4IcrbAy5rb0SvDE4gzDlGIEfbdFcx7/pub?embedded=true"></iframe>
      </>
    )
  }
}
