import { useState } from 'react';
export default function Demo() {
  const [ foodList, setFoodList ] = useState(['pizza', 'starve']);
  const [ foodInput, setFoodInput ] = useState('');
  const handleInputChange= (e) => {
    setFoodInput(e.target.value);
  }

  const handleSubmitClick = () => {
    //add foodInput to food list
    setFoodList((oldFoodList) => {
      //whatever we return is set as the new state variable
      var newList = [...oldFoodList];
      newList.push(foodInput);
      return newList;
    })
  }
  return (
    <main>
      <h1>Demo</h1>
      <label>
        add Food: <input type="text" value={foodInput} onChange={handleInputChange}/>
      </label>
      {foodList.map((food) => {
        return (
          <li key={food} >{food}</li>
        )
      })}
      <button onClick={handleSubmitClick}>Submit</button>
    </main>
  )
}