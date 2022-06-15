import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { getorderbyid, getuserReview } from "../../redux/actions";
import LeaveReview from "../LeaveReview/LeaveReview";

export default function OrderDetail() {
  const { id } = useParams();
  let userEmail = localStorage.user
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDet);
  const userReview = useSelector(state=> state.userReview)
  const orderSingle = orderDetails.orders_pos;
  const review = userReview.map(u=>u.productId)


  console.log( "filter", review)


  useEffect(() => {
    dispatch(getuserReview(userEmail));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getorderbyid(id));
  }, [dispatch]);

  return (
    <div class="overflow-x-auto w-full">
      <table class="table w-full">
        {/* <!-- head --> */}
        <thead>
          <tr>
            <th>Products</th>
            <th>Price</th>
            <th>Date</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orderSingle &&
            orderSingle.map((o) => {
              return (
                <tr>
                  <td>
                    <div class="flex items-center space-x-3">
                      <td>
                        <NavLink to={`/details/${o.idProduct}`}>
                          <div class="font-bold">{o.description}</div>
                        </NavLink>
                      </td>
                    </div>
                  </td>
                  <td>{o.price} ARS</td>
                  <td>{o.createdAt.slice(0, 10)}</td>
                  <td>
                    {review.includes(o.idProduct) && (
                               <div class="dropdown">
                               <label tabindex="0" class="btn m-1">
                                 Click
                               </label>
                               <div
                                 tabindex="0"
                                 class="dropdown-content card card-compact w-64 p-2 shadow bg-primary text-primary-content"
                               >
                                 <div class="card-body">
                                   <LeaveReview></LeaveReview>
                                 </div>
                               </div>
                             </div>
                    )}
           
                  </td>
                </tr>
              );
            })}
        </tbody>
        {/* <!-- foot --> */}
      </table>
    </div>
  );
}
