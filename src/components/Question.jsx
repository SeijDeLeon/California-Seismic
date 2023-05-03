import { useState } from 'react';

export default function Question( { question, borderStyle } ) {
  //returns a single Question

  const [checked, setChecked] = useState(false);
  const buttonClass = 'flex justify-center w-4 h-4 border-solid border border-slate-200';

  const handleClick = () => {
    checked ? setChecked(false) : setChecked(true);
  }

  const Button = () => {

    return (
      <div className='flex justify-center'>
        <input type='checkbox' checked={checked} onClick={handleClick} className={checked ? `bg-sky-500 ${buttonClass}` : `bg-sky-50 ${buttonClass}`}></input>
      </div>
    )
  }

  return (
    <tr className={borderStyle}>
      <th className={borderStyle}><Button /></th>
      <th className={`${borderStyle} text-left pl-4`}>{question.description}</th>
      <th className={borderStyle}>{question.difficulty}</th>
      <th className={borderStyle}>{question.lectures}</th>
    </tr>

  )
}
