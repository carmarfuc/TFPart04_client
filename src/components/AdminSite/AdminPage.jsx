import React, { useState, useEffect } from "react";
import ProductTable from "./ProductTable";
import CreateCategory  from '../CreateCategory/CreateCategory';
import ProductCreationForm from '../ProductCreationForm/ProductCreationForm';
import Users from "./Users";
import Orders from '../Orders/Orders'
import Search  from "../Search/Search";
import { getorder} from "../../redux/actions";
import { useDispatch,useSelector } from "react-redux";
import axios from "axios";
import Categories from "../CreateCategory/Categories";


export default function AdminPage(props) {
  const dispatch = useDispatch();
  const [Page, setPage] = useState('course');
  const [products, setProducts] = useState([]);
  const category = useSelector(state => state.categories);

  console.log("cat",category)


  useEffect(() => {
    dispatch(getorder());
  }, [dispatch]);


  useEffect(() => {
    const loadProducts = async () => {
      const response = await axios.get(`http://localhost:3001/product/all`);
      setProducts(response.data);
    }
    loadProducts();
  }, [products.length]);


  function HandlePage(e){
   if(e === 'course')setPage('course')
   else if(e === 'Category')setPage('Category')
   else if(e === 'CreateCourse')setPage('CreateCourse')
   else if(e === 'order')setPage('order')
   else if(e === 'Users')setPage('Users')
  }



  return (
    <div>
    <div class="flex flex-row-reverse">
      {Page === "course" && (
 <div class="flex flex-row"><Search allProducts={products}/></div>
      )}

   
      </div>
      <div class="flex flex-row">
        {/* //------------------------- menu lateral ------------------------------------- */}
        <div>
          <aside class="w-64" aria-label="Sidebar">
            <div class="overflow-y-auto py-4 px-3 bg-gray-50 rounded grey:bg-gray-800">
              <ul class="space-y-2">
                <li>
                  <button
                    onClick={()=>HandlePage('course')}
                    class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-grey hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <svg
                      class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                      <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                    </svg>
                    <span class="ml-3">Edite your Courses</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={()=>HandlePage('Category')}
                    class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-grey hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <svg
                      class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                    </svg>
                    <span class="ml-3">Categories</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => HandlePage('order')}
                    class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-grey hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg"
                      class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    <span class="ml-3">View orders</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={()=>HandlePage('CreateCourse')}
                    class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-grey hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <svg
                      class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                      <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                    </svg>
                    <span class="ml-3">Create course</span>
                    {/* <span class="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200">
                  3
                </span> */}
                  </button>
                </li>
                <li>
                  <button
                    onClick={()=>HandlePage('Users')}
                    class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-grey hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <svg
                      class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span class="ml-3">Users</span>
                  </button>
                </li>
              </ul>
            </div>
          </aside>
        </div>

        {/* //---------------------------------------- tabla ---------------------------------- */}
        <div class="flex-auto">
          {Page === 'course' &&
          <div>
            <ProductTable allProducts={products}/>
          </div> }
          {Page === 'Category' &&
              <div>
                <Categories/>
              </div>
            }
          {Page === 'order' &&
          <div>
            <Orders/>
          </div> }
            {Page === 'CreateCourse' &&
              <div>
                <ProductCreationForm/>
              </div>
            }
            {Page === 'Users' &&
              <div>
                <Users/>
              </div>
            }
        </div>


        </div>
    </div>
  );
}
