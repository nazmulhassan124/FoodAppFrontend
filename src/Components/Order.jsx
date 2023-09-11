import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { useHistory } from 'react-router-dom';

import { useState, useEffect } from "react";
import { data } from "jquery";

const URL = "http://localhost:8080/order";

function Order() {
  const [food, setFood] = useState([]);
  const [query, setquery] = useState("");
  const [state, setState] = useState({
    query: "",
    list: [],
  });

  const [order_quantity, setOrder_quantity] = useState(1);
  const [singlefood, setSinglefood] = useState({});
  const [totalprice, setTotalprice] = useState(0);
  const [orderlistarray, setOrderlistarray] = useState([]);

  const history = useHistory();

  useEffect(() => {
    fetch("http://localhost:8080/food/getAll")
      .then((response) => response.json())
      .then((data) => setFood(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleChange = (e) => {
    const results = food.filter((post) => {
      if (e.target.value === "") return food;
      return post.food_name
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });

    setState({
      query: e.target.value,
      list: results,
    });
  };

  const addfood = (e, post) => {
    setSinglefood(post);

    // for button up
    handleChange(e);
    setOrder_quantity(1);
  };

  useEffect(() => {
    let total = singlefood.unit_price * order_quantity;
    setTotalprice(total);
  }, [order_quantity, singlefood]);

  const orderlist = (e) => {
    e.preventDefault();

    let singleorder = {
      food_id: singlefood.food_id,
      food_name: singlefood.food_name,
      order_quantity: order_quantity,
      calorie: singlefood.calorie,
      total_price: totalprice,
      order_date: new Date(),
    };

    setOrderlistarray((prevState) => [...prevState, singleorder]);

   
  };

  //console.log('order list: ', orderlistarray)

  const removeorder = (indexToRemove) => {
    const updatedItems = [...orderlistarray];
    updatedItems.splice(indexToRemove, 1);
    setOrderlistarray(updatedItems);
  };

  const saveData = (e) => {
    axios.post(URL + "/postAll", orderlistarray);

    history.push('/orderlist');
  };

  return (
    <>
      <Card className="text-center">
        <Card.Header>
          {" "}
          <h3>Order Your Food</h3>{" "}
        </Card.Header>
        <Card.Body>
          <Card.Title></Card.Title>
          {/* <Card.Text> </Card.Text> */}

          <Row>
            <Col>
              <Form inline style={{ marginLeft: "0px" }}>
                <Row>
                  <Col xs="auto">
                    <Button type="submit" style={{ width: "150px" }}>
                      Food Name
                    </Button>
                  </Col>

                  <Col xs="auto">
                    <Form.Control
                      type="text"
                      placeholder="Search for names.."
                      className=" mr-sm-2"
                      style={{ width: "300px" }}
                      value={state.query}
                      onChange={(e) => handleChange(e)}
                    />
                  </Col>
                </Row>
              </Form>

              <Row style={{ marginLeft: "0px" }}>
                <Col xs="auto"></Col>

                <Col xs="auto">
                  {state.query === ""
                    ? ""
                    : state.list.map((post) => {
                        return (
                          <div key={post.food_id}>
                            <Button
                              variant="outline-success"
                              type="button"
                              className="mt-2"
                              style={{ width: "300px", marginLeft: "135px" }}
                              onClick={(e) => addfood(e, post)}
                            >
                              {" "}
                              {post.food_name}{" "}
                            </Button>
                          </div>
                        );
                      })}
                </Col>
              </Row>

              <br />
              <Form inline style={{ marginLeft: "0px" }}>
                <Row>
                  <Col xs="auto">
                    <Button type="submit" style={{ width: "150px" }}>
                      Quantity
                    </Button>
                  </Col>

                  <Col xs="auto">
                    <Form.Control
                      type="number"
                      className=" mr-sm-2"
                      style={{ width: "300px" }}
                      onChange={(e) => setOrder_quantity(e.target.value)}
                      value={order_quantity}
                    />
                  </Col>
                </Row>
              </Form>
              <br />
              <Form inline style={{ marginLeft: "0px" }}>
                <Row>
                  <Col xs="auto">
                    <Button type="submit" style={{ width: "150px" }}>
                      Total
                    </Button>
                  </Col>

                  <Col xs="auto">
                    <Form.Control
                      type="number"
                      placeholder="Total"
                      className=" mr-sm-2"
                      style={{ width: "300px" }}
                      value={totalprice}
                      readOnly
                    />
                  </Col>
                </Row>
              </Form>

              <br />

              <Button variant="primary" onClick={orderlist}>
                Add
              </Button>
            </Col>
            <Col>
              <Card style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  style={{ width: "70%" }}
                  src="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?cs=srgb&dl=pexels-ash-376464.jpg&fm=jpg"
                />
                <Card.Body>
                  <Card.Title>
                    {" "}
                    <h2>{singlefood.food_name}</h2>
                  </Card.Title>
                  <h4> Price : {singlefood.unit_price}</h4>
                    <h6> Calorie : {singlefood.calorie}</h6>
                  <Card.Text>
                    
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
        {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
      </Card>

      {/* Order list start  */}

      <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th>#</th>
            <th>Food Name</th>
            <th>Quantity </th>
            <th>Total Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orderlistarray.map((row, Index) => (
            <tr key={Index}>
              <td>{Index + 1}</td>
              <td>{row.food_name}</td>
              <td>{row.order_quantity}</td>
              <td>{row.total_price}</td>
              <td>
                <Button variant="secondary" onClick={() => removeorder(Index)}>
                  Remove
                </Button>{" "}
              </td>
            </tr>
          ))}
          <tr>
            <td> </td>
            <td> </td>
            <td>Total :</td>
            <td> {} </td>
          </tr>
        </tbody>
      </Table>
      {/* Order list end  */}

      <div className="text-end">
        <Button variant="success me-3" onClick={saveData}>
          Order Now
        </Button>{" "}
      </div>
    </>
  );
}

export default Order;
