import React, { useEffect, useState } from 'react';
import axios from "axios";
import ProductCards from '../ProductCards/ProductCards';
import Filters from '../Filters/Filters';
import Search from '../Search/Search';
import { useDispatch } from 'react-redux';
import { cartItems } from '../../redux/actions';

function Home() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  let dataCart = JSON.parse(localStorage.getItem("cartProduct"));
  // let URL = 'https://54.227.99.93:3001'
  let URL;
  process.env.NODE_ENV === "development" ? URL = "http://localhost:3001" : URL = "https://54.227.99.93:3001";

  useEffect(() => {
    const loadProducts = async () => {
      const response = await axios.get(`${URL}/product/all`);
      setProducts(response.data);
    }
    loadProducts();
    if (dataCart?.length) {
      console.log(dataCart)
      dispatch(cartItems(dataCart.length))
    }
  }, [products.length]);

  return (
    <>
      <div>
        <Search allProducts={products} />
        <Filters />
        <ProductCards allProducts={products} />
      </div>
    </>
  );
};

export default Home;