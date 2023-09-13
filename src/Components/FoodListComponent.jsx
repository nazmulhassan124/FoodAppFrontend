import React, { useState } from 'react'
import ListComponent from './ListComponent'

const FoodListComponent = () => {
  const [message, setMessage] = useState("");

  const handleMessage = (msg)=>{
    setMessage(msg);
  }

  const listData = [
    {food_name: "burger"},
    {food_name: "banana"}
  ]

  const orderId = 12;

  return (
    <>
    <div>
        <h2>FoodListComponent</h2>
        <h4>{message}</h4>
        <ListComponent foodData={listData} anotherData = {orderId} handleMessageChange={handleMessage} />

    </div>
    
    </>
  )
}

export default FoodListComponent