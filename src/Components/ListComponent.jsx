import React from 'react'

const ListComponent = (props) => {
    const foodData = props.foodData;
    const id = props.anotherData;

  return (
    <>
        <div>
            <h3>{id}</h3>
            <ul>
                {foodData.map((food)=>(
                    <li>{food.food_name}</li>

                ))}
            </ul>

            <button onClick={()=> props.handleMessageChange("Hello")}>Say Something</button>
        </div>
    
    </>
  )
}

export default ListComponent