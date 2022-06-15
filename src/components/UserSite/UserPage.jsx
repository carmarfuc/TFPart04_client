import React from 'react'
import { getUserOrders } from '../../redux/actions'

const UserPage = () => {

  const user = localStorage.getItem("user")
  console.log('User: ',user)

  // async function handleGetOrders(user) {
  //   const orders = await dispatch(getUserOrders(user))
  //   console.log('Orders: ',orders)
  // }

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