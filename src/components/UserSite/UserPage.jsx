import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getuserOrders } from '../../redux/actions'

const UserPage = () => {
  const dispatch = useDispatch()

  const user = localStorage.getItem("user")
  const orders = useSelector(state => state.userOrders.orders_heads)

  function handleGetOrders(user) {
    dispatch(getuserOrders(user))
  }

  useEffect(() => {
    handleGetOrders(user)
  }, []);

  return (
    <div>
      <div className="overflow-x-auto w-full z-50">
        <table className="table w-full">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th>Price</th>
              <th>User type</th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map(o => {
                return <tr key={o.id}>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="font-bold">{o.total}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {o.orders_pos.map(o => {
                      return <div>
                        {o.description}
                      </div>
                    })}
                    <br />
                    <span className="badge badge-ghost badge-sm">{o.status}</span>
                  </td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
      <div>
      </div>
    </div >
  )
}

export default UserPage