import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getorderbyid, getProducts, getuserReview } from "../../redux/actions";
import LeaveReview from "../LeaveReview/LeaveReview";

export default function OrderDetail() {
  const { id } = useParams();
  let userEmail = localStorage.user;
  let usertype = localStorage.usertype;
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const orderDetails = useSelector((state) => state.orderDet);
  const userReview = useSelector((state) => state.userReview);
  const orderSingle = orderDetails.orders_pos;
  const review = userReview.map((u) => u.productId);

  useEffect(() => {
    dispatch(getuserReview(userEmail));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getorderbyid(id));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="grid justify-items-center">
      <div className="bg-white w-2/3 rounded-lg shadow m-4">
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
                          {products.filter(p => p.id == o.idProduct)?
                          <NavLink to={`/details/${o.idProduct}`}>
                            <div class="font-bold">{o.description}</div>
                          </NavLink>
                          :null
                          }
                        </td>
                      </div>
                    </td>
                    <td>{o.price} ARS</td>
                    <td>{o.createdAt.slice(0, 10)}</td>
                    <td>
                      {usertype === "Admin" && <td></td>}
                      {usertype === "User" && (
                        <td>
                          {review.includes(o.idProduct) ? (
                            <td></td>
                          ) : (
                            <div class="dropdown">
                              <label tabindex="0" class="btn m-1">
                                Leave Review
                              </label>
                              <div
                                tabindex="0"
                                class="dropdown-content card card-compact w-auto p-2 shadow bg-primary text-primary-content"
                              >
                                <div class="card-body">
                                  <LeaveReview productId={o.idProduct}></LeaveReview>
                                </div>
                              </div>
                            </div>
                          )}
                        </td>
                      )}
                    </td>
                    <td></td>
                  </tr>
                );
              })}
          </tbody>
          {/* <!-- foot --> */}
        </table>
      </div>
    </div>
  );
}
