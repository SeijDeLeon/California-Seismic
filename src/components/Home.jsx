import hero from '../assets/hero.jpg'
import '../App.css'
import { NavLink } from 'react-router-dom'
export default function Home() {

  return (
    <main>
      <div className="hero">
        <div className="absolute z-10 md:left-[10%] top-1/3">
          <h1 className="md:flex justify-start text-5xl md:text-7xl text-white font-bold mb-4">Study for Free</h1>
          <p className="md:flex justify-start text-2xl text-white font-medium">You can pass the Seismic Exam. </p>
            <p className="md:flex justify-start text-2xl text-white font-medium pb-8">Everything needed is right here</p>
          <NavLink className="md:flex w-fit justify-start text-white text-lg font-bold bg-blue-600 p-3 rounded-lg shadow-lg" to='/practice'>
            <span className="sr-only">button</span>
            Start Practicing
          </NavLink>
        </div>
      </div>
      <article>
        <div className="max-w-6xl m-auto">
          <h1 className="font-bold text-5xl">Explore</h1>
          <div className="flex flex-col md:flex-row justify-around">
            <figure className="w-72 m-auto">
              <img className="h-40 flex m-auto" alt="speaker at podium" src="https://img.icons8.com/ios/100/null/podium-with-speaker.png"/>
              <h2 className="font-bold text-2xl">10+ Lectures</h2>
              <p>Start your studies here</p>
            </figure>
            <figure className="w-72 m-auto">
              <img className="h-40 flex m-auto" alt="paper test" src="https://img.icons8.com/ios/100/null/test--v1.png"/>
              <h2 className="font-bold text-2xl">100+ Questions</h2>
              <p>Test your seismic knowledge with practic questions</p>
            </figure>
            <figure className="w-72 m-auto">
              <img className="h-40 flex m-auto" alt="faq speech bubbles" src="https://img.icons8.com/ios/100/null/faq.png"/>
              <h2 className="font-bold text-2xl">Exam Resources</h2>
              <p>Be ready to take the Seismic Principles exam</p>
            </figure>
          </div>
        </div>
      </article>
    </main>
  );

}
