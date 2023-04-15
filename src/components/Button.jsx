import { NavLink } from 'react-router-dom'
export default function Button({link='/practice', bgColor='blue-600', bgColorHover='blue-300', text='Practice', textColor='white', extraClasses=''}) {
  //button component that accepts props which specify Tailwind components
  //note that the colors do not require the full function of the associated Tailwind class.
  //to specify custom colors, see the Tailwind documentation, wrap the string in brackets []
  //to add more classes besides the default, specify all desired classes in the optional extraClasses prop as a string

  return (
    <NavLink className={`w-fit mt-4 justify-start text-${textColor} text-lg font-bold bg-${bgColor} hover:bg-${bgColorHover} p-3 rounded-lg shadow-lg ${extraClasses}`} to={link}>
      <span className="sr-only">button</span>
      {text}
    </NavLink>
  )
}
