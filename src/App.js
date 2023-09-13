import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import Container from 'react-bootstrap/Container';
import {BrowserRouter as Router, Route , Switch} from 'react-router-dom';
import FoodList from './Components/FoodList';
import AddFood from './Components/AddFood';
import Order from './Components/Order';
import OrderList from './Components/OrderList';
import EditPage from './Components/EditPage';
import ViewOrder from './Components/ViewOrder';
import FoodListComponent from './Components/FoodListComponent';

function App() {
  return (
    <div className="App">
      

      <Header/>
      <br/>
<Container>
      <Router>
      <Switch>

       <Route exact path="/"> <FoodList /> </Route>
       <Route exact path="/addfood" >  <AddFood /> </Route>
      
       <Route exact path="/order" > <Order/> </Route>
       <Route exact path="/orderlist" > <OrderList/> </Route>
       {/* <Route exact path="/edit/:foodId" > <EditPage/> </Route> */}
       <Route exact path="/edit" > <EditPage/> </Route>
       <Route exact path="/vieworder" > <ViewOrder/> </Route>
       <Route exact path="/foodlist" > <FoodListComponent/> </Route>

       </Switch>
       </Router>
     
       </Container>


    </div>
  );
}

export default App;
