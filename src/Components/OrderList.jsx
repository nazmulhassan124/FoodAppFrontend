import React from 'react'

import "datatables.net-dt/css/jquery.dataTables.min.css";
import DataTable from 'datatables.net-dt';
import $ from 'jquery';
import {useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const URL = "http://localhost:8080/order";

function OrderList() {

    const [orderlist, setoRderlist] = useState([]);
    //const [orderid, setOrderid] = useState();
    const [deletemsg, setDeletemsg] = useState(false);
    const [dataTable, setDataTable] = useState(null);
    useEffect(() => {
        fetch('http://localhost:8080/order/getAll')
          .then(response => response.json())
          .then(data => setoRderlist(data))
          .catch(error => console.error('Error fetching data:', error));
      }, []);

      function reloadTable (){
        if(deletemsg){
            dataTable.destroy();
            loadOrderData();
        }
      }

     useEffect(()=>{
        // new DataTable('#example');
        loadOrderData();
        
      },[]);

      function loadOrderData(){
        setDataTable(
            $('#example').DataTable()
        )
      }

    //   useEffect(()=>{
    //     if(!orderid) return;

    //   let response=   axios.delete(URL+'/delete/'+ orderid);
    //     console.log("response  : " +response)
    //    setDeletemsg(true)

    //   },[orderid])


      const deleteOrder =(orderid)=>{

        let response=   axios.delete(URL+'/delete/'+ orderid);
        dataTable.draw(true)

      }
      const print =()=>{
        axios.get(URL+'/report/'+ 'pdf');

      }

  return (
    <div>
    <div className="text-end mb-3" > <Button variant="primary"  onClick={print} >Print </Button>{' '}</div>
    
<table id="example" className="display" >
        <thead>
            <tr>
                <th>#</th>
            <th>Order Id</th>
            <th>Date</th>
                <th>Food Name</th>
                <th>Quantity</th>
                <th>Price</th>
                {/* <th>Category ID</th> */}
                <th>Action</th>
                
            </tr>
        </thead>
        <tbody>

       { orderlist && orderlist.map( (row,index) =>
       
            <tr key ={row.order_id}>
                <td> <strong>00{index+1}</strong></td>
                <td>{row.order_id}</td>
                <td>{row.order_date}</td>
                <td>{row.food_name}</td>
                <td>{row.order_quantity}</td>
                <td>{row.total_price}</td>
                {/* <td>{row.cat_id}</td>
                 */}
                 <td>

                
          <Button variant="danger"  onClick={()=>deleteOrder(row.order_id)} >Cancel</Button>{' '}
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

export default OrderList