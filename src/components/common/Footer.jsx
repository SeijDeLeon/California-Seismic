import logo from '../../assets/images/logo.png'
import { NavLink } from 'react-router-dom'

export default function Footer() {
  //description

  const links = [
    {text: 'Lectures', route: '/lectures'},
    {text: 'Practice', route: '/practice'},
    {text: 'Exam Guide', route: '/exam-guide'},
    {text: 'Contributors', route: '/contributors'}
  ]
  return (
    <footer className="px-14 pt-5 bg-slate-700">
      <div className="max-w-screen-2xl  mx-auto md:flex items-center justify-between">
        <nav className="flex-1 md:text-left">
          <a className="hover:fill-blue-500" href="http://linkedin.com/company/californiaseismic">
            <svg role="img" className="mx-auto md:ml-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <title>LinkedIn</title>
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
          {links.map((item, index) =>
           <NavLink key={index} className="text-sm font-light leading-6 text-white hover:text-sky-600 block" to={item.route}>
           {item.text}
         </NavLink>
          )}
        </nav>
        <div className = "flex-1">
          <NavLink className="" to='/'>
            <img className="h-20 w-auto m-auto" src={logo} alt="logo" />
          </NavLink>
        </div>
        <div className="flex-1"></div>
      </div>
      <p className="text-sm">Copyright 2023 © California Seismic</p>
    </footer>
  )
}