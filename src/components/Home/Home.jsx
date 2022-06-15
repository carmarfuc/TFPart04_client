import React, { useEffect, useState } from 'react';
import axios from "axios";
import ProductCards from '../ProductCards/ProductCards';
import Filters from '../Filters/Filters';
import Search from '../Search/Search';
import { useDispatch } from 'react-redux';
import { cartItems, getorder } from '../../redux/actions';

function Home() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  let dataCart = JSON.parse(localStorage.getItem("cartProduct"));

  useEffect(() => {
    const loadProducts = async () => {
      const response = await axios.get(`http://localhost:3001/product/all`);
      setProducts(response.data);
    }
    dispatch(getorder(1));
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