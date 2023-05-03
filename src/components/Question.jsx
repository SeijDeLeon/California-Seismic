export default function Question( { question, borderStyle } ) {
  //returns a single Question

  return (
    <tr className={borderStyle}>
      <th className={borderStyle}><div></div></th>
      <th className={`${borderStyle} text-left pl-4`}>{question.description}</th>
      <th className={borderStyle}>{question.difficulty}</th>
      <th className={borderStyle}>{question.lectures}</th>
    </tr>

  )
}
