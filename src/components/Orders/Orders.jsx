import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function Orders() {
  const dispatch = useDispatch();
  const allorders = useSelector((state) => state.orders);
  const email = allorders.map(o => o.userEmail)
  let arreglounico = [];

  for (let i = 0; i < email.length; i++) {
    if (arreglounico.includes(email[i])) {
      console.log("se repite " + email[i])
    }
    else {
      arreglounico.push(email[i])
    }
  }

  return (
    <div class="overflow-x-auto w-full">
      <table class="table w-full">
        {/* <!-- head --> */}
        <thead>
          <tr>
            <th>User</th>
            <th>User Orders</th>
            <th> </th>
            <th> </th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {/* <!-- row 1 --> */}
          {arreglounico &&
            arreglounico.map((order) => {
              return (
                <tr>
                  <td>
                    <div class="flex items-center space-x-3">
                      <div class="avatar"></div>
                      <div>
                        <NavLink to={`/userOrder/${order}`}>
                          <div class="font_bold">
                            {order}
                          </div>
                        </NavLink>
                      </div>
                    </div>
                  </td>
                  <td>
                    <NavLink to={`/userOrder/${order}`}>
                      <div class="font_bold"> view Orders</div>
                    </NavLink>
                  </td>
                  <td>

                  </td>
                  <td>

                  </td>
                  <th>

                  </th>
                </tr>
              );
            })}
        </tbody>
        {/* <!-- foot --> */}
      </table>
    </div>
  );
}
