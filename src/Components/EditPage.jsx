import React from "react";
import Select from "react-select";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const URL = "http://localhost:8080/food";

function EditPage() {
  const location = useLocation();
  // cosnt food = location.state;
  const { food_name, unit_price, calorie, cat_id } = location.state;
  const [selectedFood, setSelectedFood] = useState(location.state);

  const [selectedCategory,setSelectedCategory] = useState(null);

  console.log(location);
  console.log(location.state);
  const [categories, setCategories] = useState([]);

  //Load Categories
  useEffect(() => {
    axios.get("http://localhost:8080/category/getAll").then((res) => {
      const responseData = res.data; // array
      const a = responseData.map((food) => {
        return { value: food.cat_id, label: food.cat_name };
      });

      setCategories(a);

    });
  }, []);
  

  //load selected categories
useEffect(()=>{

    const responseData  = selectedFood;
    const a= (responseData)=>{ 
        return {value: responseData.Cat_id, label : responseData.cat_name}
    }
    setCategories(a);

},[])


  const updateData = (e) => {
    // e.preventDefault();
    // let food = {food_name: food_name, unit_price: unit_price, calorie: calorie , cat_id : cat_id};

    console.log(selectedFood);

    //  axios.post(URL+'/update', food);
  };

  return (
    <div>
      <h3 className="text-center">Update Food</h3> <br /> <br />
      <Form>
        <Row>
          <Col>
            <div>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="2">
                  {" "}
                  Food Name
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="Input Food Name"
                    value={selectedFood.food_name}
                    onChange={(e) => {
                      setSelectedFood({
                        ...selectedFood,
                        food_name: e.target.value,
                      });
                    }}
                  />
                </Col>
              </Form.Group>
            </div>
          </Col>

          <Col>
            <div>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="2">
                  Calorie
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="number"
                    placeholder="Calorie"
                    value={selectedFood.calorie}
                    onChange={(e) => {
                      setSelectedFood({
                        ...selectedFood,
                        calorie: e.target.value,
                      });
                    }}
                  />
                </Col>
              </Form.Group>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="2">
                  Price
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="number"
                    placeholder="food  Price"
                    value={selectedFood.unit_price}
                    onChange={(e) => {
                      setSelectedFood({
                        ...selectedFood,
                        unit_price: e.target.value,
                      });
                    }}
                  />
                </Col>
              </Form.Group>
            </div>
          </Col>
          <Col>
            <div>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="2">
                  Categorie
                </Form.Label>
                <Col sm="10">
                  {/* <Form.Control type="text" placeholder="Categorie" /> */}
                  <Select
                    options={categories}
                    placeholder="Select Categories"
                   // value={selectedCategory}
                    // onChange={(e)=> setCat_id(e.value)} 

                    onChange={(e) => {
                        setSelectedFood({
                          ...selectedFood,
                          Cat_id: e.value,
                        });
                      }}

                  />
                </Col>
              </Form.Group>
            </div>
          </Col>
        </Row>

        <br />
        <br />

        <Row>
          <Col></Col>
          <Col>
            <div className="text-end">
              <Button variant="success me-3" onClick={updateData}>
                Update
              </Button>{" "}
              <Button variant="danger">Clear</Button>{" "}
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default EditPage;
