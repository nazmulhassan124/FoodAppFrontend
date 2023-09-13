import React from 'react'
import { useLocation } from "react-router-dom";


function ViewOrder() {
    const location = useLocation();

    const { food_name, total_price, calorie, order_quantity,order_date } = location.state;
    

  return (
    <div className='text-center'>
        
        <h2>{food_name}</h2>
            <p>Total Price: {total_price}</p>
            <p>Calories: {calorie}</p>
            <p>Order Quantity: {order_quantity}</p>
            <p> Order Date : {order_date} </p>

        
    </div>


  )
}

export default ViewOrder