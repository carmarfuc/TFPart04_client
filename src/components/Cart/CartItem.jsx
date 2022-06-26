import { React, useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createOrder, cartItems } from '../../redux/actions'
import axios from 'axios'
import { TrashIcon } from '@heroicons/react/outline'



const CartItem = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [cart, setCart] = useState([])
  let URL;
  // let URL = 'https://54.227.99.93:3001'
  // Mercado Pago-------
  process.env.NODE_ENV === "development" ? URL = "http://localhost:3001" : URL = "https://54.227.99.93:3001";

  const backendURL = `${URL}/mercadopago/new`

  let dataCart = JSON.parse(localStorage.getItem("cartProduct"));

  const MpPaymentHandler = async (cookies) => {
    if (dataCart && dataCart.length > 0) {
      const response = await axios.post(backendURL, cookies);
      window.location.href = response.data.init_point;
    }
  };

  const removeOneFromCart = (id) => {
    dispatch(cartItems(-1))
    let dataCart = JSON.parse(localStorage.getItem("cartProduct"));
    let dataCart2 = dataCart.filter(item => item.idProduct !== id);
    localStorage.setItem("cartProduct", JSON.stringify(dataCart2));
    setCart(dataCart2);
  }

  const clearCart = () => {
    dispatch(cartItems(0))
    localStorage.removeItem("cartProduct");
    setCart(dataCart);
  }

  let orderData = {
  }

  let handleSubmit = (e) => {
    e.preventDefault();
    let dataCart = JSON.parse(localStorage.getItem("cartProduct"));
    if (dataCart) {
      orderData = {
        ...orderData,
        currency: 'USD',
        userEmail: localStorage.getItem('user'),
        orders: dataCart
      }
      dispatch(cartItems(0))
      dispatch(createOrder(orderData));
      localStorage.removeItem("cartProduct");
      setCart(dataCart);
    }
    if (!dataCart) {
      alert("Cart is empty")
    }
    if (dataCart.length === 0) {
      alert("Cart is empty")
    }
      // navigate('/successOrder')
    // } else {
    //   alert('Cart is empty')
    // }
  }



  let handleLogin = () => {
    navigate('/')
  }

  return (
    <div className="grid w-full justify-items-center overflow-hidden my-10">

      {
        localStorage.getItem('user') ?
          <div className="grid grid-cols-2 bg-white w-full shadow-lg rounded-lg overflow-hidden my-10">
            <div className="px-2 py-2">
              <div className="text-gray-900 font-bold text-1xl divide-y">
                <div>
                  <p className="font-bold text-lg grid justify-items-start px-2 py-2">Items ({dataCart && dataCart.length}) </p>
                  <br />
                </div>
                {
                  dataCart && dataCart.map((product) => {
                    return (
                      <div key={product.idProduct} className="px-2 py-2">
                        <table>
                          <td className="w-[300px]">
                          <h1 className="text-gray-900 grid justify-items-start font-bold text-base uppercase">{product.description}</h1>
                          </td>
                          <td className="w-[300px]">
                          <p className="text-gray-600 text-sm">${product.price} USD</p>
                          </td>
                          <td>
                          <button onClick={() => removeOneFromCart(product.idProduct)} className="text-red-600">
                            <TrashIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                          </td>
                        </table>
                      </div>
                    )
                  })}
              </div>
              <hr />
              <div className="grid grid-clos-2">
                <div className="">
                </div>
                <div className="w-9/12 grid justify-items-end">
                  <p className="font-bold text-lg mt-1">Total: {
                    dataCart && dataCart.reduce((total, product) => {
                      return total + product.price
                    }
                      , 0)
                  } USD</p>
                </div>
                <hr />
              </div>
              <div className="grid grid-cols-2 ">
                <div className="grid justify-items-center m-3">
                  <form onSubmit={handleSubmit} className=''>
                    <button className="btn btn-primary w-40" type='submit' onClick={() => MpPaymentHandler(dataCart)}>Buy</button>
                  </form>
                </div>
                <div>
                  <button className="btn btn-primary w-40 m-3" onClick={clearCart}>Clear Cart</button>
                </div>
              </div>
            </div>
            <div className="bg-gray-200">

              <div>
                <div>
                  <div>
                    <p className="font-bold text-lg text-orange-800">User Info</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-semibold text-md">{localStorage.getItem('user')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          :
          //--------------------------------------------USER NOT FOUND----------------------------------------------------------------

          <div className="grid grid-cols-2 bg-white w-full shadow-lg rounded-lg my-10">
            <div className="px-2 py-2">
              <div className="text-gray-900 font-bold text-1xl uppercase divide-y">
                <div>
                  <p className="font-bold text-lg grid justify-items-start px-2 py-2">Shopping Cart ({dataCart && dataCart.length}) </p>
                  <br />
                </div>
                {
                  dataCart && dataCart.map(product => {
                    return (
                      <div key={product.idProduct} className="px-2 py-2">
                        <table>
                          <td className="w-[300px]">
                          <h1 className="text-gray-900 grid justify-items-start font-bold text-base uppercase">{product.description}</h1>
                          </td>
                          <td className="w-[300px]">
                          <p className="text-gray-600 text-sm">${product.price} USD</p>
                          </td>
                          <td>
                          <button onClick={() => removeOneFromCart(product.idProduct)} className="text-red-600">
                            <TrashIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                          </td>
                        </table>
                      </div>
                    )
                  })}
              </div>
              <hr />
              <div className="grid grid-clos-2">
                <div className="">
                </div>
                <div className="w-9/12 grid justify-items-end">
                  <p className="font-bold text-lg mt-1">Total: {
                    dataCart && dataCart.reduce((total, product) => {
                      return total + product.price
                    }
                      , 0)
                  } USD</p>
                </div>
                <hr />
              </div>
              <div className="grid grid-cols-2">

                <div className="mt-2 grid justify-items-center ">
                  <button className="btn btn-primary w-40" onClick={handleLogin}>Login to Buy</button>
                </div>
                <div>
                  <button className="btn btn-primary w-40 m-2" onClick={clearCart}>Clear Cart</button>
                </div>
              </div>
            </div>
            <div className="bg-gray-200">

            </div>
          </div>
      }
    </div>
  )
}

export default CartItem