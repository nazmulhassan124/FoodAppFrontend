import React, {useState, useEffect } from 'react'
import "datatables.net-dt/css/jquery.dataTables.min.css";
import DataTable from 'datatables.net-dt';
import $ from 'jquery';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import FoodService from '../Service/FoodService';
import axios from 'axios';


import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';

import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const URL = "http://localhost:8080/food";
function FoodList() {


  const [food, setFood] = useState([]);
  const [id, setId] = useState([]);
  const [search, setSearch] = useState();

  useEffect(() => {
      fetch('http://localhost:8080/food/getAll')
        .then(response => response.json())
        .then(data => setFood(data))
        .catch(error => console.error('Error fetching data:', error));
    }, []);

    useEffect(()=>{
      // new DataTable('#example');
      
      $('#example').DataTable();
    },[]);

// useEffect(( id )=>{

// }),[];
const history = useHistory();

const routeChange = (path)=>{

}

const handleEdit = (rowData)=>{
  console.log(rowData);
  // history.push('addfood?foodId='+rowData.food_id)


  history.push({
    pathname : 'edit',
    state: rowData,

  })

  // history.push(`/edit/${rowData.food_id}`);

}

const deletefood =(id)=>{

  console.log(id)
  axios.delete(URL+'/delete/'+ id).then( (res)=>{
    const responseData = res.data; // array
    console.log(responseData);
  });
  
}

// const searchbar =()=>{

//   axios.get(URL + '/search',{ params: { food_name: search } }).then((res)=>{
//      setFood(res.data)

//   })
// }

useEffect (()=>{
if( search !=null ){

  axios.get(URL + '/search',{ params: { food_name: search } }).then((res)=>{
    setFood(res.data)

 })}
  
},[search]);


  return (
    <div>
   
    <h3 className="text-center">FoodList</h3>  <br />

    {/* Searchbar */}

    <Navbar className="bg-body-tertiary justify-content-between">
    
    <div className="text-center" style={{textAlign :'end'}}>
    <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e)=>setSearch(e.target.value)}
            />
            <Button variant="outline-success" >Search</Button>
          </Form>
      </div>
    </Navbar>

{/* Data Table */}
<table id="example" className="display" >
        <thead>
            <tr>
            <th>ID</th>
                <th>Food Name</th>
                <th>Price</th>
                <th>Calories</th>
                <th>Category ID</th>
                <th>Action</th>
                
            </tr>
        </thead>
        <tbody>

       { food && food.map( row =>
       
            <tr key ={row.food_id}>
                <td>{row.food_id}</td>
                <td>{row.food_name}</td>
                <td>{row.unit_price}</td>
                <td>{row.calorie}</td>
                <td>{row.cat_id}</td>
                
                 <td>

                 <Button variant="success me-3" onClick={()=> handleEdit(row)} >Edit</Button>{' '}
          <Button variant="danger"  onClick={()=>{deletefood (row.food_id)}} >Delete</Button>{' '}
          
                 </td>
            </tr>
          
        )}
           
        </tbody>
        {/* <tfoot>
            <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Office</th>
                <th>Age</th>
               
            </tr>
        </tfoot> */}
    </table>
</div>
  )
}

export default FoodList