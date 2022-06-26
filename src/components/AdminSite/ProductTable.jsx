import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actions";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";




export default function ProductTable() {
  const dispatch = useDispatch();
  const allProduct = useSelector(state => state.products);
  const filteredProducts = useSelector(state => state.filteredProducts);
  const products = filteredProducts.length ? filteredProducts : allProduct;
  let URL= 'https://tf-henry-04-02.herokuapp.com';

  
  async function deletePost(id) {
    await axios.delete(`${URL}/product/delete/${id}`);
    alert('Delete successful');
    dispatch(getProducts());
  }

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);


  return (
    <div className="grid justify-items-start w-full ml-[-12px]">
      <table className=" table w-full">
        {/* <!-- head --> */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* <!-- row 1 --> */}
          {products &&
            products.map((product) => {
              const imageName = product.image.includes('product') ?
                '../../img_products/' + product.image + '.jpg' :
                `https://res.cloudinary.com/da42wdmjv/image/upload/v1654727380/${product.image}`
              console.log("pruecutos",product)
              return (
                <tr>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={imageName} alt='imagen' />
                        </div>
                      </div>
                      <div>
                        <NavLink to={`/details/${product.id}`}>
                          <div className='text-sm font-bold'>{product.name.toUpperCase()}</div>
                        </NavLink>
                      </div>
                    </div>
                  </td>
                  <td>{product.categories +" "}</td>
                  <td>${product.price}</td>
                  <th>
                    <NavLink to={`/modificationForm/${product.id}`}>
                      <button className="btn btn-ghost btn-xs">Modify</button>
                    </NavLink>
                  </th>
                  <th>
                    <button onClick={() => deletePost(product.id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 btn-ghost "
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>

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
