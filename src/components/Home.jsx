import hero from '../assets/hero.jpg'
import '../App.css'
import { NavLink } from 'react-router-dom'
export default function Home() {

  return (
    <main>
      <div className="hero">
        <div className="absolute z-10 md:left-[10%] top-[40%]">
          <h1 className="md:flex justify-start text-5xl md:text-7xl text-white font-bold mb-4">Study for Free</h1>
          <p className="md:flex justify-start text-2xl text-white font-medium">You can pass the Seismic Exam. </p>
            <p className="md:flex justify-start text-2xl text-white font-medium pb-8">Everything needed is right here</p>
          <NavLink className="md:flex w-fit justify-start text-white text-lg font-bold bg-blue-600 p-3 rounded-lg shadow-lg" to='/practice'>
            <span className="sr-only">button</span>
            Start Practicing
          </NavLink>
        </div>
      </div>
    </main>
  );

}
