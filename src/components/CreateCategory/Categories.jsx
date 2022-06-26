import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../redux/actions";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";




export default function Categories() {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories)
  let URL= 'https://codecamp-academy.herokuapp.com';

  async function deletePost(id) {
    await axios.delete(`${URL}/category/delete/${id}`);
    alert('Delete successful');
    dispatch(getCategories());
  }


  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);


  return (
    <div class="overflow-x-auto w-full">
      <table class="table w-full">
        {/* <!-- head --> */}
        <thead>
          <tr>
            <th>Id</th>
            <th>Categorie</th>
            <th>Description</th>
            <th></th>
            <th>
            </th>
          </tr>
        </thead>
        <tbody>
          {/* <!-- row 1 --> */}
          {categories &&
            categories.map((categorie) => {
              return (
                <tr>
                  <td>
                    <div class="flex items-center space-x-3">
                      <div>
                        <div class="font-bold">{categorie.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className='text-sm font-bold'>{categorie.name.toUpperCase()}</td>
                  <td>{categorie.description}</td>
                  <th>
                    <NavLink to={`/ModifyCategory/${categorie.id}`}>
                      <button class="btn btn-ghost btn-xs">Modify</button>
                    </NavLink>
                  </th>
                  <th>
                    <button onClick={() => deletePost(categorie.id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 btn-ghost "
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