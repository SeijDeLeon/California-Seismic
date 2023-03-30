import hero from '../assets/hero.jpg'
import '../App.css'
import { NavLink } from 'react-router-dom'
export default function Home() {
  const cards = [
    {link: '/lectures', title: '10+ Lectures', text:'Start your studies here', img:'https://img.icons8.com/ios/100/null/podium-with-speaker.png', alt:"speaker at podium"},
    {link: '/practice', title: '100+ Questions', text:'Test your seismic knowledge with practice questions', img:'https://img.icons8.com/ios/100/null/test--v1.png', alt:'paper test'},
    {link: '/exam-guide', title: 'Exam Resources', text:'Be ready to take the Seismic Principles exam', img:'https://img.icons8.com/ios/100/null/faq.png', alt:'question answer bubbles'}
  ]

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
      <article className="bg-slate-50 md:py-12">
        <div className="max-w-6xl m-auto">
          <h1 className="font-bold text-5xl mb-8 md:mb-12">Explore</h1>
          <div className="flex flex-col md:flex-row">
            {cards.map((item, index) => (
              <NavLink className="w-72 m-auto my-4 ease-out duration-300 rounded-lg hover:shadow-lg hover:bg-white" to={item.link}>
                <figure key={index} className="">
                  <img className="h-28 md:h-40 flex m-auto pt-2" alt={item.alt} src={item.img}/>
                  <h2 className="font-bold text-2xl">{item.title}</h2>
                  <p>{item.text}</p>
                </figure>
              </NavLink>
            ))}
          </div>
        </div>
      </article>
    </main>
  );

}
