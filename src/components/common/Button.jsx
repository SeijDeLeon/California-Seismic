import { NavLink } from 'react-router-dom'
export default function Button({link='/practice', bgColor='bg-blue-600', bgColorHover='bg-blue-300', text='Practice', textColor='text-white', extraClasses=''}) {
  //button component that accepts props which specify Tailwind components
  //note that the colors do not require the full function of the associated Tailwind class.
  //to specify custom colors, see the Tailwind documentation, wrap the string in brackets []
  //to add more classes besides the default, specify all desired classes in the optional extraClasses prop as a string

  return (
    <NavLink className={`w-fit mt-4 justify-start ${textColor} text-lg font-bold ${bgColor} hover:bg-${bgColorHover} p-3 rounded-lg shadow-lg ${extraClasses}`} to={link}>
      <span className="sr-only">button</span>
      {text}
    </NavLink>
  )
}
