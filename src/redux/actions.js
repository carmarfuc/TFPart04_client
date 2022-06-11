import axios from "axios";

export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCT_ID = "GET_PRODUCT_ID";
export const BY_NAME = "BY_NAME";
export const FILTER_BY_CATEGORY = "FILTER_BY_CATEGORY";
export const FILTER_BY_PRICE = "FILTER_BY_PRICE";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const PAGINATION = "PAGINATION";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const PERMISSION = "PERMISSION";
export const CREATEREVIEW = "CREATEREVIEW";
export const MODIFYPRODUCT = "MODIFYPRODUCT";
export const LOADINGIMAGE = "LOADINGIMAGE"

export const getProducts = () => {
  return function (dispatch) {
    return axios.get(`http://localhost:3001/product/all`)
      // return axios.get(`/product/all`)
      .then(resp => dispatch({ type: GET_PRODUCTS, payload: resp.data }))
      .catch(error => console.log('Action error in getProducts: ', error))
  }
}

export const getProductById = (id) => {
  return function (dispatch) {
    return axios.get(`http://localhost:3001/product/${id}`)
      // return axios.get(`/product/${id}`)
      .then(resp => dispatch({ type: GET_PRODUCT_ID, payload: resp.data }))
      .catch(error => console.log('Action error in getProductById: ', error))
  }
}

export function byName(name) {
  return function (dispatch) {
    return axios.get(`http://localhost:3001/product/name?name=${name}`)
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
  return function () {
    return axios.post("http://localhost:3001/category", category)
      // return axios.post("/category", category)
      .then(alert('Category created successfully!'))
      .catch(error => console.log('Action error in createCategory: ', error))
  };
};

export const getCategories = () => {
  return function (dispatch) {
    return axios.get(`http://localhost:3001/category`)
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
      return axios.post("http://localhost:3001/product", product)
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

export function login(user) {
  return function (dispatch) {
    return axios.post("http://localhost:3001/user/login", user)
      .then(resp => dispatch({ type: LOGIN, payload: resp.data }))
      .catch(error => console.log('Action error in login: ', error))
  };
};

export function logout() {
  return function (dispatch) {
    return dispatch({ type: LOGOUT })
  }
}

export function signUp(user) {
  return function () {
    return axios.post("http://localhost:3001/user/signup", user)
      .then(resp => {
        if (typeof (resp.data) === 'string') alert(resp.data)
        else alert('Welcome to our platform')
      })
      .catch(error => console.log('Action error in signup: ', error))
  };
};

export function changePermission(user) {
  return function () {
    return axios.put("http://localhost:3001/user/permission", user)
      .then(console.log('Admin permissions changed'))
      .catch(error => console.log('Action error in changePermission: ', error))
  };
};

export function createReview(data) {
  return function (dispatch) {
    return axios.post("http://localhost:3001/product/review", data)
      .then(resp => {
        console.log('OK', resp, data);
        return dispatch({ type: CREATEREVIEW, payload: resp.data })
      })
      .catch(error => console.log('El error en cuestion: ', error))
  };
};

// export function modifyProduct(data, id) {
//   return function () {
//     console.log(data)
//     return axios.put(`http://localhost:3001/product/update/${id}`, data, {
//       // headers: {
//       //   'Content-Type': 'multipart/form-data'
//       // }
//     })
//       .then(resp => {
//         console.log(resp)
//       })
//       .catch(error => console.log('El error en cuestion: ', error.message))
//   };
// };

let upload_preset = 'd9vdlmyy'
let CloudName = 'da42wdmjv'

export function modifyProduct(data, id) {
  return function (dispatch) {
    const formData = new FormData();
    formData.append('file', data.image);
    formData.append('upload_preset', upload_preset);
    return axios.post(`https://api.cloudinary.com/v1_1/${CloudName}/upload`, formData)
      .then(resp => {
        let updatedData = {
          ...data,
          image: resp.data.public_id
        }
        axios.put(`http://localhost:3001/product/update/${id}`, updatedData)
      })
      .then(resp => {
        console.log('FUNCIONANDO')
        return dispatch({ type: MODIFYPRODUCT, payload: resp })
      })
      .catch(error => console.log('El error en cuestion: ', error.message))
  };
};

export function loadingImage(status) {
  return function (dispatch) {
    return dispatch({ type: LOADINGIMAGE, payload: status })
  }
}