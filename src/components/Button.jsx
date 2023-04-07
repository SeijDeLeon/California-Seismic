import { NavLink } from 'react-router-dom'
export default function Button({link='/practice', bgColor='blue-600', bgColorHover='blue-300', text='Practice', textColor='white'}) {
  //button component that accepts props which specify Tailwind components
  //note that the colors do not require the full function of the associated Tailwind class.
  //to specify custom colors, see the Tailwind documentation, wrap the string in brackets []

  return (
    <NavLink className={`md:flex w-fit justify-start text-${textColor} text-lg font-bold bg-${bgColor} hover:bg-${bgColor} p-3 rounded-lg shadow-lg`} to={link}>
      <span className="sr-only">button</span>
      {text}
    </NavLink>
  )
}