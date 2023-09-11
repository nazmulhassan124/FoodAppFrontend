import React from 'react'
import  { useEffect, useState } from 'react'

function CategoriesService() {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/category/getAll')
          .then(response => response.json())
          .then(data => setCategories(data))
          .catch(error => console.error('Error fetching data:', error));
      }, []);





  return (
    <div>CategoriesService</div>
  )
}



export default CategoriesService