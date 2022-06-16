import React, { useEffect } from 'react';
import ProductCards from '../ProductCards/ProductCards';
import Filters from '../Filters/Filters';
import Search from '../Search/Search';
import { useDispatch, useSelector } from 'react-redux';
import { cartItems, getorder, getProducts, getCategories } from '../../redux/actions';

function Home() {
  const dispatch = useDispatch();
  let dataCart = JSON.parse(localStorage.getItem("cartProduct"));
  const products = useSelector(state => state.products);
  const ctgry = useSelector(state => state.categories);

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