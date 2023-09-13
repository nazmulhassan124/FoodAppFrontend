import React from 'react'
import axios from 'axios';

function FoodService() {

const deletefood =(id)=>{

     axios.delete(URL+'/delete/'+ id);
  
}


  return (
    <div>FoodService</div>
  )
}

export default FoodService