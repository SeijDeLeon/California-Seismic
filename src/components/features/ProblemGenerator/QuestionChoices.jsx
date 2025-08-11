const valuesEqual = (val1, val2) => {
  if (Array.isArray(val1) && Array.isArray(val2)) {
    if (val1.length !== val2.length) return false;
    for (let i = 0; i < val1.length; i++) {
      if (val1[i] !== val2[i]) return false;
    }
    return true;
  }
  return val1 === val2;
};

const QuestionChoices = ({ question, chosen, setChosen, colorRef, submitted }) => (
  <table className="w-full border">
    <tbody className="divide-y divide-solid">
      {question.choices.map((choice, ind) => {
        const isSelected = valuesEqual(choice, chosen);
        return (
          <tr
            key={ind}
            ref={isSelected ? colorRef : null}
            className={isSelected ? "bg-slate-200" : ""}
          >
            <td hidden>
              <input
                type="checkbox"
                name="choice"
                id={ind}
                value={choice}
                disabled={submitted}
                onChange={() => setChosen(isSelected ? null : choice)}
              />
            </td>
            <td>
              <label
                htmlFor={ind}
                className={`block px-4 py-2.5 ${submitted ? "" : "cursor-pointer"}`}
              >
                <span className="font-semibold mr-3">{String.fromCharCode(ind + 65)}.</span>
                {Array.isArray(choice) ? `[${choice.join(', ')}]` : choice} {question.label}
              </label>
            </td>
          </tr>
        )
      })}
    </tbody>
  </table>
)

export default QuestionChoices