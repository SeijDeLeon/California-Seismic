import hero from '../assets/hero.jpg'
import headshot from '../assets/seij_headshot.jpg'
import '../App.css'
import { NavLink } from 'react-router-dom'
export default function Home() {
  const resourceCards = [
    {link: '/lectures', title: '10+ Lectures', text:'Start your studies here', img:'https://img.icons8.com/ios/100/null/podium-with-speaker.png', alt:"speaker at podium"},
    {link: '/practice', title: '100+ Questions', text:'Test your seismic knowledge with practice questions', img:'https://img.icons8.com/ios/100/null/test--v1.png', alt:'paper test'},
    {link: '/exam-guide', title: 'Exam Resources', text:'Be ready to take the Seismic Principles exam', img:'https://img.icons8.com/ios/100/null/faq.png', alt:'question answer bubbles'}
  ]

  const infoCards = [
    {title: 'Classroom Quality',
    text:'Our lecture series is unique because it starts at the very beginning. We provide thorough explanations and full examples for all critical concepts, no previous knowledge required.',
    img:'/images/infoCard-classroom.jpg',
    alt:"empty classroom"},
    { title: 'Community Driven',
    text:'Our content is managed by a team of engineers that continually add material. We reflect the collaborative nature of Civil Engineering in our methods of providing content.',
    img:'/images/infoCard-members.JPG',
    alt:'members of california seismic'},
    {title: 'Califiornia Expertise',
    text:'Our contributors are working professionals in California with advanced degrees in structural engineering from UC Berkeley, Stanford, UC Davis, and more.',
    img:'/images/infoCard-sf.jpg',
    alt:'san francisco city with bridge background'}
  ]

  return (
    <main>
      <div className="hero">
        <div className="absolute z-10 md:left-[10%] top-1/3">
          <h1 className="md:flex justify-start text-5xl md:text-7xl text-white font-bold mb-4">Study for Free</h1>
          <p className="md:flex justify-start text-2xl text-white font-medium">You can pass the Seismic Exam. </p>
            <p className="md:flex justify-start text-2xl text-white font-medium pb-8">Everything needed is right here</p>
          <NavLink className="md:flex w-fit justify-start text-white text-lg font-bold bg-blue-600 hover:bg-blue-300 p-3 rounded-lg shadow-lg" to='/practice'>
            <span className="sr-only">button</span>
            Start Practicing
          </NavLink>
        </div>
      </div>
      <article className="bg-slate-50 h-fit py-8 md:h-auto md:py-32">
        <div className="max-w-6xl m-auto">
          <h1 className="font-bold text-5xl mb-4 md:mb-32">Explore</h1>
          <div className="flex flex-col md:flex-row">
            {resourceCards.map((item, index) => (
              <NavLink  key={`landingCard${index}`} className="w-72 m-auto my-4 ease-out duration-300 rounded-lg hover:shadow-lg hover:bg-white" to={item.link}>
                <figure className="">
                  <img className="h-24 md:h-40 flex m-auto pt-2" alt={item.alt} src={item.img}/>
                  <h2 className="font-bold text-2xl">{item.title}</h2>
                  <p>{item.text}</p>
                </figure>
              </NavLink>
            ))}
          </div>
        </div>
      </article>
      <article className="w-screen bg-deep-blue flex justify-center py-12 md:py-60">
        <div className="flex flex-col md:flex-row">
          <img className="m-auto h-40 md:h-60 rounded-full border border-orange-300 border-8" src={headshot} alt="seij headshot" />
          <section className="m-auto w-auto md:pl-32 pt-4">
            <h1 className="text-white text-3xl md:text-6xl font-semibold">Education Matters</h1>
            <p className="max-w-lg m-auto text-white text-left p-8 md:p-0">California Seismic exists because of a passion for education. Engineering knowledge should be free and easy to access, yet there are few complete resources for Civil Engineering outside of higher education. We&apos;re here to change that by providing a comprehensive resource for one of the most technically challenging aspects, Seismic Design. </p>
          </section>
        </div>
      </article>
      <article className="bg-slate-50 h-fit py-8 md:h-auto md:py-32">
        <div className="max-w-6xl m-auto mb-8 md:mb-16">
          <h1 className="font-bold text-3xl md:text-5xl mb-4 md:mb-12">Why California Seismic?</h1>
          <div className="flex flex-col md:flex-row">
            {infoCards.map((item, index) => (
              <figure key={`infoCard${index}`} className="w-72 m-auto my-4">
                <img className="h-40 rounded-full md:h-60 flex m-auto pt-2" alt={item.alt} src={item.img}/>
                <h2 className="font-bold text-2xl">{item.title}</h2>
                <p className="text-sm">{item.text}</p>
              </figure>
            ))}
          </div>
        </div>
        <NavLink className="w-fit mt-4 text-white text-lg font-bold bg-blue-600 p-3 hover:bg-blue-300 rounded-lg shadow-xl" to='/lectures'>
            <span className="sr-only">button</span>
            Show Lectures
        </NavLink>
      </article>
    </main>
  );

}
