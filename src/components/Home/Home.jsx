import React, { useEffect, useState } from 'react';
import axios from "axios";
import ProductCards from '../ProductCards/ProductCards';
import Filters from '../Filters/Filters';
import Search from '../Search/Search';
import { useDispatch, useSelector } from 'react-redux';
import { cartItems, getorder, getProducts, getCategories, filterByCategory } from '../../redux/actions';

function Home() {
  const dispatch = useDispatch();
  let dataCart = JSON.parse(localStorage.getItem("cartProduct"));
  const products = useSelector(state => state.products);
  const ctgry = useSelector(state => state.categories);
  // let URL = 'https://54.227.99.93:3001'
  let URL;
  process.env.NODE_ENV === "development" ? URL = "http://localhost:3001" : URL = "https://54.227.99.93:3001";

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
    dispatch(getorder());
    if (dataCart?.length) {
      console.log(dataCart)
      dispatch(cartItems(dataCart.length))
    }
  }, [products.length]);

  return (
    <>
      <div>
        <Search allProducts={products} />
        <Filters categories={ctgry} />
        <ProductCards allProducts={products} />
      </div>
    </>
  );
};

export default Home;