import React from "react";
import Select from 'react-select';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import  { useEffect, useState } from 'react'

const URL = "http://localhost:8080/food";

function AddFood() {

  const history = useHistory();

    const [categories, setCategories] = useState([]);

const [food_name,setFood_name]= useState(null);
const [unit_price,setUnit_price]= useState(null);
const [calorie,setCalorie]= useState(null);
 const [cat_id,setCat_id]= useState(null);
//const [selectedcategory,setSelectedcategory]= useState(null);

    const drop =[{value:0,label:""}];

    const saveData = (e) => {
      e.preventDefault();
      let food = {food_name: food_name, unit_price: unit_price, calorie: calorie , cat_id : cat_id};
     
// console.log(food);

if(food.food_name !== null && food.cat_id!==null){
       axios.post(URL+'/post', food); 
       history.push('/');
}

alert("Please Fill all the field")

    };

    useEffect(() => {

         axios.get('http://localhost:8080/category/getAll').then(res=>{
            // setCategories(res.data)
            // [{value: 1, label: snacks}]
            const responseData = res.data; // array
          const a=  responseData.map( food => { return { value: food.cat_id , label: food.cat_name };} )
           // const aaa = [{value: responseData.cat_id, label : responseData.cat_name}]

            setCategories(a);
         });

        // fetch('http://localhost:8080/category/getAll')
        //   .then(response => 
        //   {
        //     response.json();
        //     console.log(response);
        // }
          
        //   )
        //   .then(data => setCategories(data))
        //   .catch(error => console.error('Error fetching data:', error));


      }, []);

  return (
    <div>
      
      <h3 className="text-center">Add Food</h3> <br /> <br />


      <Container>
<Form>

        <Row>
          <Col>
          <div>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="2">  Food Name</Form.Label>
        <Col sm="10">
          <Form.Control type="text" placeholder="Input Food Name"  onChange={(e)=>setFood_name(e.target.value)} />
        </Col>
      </Form.Group>

        </div>
           </Col>


          <Col> 
          <div>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="2">
          Calorie
        </Form.Label>
        <Col sm="10">
          <Form.Control type="number" placeholder="Calorie" onChange={(e)=>setCalorie(e.target.value)} />
        </Col>
      </Form.Group>
        </div>
          </Col>
        </Row>

        <Row>
          <Col>
          <div>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="2">
          Price
        </Form.Label>
        <Col sm="10">
          <Form.Control type="number" placeholder="food  Price"  onChange={(e)=>setUnit_price(e.target.value)} />
        </Col>
      </Form.Group>

        </div>
           </Col>
          <Col> 
          <div>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="2">
          Categorie
        </Form.Label>
        <Col sm="10">
          {/* <Form.Control type="text" placeholder="Categorie" /> */}
          <Select options={categories}   placeholder='Select Categories' onChange={(e)=> setCat_id(e.value)}  />
        </Col>
      </Form.Group>
        </div>
          </Col>
        </Row>
        
<br /><br />

        <Row>
          <Col>
         
           </Col>
          <Col> 
          <div className="text-end">
          <Button variant="success me-3"   onClick={saveData}>Save</Button>{' '}
          <Button variant="danger">Clear</Button>{' '}
          </div>
          </Col>
        </Row>
        </Form>
       
      </Container>
    </div>
  );
}

export default AddFood;
