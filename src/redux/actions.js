import axios from "axios";
// import { useNavigate } from 'react-router-dom';
// const navigate = useNavigate();
export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCT_ID = "GET_PRODUCT_ID";
export const BY_NAME = "BY_NAME";
export const FILTER_BY_CATEGORY = "FILTER_BY_CATEGORY";
export const FILTER_BY_PRICE = "FILTER_BY_PRICE";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const PAGINATION = "PAGINATION";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const GET_USERS = "GET_USERS";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const PERMISSION = "PERMISSION";
export const CREATEREVIEW = "CREATEREVIEW";
export const MODIFYPRODUCT = "MODIFYPRODUCT";
export const LOADINGIMAGE = "LOADINGIMAGE";
export const CREATE_ORDER = "CREATE_ORDER";
export const CART_ITEMS = 'CART_ITEMS'
export const GET_ORDERS = "GET_ORDERS";
export const GET_ORDERS_ID = "GET_ORDERS_ID";
export const GET_USER_REVIEW = "GET_USER_REVIEW";
export const GET_USER_ORDERS = "GET_USER_ORDERS";
export const FILTER_ORDER = "FILTER_ORDER";
export const ORDER_STATUS = "ORDER_STATUS";
export const FILTER_STATUS = "FILTER_STATUS";

let URL;
process.env.NODE_ENV === "development" ? URL = "http://localhost:3001" : URL = "https://tf-henry-04-02.herokuapp.com";


export const getProducts = () => {
  return function (dispatch) {
    return axios.get(`${URL}/product/all`)
      // return axios.get(`/product/all`)
      .then(resp => dispatch({ type: GET_PRODUCTS, payload: resp.data }))
      .catch(error => console.log('Action error in getProducts: ', error))
  }
}

export const getProductById = (id) => {
  return function (dispatch) {
    return axios.get(`${URL}/product/${id}`)
      // return axios.get(`/product/${id}`)
      .then(resp => dispatch({ type: GET_PRODUCT_ID, payload: resp.data }))
      .catch(error => console.log('Action error in getProductById: ', error))
  }
}

export function byName(name) {
  return function (dispatch) {
    return axios.get(`${URL}/product/name?name=${name}`)
      // return axios.get(`/product/name?name=${name}`)
      .then(resp => dispatch({ type: BY_NAME, payload: resp.data }))
      .catch(error => console.log('Action error in byName: ', error))
  }
}

export function filterByCategory(category) {
  return {
    type: FILTER_BY_CATEGORY,
    payload: category
  };
};

export function filterByPrice(optionSelected) {
  return {
    type: FILTER_BY_PRICE,
    payload: optionSelected
  };
};

export function createCategory(category) {
  console.log(category)
  return function () {
    return axios.post(`${URL}/category`, category)
      .catch(error => console.log('Action error in createCategory: ', error))
  };
};

export const getCategories = () => {
  return function (dispatch) {
    return axios.get(`${URL}/category`)
      // return axios.get(`/category`)
      .then(resp => dispatch({ type: GET_CATEGORIES, payload: resp.data }))
      .catch(error => console('Action error in getCategories: ', error))
  }
}

export const pagination = (pageNumber) => {
  return {
    type: PAGINATION,
    payload: pageNumber
  };
};

export function createProduct(product) {
  return function (dispatch) {
    console.log(product)
    try {
      return axios.post(`${URL}/product`, product)
        // return axios.post("/product", product)
        .then(res => {
          alert('Product created Successfully');
          dispatch({
            type: CREATE_PRODUCT,
            payload: res.data
          })
        }).catch(error => {
          if (error.message === 'Request failed with status code 304') {
            alert('The product already exists in the database');
          } else {
            alert(error.message)
          }
        })
    } catch (err) {
      console.log('Action error in createProduct: ', err.message)
    };
  };
};

export function getUsers() {
  return function (dispatch) {
    return axios.get(`${URL}/user`)
      .then(resp => dispatch({ type: GET_USERS, payload: resp.data }))
      .catch(error => console.log('Action error in getProducts: ', error))
  }
}

export function signUp(user) {
  return function (dispatch) {
    return axios.get(`${URL}/user?email=${user.email}`)
      .then(resp => {
        if (resp.data.length) {
          if (resp.data[0].email.split('@'[1] === 'gmail.com')) {
            dispatch({
              type: LOGIN,
              payload: {
                email: resp.data[0].email,
                usertype: resp.data[0].usertype
              }
            })
            return alert('Successfull login!')
          }
          return alert('The email is already in use')
        } else {
          return axios.post(`${URL}/user`, user)
            .then(resp => {
              if (resp.data === 'user created successfully') {
                alert('Account created successfully. Welcome to our platform')
                dispatch({
                  type: LOGIN,
                  payload: {
                    email: user.email,
                    usertype: 'User'
                  }
                })
              } else {
                console.log(resp.data)
              }
            })
        };
      })
      .catch(error => console.log('Action error in signup: ', error))
  };
};

