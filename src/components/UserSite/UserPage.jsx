import React from 'react'
import { useDispatch } from "react-redux";
import { getuserOrders } from '../../redux/actions'

const UserPage = () => {
  const dispatch = useDispatch()

  const user = localStorage.getItem("user")

  async function handleGetOrders(user) {
    const orders = await dispatch(getuserOrders(user))
  }

  return (
    <div>
      <div className="overflow-x-auto w-full z-50">
        <table className="table w-full">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th>Name</th>
              <th>User type</th>
              <th>Permissions</th>
            </tr>
          </thead>
          <tbody>
            {/* <tr>
              <td>
                <div className="flex items-center space-x-3">
                  <div>
                    <div className="font-bold">{u.nickName}</div>
                    <div className="text-sm opacity-50">{u.country}</div>
                  </div>
                </div>
              </td>
              <td>
                {u.usertype}
                <br />
                <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
              </td>
              <th>
                <button id={u.email} name={u.usertype} onClick={e => handlePermission(e)}>Change to {u.usertype === 'Admin' ? 'User' : 'Admin'}</button>
              </th>
            </tr> */}
          </tbody>
          {/* <!-- foot --> */}
        </table>
      </div>
      <div>
      </div>
    </div>
  )
}

export default UserPage