import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { changeStatus, filterOrder, getorder, filterStatus } from "../../redux/actions";

export default function UserOrder() {
  const { email } = useParams();
  const dispatch = useDispatch();
  const UserOrder = useSelector((state) => state.orders)
  const status = useSelector((state) => state.filteredOrders.map(u => u.status))
  const statusfiltered = useSelector((state) => state.statusfiltered);
  const orders = statusfiltered.length ? statusfiltered : UserOrder.filter(u => u.userEmail === email);

  useEffect(() => {
    dispatch(filterOrder(email));
  }, [dispatch])

  const handleStatus = (e) => {
    dispatch(filterStatus(e.target.value));
    console.log(e.target.value)
  };

  const refresh = () => {
    setTimeout(() => {
      dispatch(getorder())
      dispatch(filterOrder(email))
    }, 100);

  }

  const handlechangeStatus = (id, e) => {
    if (e === "cancelle") {
      changeStatus({ orderId: id, status: e })
      refresh()
    }
    if (e === "pending") {
      changeStatus({ orderId: id, status: e })
      refresh()
    }
    if (e === "payed") {
      changeStatus({ orderId: id, status: e })
      refresh()
    }

  };


  let arreglounico = [];


  for (let i = 0; i < status.length; i++) {
    if (arreglounico.includes(status[i])) {
      console.log("se repite " + status[i])
    }
    else {
      arreglounico.push(status[i])
    }
  }

  return (
    <div className="grid justify-items-center">
      <div className="bg-white w-2/3 rounded-lg shadow m-4" >
        <div className=''>
          <div className="pt-2">
            <i className="far fa-heart cursor-pointer"></i>
            <h1 className="text-xl text-orange-700 font-bold">User: {email}</h1>
            <hr />
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
            {arreglounico ? arreglounico.map((o) => {
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
                  <th>Date</th>
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
                      <td>{o.date.slice(0, 10)}</td>
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
                              <button onClick={() => handlechangeStatus(o.id, "cancelle")}>
                                cancelle
                              </button>
                            </li>
                            <li>
                              <button onClick={() => handlechangeStatus(o.id, "pending")}>
                                pending
                              </button>
                            </li>
                            <li>
                              <button onClick={() => handlechangeStatus(o.id, "payed")}>
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
