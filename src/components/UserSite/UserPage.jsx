import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import { getuserOrders } from '../../redux/actions'

const UserPage = () => {
  const dispatch = useDispatch()

  const user = localStorage.getItem("user")
  const orders = useSelector(state => state.userOrders?.orders_heads)
  console.log('Las orders: ', orders)

  function handleGetOrders(user) {
    dispatch(getuserOrders(user))
  }

  useEffect(() => {
    handleGetOrders(user)
  }, []);

  if (!orders || !orders.length) return (
    <div>You have no purchases yet</div>
  )

  return (
    <div className="bg-white w-3/3 rounded-lg shadow m-4 ">
      <table className="table w-full border-1">
        {/* <!-- head --> */}
        <thead>
          <tr>
            <th>Date</th>
            <th>Courses</th>
            <th>Order price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map(o => {
              return <tr key={o.id}>
                <td>
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="font-bold">{o.date.slice(0, 10)}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {o.orders_pos.map(pos => {
                    return <div className=' font-bold text-sm'>
                      - {pos.description.toUpperCase()}
                    </div>
                  })}
                  <br />
                  <span className="badge badge-neutral badge-md font-bold">Status: {o.status}</span>
                </td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="font-bold">{o.total} {o.currency}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <NavLink to={`/OrderDetail/${o.id}`}>
                    Details
                  </NavLink>
                </td>
              </tr>
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default UserPage