import UnderConstruction from './UnderConstruction.jsx';
import {
  AcademicCapIcon,
  PlayCircleIcon,
  CalculatorIcon,
  DocumentDuplicateIcon
} from '@heroicons/react/24/outline'

export default function Lectures({ display=false }) {

  const lectures = [
    {
      title: '01: Intro to Seismic Exam',
      text: 'An overview of the Seismic Exam and its requirements. No structural content here, just background info on the exam itself and what to expect the day of.',
      minutes: 30,
      pages: 10,
      problems: 0,
      difficulty: 0,
      img: '/images/lectures/01_Intro.png'
    },
    {
      title: '02: Geology & Earthquakes',
      text: 'General background information on tectonic activity and how eathquakes happen. A good starting point for understanding the hazards associated with seismic events and how it leads to building code requirements.',
      minutes: 60,
      pages: 10,
      problems: 0,
      difficulty: 0,
      img: '/images/lectures/01_Intro.png'
    },
    {
      title: '03: Code Provisions',
      text: 'Introduction to applicable building codes in the United States including the IBC, and how it is used as a basis for the CBC. Necessary information on how ASCE 7 works and its relation to the CBC.',
      minutes: 60,
      pages: 10,
      problems: 3,
      difficulty: 0,
      img: '/images/lectures/01_Intro.png'
    },
    {
      title: '04: Risk Categories',
      text: 'Explanation of seismic risk category for building structures per ASCE 7 and the implications on seismic performance. An essential concept tested on the exam, and a basic starting point of all seismic design.',
      minutes: 60,
      pages: 10,
      problems: 5,
      difficulty: 1,
      img: '/images/lectures/01_Intro.png'
    },
    {
      title: '05: Building Systems',
      text: 'Diagrams and explanations of building systems including vertical resistand and lateral resisting systems. Basic calculations for lateral deflection, building periods, and degrees of freedom. This covers fundamentals taught in school that are assumed basic knowledge for using ASCE 7.',
      minutes: 60,
      pages: 10,
      problems: 5,
      difficulty: 1,
      img: '/images/lectures/01_Intro.png'
    },
    {
      title: '06: Ductility',
      text: 'How the concept of ductility relates to defining the magnitude of seismic forces with the Response Modification Factor, Deflection Amplification Factor, and Overstrength Factor. How to select building lateral systems and determine their factors using ASCE 7. Limitations with different lateral systems based on seismic design categories.',
      minutes: 60,
      pages: 21,
      problems: 5,
      difficulty: 1,
      img: '/images/lectures/01_Intro.png'
    },
    {
      title: '07: Base Shear',
      text: 'Determine seismic base shear for a building structure using the equivalent lateral force procedure in ASCE 7 with the response spectrum. How to categorize dead loads attributed to seismic mass, and approximate the fundamental period of a structure.',
      minutes: 60,
      pages: 23,
      problems: 5,
      difficulty: 2,
      img: '/images/lectures/01_Intro.png'
    },
    {
      title: '08: Force Distribution',
      text: 'Calculation process for determining Horizontal and Vertical Force Distribution along the height of a building structure. How to determine the seismic mass at individual levels in a building using tributary area methods. A relatively straighforward calculation procedure that will require practice to perform at speed. ',
      minutes: 60,
      pages: 31,
      problems: 5,
      difficulty: 2,
      img: '/images/lectures/01_Intro.png'
    },
    {
      title: '09: Drift',
      text: 'Drift calculation procedure and drift limits. Visual explanations of story drift versus story displacement, and how to use the correct seismic forces for drift checks. Additional information on buiding separation requirements and P-Delta effects.',
      minutes: 60,
      pages: 40,
      problems: 5,
      difficulty: 1,
      img: '/images/lectures/01_Intro.png'
    },
    {
      title: '10A: Flexible Diaphragms',
      text: 'Comprehensive introduction to the function and definition of building diaphragms. Calculation procedures for analyzing all relevant forces in flexible diaphragms with extensive examples. Collectors, chord forces, unit shear calculations. The second hardest thing to learn for the exam.',
      minutes: 80,
      pages: 71,
      problems: 5,
      difficulty: 3,
      img: '/images/lectures/01_Intro.png'
    },
    {
      title: '10B: Rigid Diaphragms',
      text: 'Calculation procedure for rigid diaphragms. How the lateral resisting elements can change the force flow through a rigid diaphragm, and how to calculate relative rigidities of walls. Implementing accidental torsion per ASCE 7 requirements. The hardest thing to learn for the exam.',
      minutes: 80,
      pages: 60,
      problems: 5,
      difficulty: 3,
      img: '/images/lectures/01_Intro.png'
    },
    {
      title: '11: Irregularities',
      text: 'Classifying Vertical and Horizontal building irregularities per ASCE 7. Using irregularities to evaluate permitted analytical procedures. Determining seismic design force using redundancy or omega factors.',
      minutes: 80,
      pages: 32,
      problems: 5,
      difficulty: 1,
      img: '/images/lectures/01_Intro.png'
    },
    {
      title: '12: Non-structural Components',
      text: 'Calculating forces on non-structural components. Determing overturning forces and brace forces for common components use basic static analysis. When to use Omega for concrete anchorage forces. Impacts of non-structural damage and costs during seismic events.',
      minutes: 60,
      pages: 43,
      problems: 5,
      difficulty: 2,
      img: '/images/lectures/01_Intro.png'
    },
    {
      title: '13: Seismic Detailing',
      text: 'Holistic review of load path for lateral elements. How to identify basic requirements for good force transfer across shearwalls and into foundations. Critical connections for diaphragms to walls.',
      minutes: 40,
      pages: 20,
      problems: 5,
      difficulty: 1,
      img: '/images/lectures/01_Intro.png'
    },
  ]

  if (display === false) {
    return (
      <UnderConstruction displayUnderConstruction={true}></UnderConstruction>
    );
  } else {
    return (
      <main>
        <h2 className='text-xl font-bold my-4 md:my-8'> Lectures</h2>
        <p className='text-left text-sm md:text-base max-w-3xl m-auto mx-6'> Start learning here. We recommend reading a single lecture, then watching the corresponding video. After finishing the lecture & video, try out the practice problems before moving on to the next lecture!</p>
        <section className='my-8'>
          {lectures.map( (lecture, index) =>
            (
              <article key={`LectureDescription${index}`}className='flex flex-col md:flex-row  h-auto m-auto max-w-7xl px-16 my-4 hover:cursor-pointer hover:shadow-lg'>
                <div className='md:w-1/3'>
                  <img className='h-auto' alt='Lecture Graphic' src={lecture.img}/>
                </div>
                <section className='md:w-2/3 px-2'>
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
            )
          )}
        </section>
        <p className='my-4'>Done with all the lectures? Try out some practice problems or read our FAQ!</p>
      </main>
    )
  }

}