export function login(user) {
  return function (dispatch) {
    return axios.get(`${URL}/user?email=${user.email}`, user)
      .then(resp => {
        let loggedUser = JSON.parse(localStorage.getItem("user"));
        if (loggedUser === user.email) return alert('You are already logged in');
        if (!Object.keys(resp.data).length) return alert('No account linked to that email');
        if (resp.data[0].password !== user.password) return alert('Wrong password');
        dispatch({ type: LOGIN, payload: resp.data[0] });
        alert('Successfull login!');
      })
      .catch(error => console.log('Action error in login: ', error))
  };
};

export function logout() {
  return function (dispatch) {
    return dispatch({ type: LOGOUT })
  }
}

export function changePermission(user) {
  return function () {
    return axios.put(`${URL}/user/update/${user.email}`, user)
      .then(console.log('Admin permissions changed'))
      .catch(error => console.log('Action error in changePermission: ', error))
  };
};

export function deleteUser(emailUser) {
  return function () {
    return axios.delete(`${URL}/user/delete/${emailUser}`)
      .then(resp => {
        if (resp.data.notFound) alert(resp.data.notFound)
        else if (resp.data.success) alert(resp.data.success)
        else console.log('No response')
      })
      .catch(error => console.log('Action error in changePermission: ', error))
  };
};

export function createReview(data) {
  return function (dispatch) {
    return axios.post(`${URL}/product/review`, data)
      .then(resp => {
        console.log('OK', resp, data);
        return dispatch({ type: CREATEREVIEW, payload: resp.data })
      })
      .catch(error => console.log('El error en cuestion: ', error))
  };
};

let uploadPreset = 'd9vdlmyy'
let cloudName = 'da42wdmjv'

export function modifyProduct(data, id) {
  return function (dispatch) {
    if (data.image?.name) {
      const formData = new FormData();
      formData.append('file', data.image);
      formData.append('upload_preset', uploadPreset);
      return axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, formData)
        .then(resp => {
          let updatedData = {
            ...data,
            image: resp.data.public_id
          }
          return axios.put(`${URL}/product/update/${id}`, updatedData)
        })
        .then(resp => {
          // window.location.href = '/home'
          return dispatch({ type: MODIFYPRODUCT })
        })
        .catch(error => console.log('Error: ', error.message))
    } else {
      return axios.put(`${URL}/product/update/${id}`, data)
        .then(resp => {
          // window.location.href = '/home'
          return dispatch({ type: MODIFYPRODUCT })
        })
        .catch(error => console.log('Error: ', error.message))
    }
  };
};

export function loadingImage(status) {
  return function (dispatch) {
    return dispatch({ type: LOADINGIMAGE, payload: status })
  }
}

export function createOrder(data) {
  return function (dispatch) {
    return axios.post(`${URL}/order`, data)
      .then(resp => {
        console.log('OK', resp, data);
        return dispatch({ type: CREATE_ORDER, payload: resp.data })
      })
      .catch(error => console.log('El error en cuestion: ', error))
  };
};

export function cartItems(counter) {
  return function (dispatch) {
    console.log(counter)
    return dispatch({ type: CART_ITEMS, payload: counter })
  }
}
export function getorderbyid(id) {
  return function (dispatch) {
    return axios.get(`${URL}/order/getbyorder/${id}`)
      .then(resp => dispatch({ type: GET_ORDERS_ID, payload: resp.data }))
      .catch(error => console.log('Action error in getOrders: ', error))
  }
}

export function getorder() {
  return function (dispatch) {
    return axios.get(`${URL}/order/getbyorder/1`)
      .then(resp => dispatch({ type: GET_ORDERS, payload: resp.data }))
      .catch(error => console.log('Action error in getOrders: ', error))
  }
}

export function getuserReview(email) {
  return function (dispatch) {
    return axios.get(`${URL}/review/user/${email}`)
      .then(resp => dispatch({ type: GET_USER_REVIEW, payload: resp.data }))
      .catch(error => console.log('Action error in getOrders: ', error))
  }
}

export function getuserOrders(email) {
  return function (dispatch) {
    return axios.get(`${URL}/order/${email} `)
      .then(resp => dispatch({ type: GET_USER_ORDERS, payload: resp.data }))
      .catch(error => console.log('Action error in getOrders: ', error))
  }
}

export function changeStatus(status) {
  return axios.put(`${URL}/order`, status)
    .then(resp => console.log('Change status success', resp.data))
    .catch(error => console.log('Action error in change status: ', error))
};

export function filterOrder(email) {
  return {
    type: FILTER_ORDER,
    payload: email
  };
};


export function filterStatus(e) {
  return {
    type: FILTER_STATUS,
    payload: e
  };
};


export function updateCategorie(id, category) {
  return function (dispatch) {
    return axios.put(`${URL}/category/update/${id}`, category)
      .then(resp => dispatch( resp.data))
      .catch(error => console.log('Action error in change categorie: ', error))
  }
};

