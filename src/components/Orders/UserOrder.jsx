import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { changeStatus,filterOrder,getuserOrders,filterStatus } from "../../redux/actions";
import axios from "axios";

export default function UserOrder() {
  const { email } = useParams();
  const dispatch = useDispatch();
  const filteredOrders = useSelector((state) => state.filteredOrders);
  const status = useSelector((state)=>state.orderStatus)
  const statusfiltered = useSelector((state) => state.statusfiltered);
  const orders = statusfiltered.length ? statusfiltered:filteredOrders;
  const state = useSelector(state => state)

  useEffect(() => {
    dispatch(filterOrder(email));
  }, [dispatch])

  const handleStatus = (e) => {
    dispatch(filterStatus(e.target.value));
    console.log(e.target.value)
};

  const handlechangeStatus = (id,e) => {
    if(e === "cancelle"){
      changeStatus({orderId:id,status:e}) 
      dispatch(getuserOrders());
    }
    if(e === "pending"){
      changeStatus({orderId:id,status:e})
      dispatch(getuserOrders());
    }
    if(e === "payed"){
      changeStatus({orderId:id,status:e})
      dispatch(getuserOrders());
    }
    
  };

  return (
    <div className="grid justify-items-center">
    <div className="bg-white w-2/3 rounded-lg shadow m-4" >
      <div className=''>
        <div className="pt-2">
          <i className="far fa-heart cursor-pointer"></i>
          <h1 className="text-xl text-orange-700 font-bold">User: {email}</h1>
          <hr/>
        </div>
        <br></br>
      </div>

      <nav>
            <select
                className="select select-bordered select-sm w-60 max-w-xs select-primary mr-10 bg-neutral"
                name='filterByCategory'
                defaultValue={true}
                onChange={handleStatus}
            >
                <option disabled value='true' selected>Filter status</option>
                <option value='all'>All</option>
                {status ? status.map((o) => {
                    return (
                        <option value={o}>{o}</option>
                    )
                }) : ''}
            </select>
      </nav> 
      <br></br>
      <div className="grid justify-items-center">
      <div className="w-2/3 grid justify-items-center">
      <table className="table w-full">
        {/* <!-- head --> */}
        <thead>
          <tr>
            <th>Products</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((o) => {
            return (
              <tr>
                <td>
                  <div className="w-full">
                    <td>
                      <NavLink to={`/OrderDetail/${o.id}`}>
                      <div className="font-bold">
                        {o.orders_pos.length} Products
                      </div>
                      </NavLink>
                    </td>
                  </div>
                </td>
                <td>{o.total} ARS </td>
                <td>{o.status}</td>
                <td>
                  <div className="dropdown dropdown-hover">
                    <label tabindex="0" className="btn m-1">
                      Change Status
                    </label>
                    <ul
                      tabindex="0"
                      className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      <li>
                        <button onClick={() => handlechangeStatus(o.id,"cancelle")}>
                          cancelle
                        </button>
                      </li>
                      <li>
                        <button onClick={() => handlechangeStatus(o.id,"pending")}>
                          pending
                        </button>
                      </li>
                      <li>
                        <button onClick={() => handlechangeStatus(o.id,"payed")}>
                          payed
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
      </div>
    </div>
    </div>
  );
}
