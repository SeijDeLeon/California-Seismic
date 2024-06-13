import { NavLink } from "react-router-dom";
import Button from '../components/common/Button.jsx';
import {
  AcademicCapIcon,
  PlayCircleIcon,
  CalculatorIcon,
  DocumentDuplicateIcon
} from '@heroicons/react/24/outline';

import { lectureData as lectures } from '../assets/data/lectureData.js';

export default function Lectures() {


    return (
      <main>
        <h2 className='text-xl font-bold my-4 md:my-8'> Lectures</h2>
        <p className='text-left text-sm md:text-base max-w-3xl mx-6 md:m-auto'> Start learning here. We recommend reading a single lecture, then watching the corresponding video. After finishing the lecture & video, try out the practice problems before moving on to the next lecture!</p>


        <section className='my-8'>
          {lectures.map( (lecture, index) =>
            (
              <NavLink to={`${lecture.href}`}>
                <article key={`LectureDescription${index}`}className='flex flex-col md:flex-row  h-auto m-auto lg:max-w-7xl px-16 md:max-w-4xl py-3 hover:cursor-pointer hover:shadow-lg hover:border-2 border-2 hover:border-slate-100 border-transparent rounded-xl hover:ease-in ease-in duration-100'>
                  <div className='md:w-1/3'>
                    <img className='h-auto border-solid border-2 rounded-xl border-slate-300' alt='Lecture Graphic' src={lecture.img}/>
                  </div>
                  <section className='md:w-2/3 pl-12 pr-2'>
                    <h2 className='md:text-lg font-medium text-left'>{lecture.title}</h2>
                    <p className=' hidden md:block text-xs md:text-base text-left'>{lecture.text}</p>
                  </section>
                  <section className='hidden md:w-1/4 md:flex flex-col'>
                    <div className='flex flex-row justify-center mt-4'>
                      <div className='flex flex-col mx-1'>
                        <PlayCircleIcon className='h-4'/>
                        <p className='text-xs'>{lecture.minutes}</p>
                      </div>
                      <div className='flex flex-col mx-1'>
                        <DocumentDuplicateIcon className='h-4'/>
                        <p className='text-xs'>{lecture.pages}</p>
                      </div>
                      <div className='flex flex-col mx-1'>
                        <CalculatorIcon className='h-4'/>
                        <p className='text-xs'>{lecture.problems}</p>
                      </div>
                    </div>
                    <div className='hidden md:flex flex-row justify-center mt-4'>
                      {Array(lecture.difficulty).fill(0).map( (unused, i) => <AcademicCapIcon key={`${index}${i}`}className='h-4 mx-1'/>)}
                    </div>
                  </section>
                </article>
              </NavLink>
            )
          )}

        </section>
        <section>

          <div className="max-w-6xl px-5 p-6 mx-auto text-center">
            <h2 className="text-xl font-bold text-center">Done with all the lectures?</h2>
                  <div className="flex justify-center">
                    <Button text='Start Practicing' extraClasses="w-48 md:w-48 hover:bg-blue-800"/>
                  </div>
          </div>
        </section>
      </main>
    )
  }
