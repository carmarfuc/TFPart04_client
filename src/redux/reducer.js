import {
  GET_PRODUCTS,
  GET_PRODUCT_ID,
  BY_NAME,
  FILTER_BY_CATEGORY,
  FILTER_BY_PRICE,
  GET_CATEGORIES,
  PAGINATION,
  CREATE_PRODUCT,
  GET_USERS,
  LOGIN,
  LOGOUT,
  CREATEREVIEW,
  MODIFYPRODUCT,
  LOADINGIMAGE,
  CREATE_ORDER,
  CART_ITEMS,
  GET_ORDERS,
  GET_ORDERS_ID,
  GET_USER_REVIEW,
  GET_USER_ORDERS,
  FILTER_ORDER,
  ORDER_STATUS,
  FILTER_STATUS
} from "./actions"

const initialState = {
  products: [],
  filteredProducts: [],
  productDet: {},
  pagination: 0,
  categories: [],
  loggedUser: '',
  users: [],
  imageLoading: false,
  usertype: '',
  cartItems: 0,
  orders:[],
  userOrders:[],
  filteredOrders:[],
  statusfiltered:[],
  orderDet:[],
  orderStatus:[],
  userReview:[]
}

export function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_PRODUCTS:
      return { ...state, products: payload }

    case GET_PRODUCT_ID:
      return { ...state, productDet: payload }

    case BY_NAME:
      return { ...state, filteredProducts: payload }

    case FILTER_BY_CATEGORY:
      let filteredProd = state.products.filter(p => p.categories.includes(payload));
      return { ...state, filteredProducts: filteredProd }

    case GET_CATEGORIES:
      return { ...state, categories: payload }

    case PAGINATION:
      return { ...state, pagination: payload }

    case FILTER_BY_PRICE:
      {
        let aux = []
        let filtProducts
        state.products.forEach(element => aux.push(element))
        if (payload === 'highest') {
          filtProducts = aux.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        };
        if (payload === 'lowest') {
          filtProducts = aux.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        };
        if (payload === 'all') {
          filtProducts = aux;
        }
        return { ...state, filteredProducts: filtProducts }
      }

    case CREATE_PRODUCT:
      return state;

    case CREATEREVIEW:
      return state;

    case CREATE_ORDER:
      return state;

    case MODIFYPRODUCT:
      return {
        ...state,
        imageLoading: false
      }

    case LOADINGIMAGE:
      return {
        ...state,
        imageLoading: payload
      }

    case GET_USERS:
      return { ...state, users: payload }

    case LOGIN:
      localStorage.setItem("user", payload.email)
      localStorage.setItem("usertype", payload.usertype)
      return {
        ...state,
        loggedUser: payload.email,
        usertype: payload.usertype
      }

    case LOGOUT:
      localStorage.removeItem("user")
      localStorage.removeItem("usertype")
      return { ...state, loggedUser: {} }

    case GET_ORDERS_ID:
      return {...state, orderDet:payload}

    case GET_ORDERS:
      {
        const email = payload.map(o=>o.userEmail)
        let arreglounico=[];

        for (let i = 0; i < email.length; i++) {
          if(arreglounico.includes(email[i])){
            console.log("se repite " + email[i])
          }
          else{
            arreglounico.push(email[i])
            console.log(arreglounico)
          }

        }

        return{...state, orders:arreglounico}
      }

    case GET_USER_REVIEW:
      return{...state, userReview:payload}

    case GET_USER_ORDERS:
      return{...state, userOrders:payload}

    case FILTER_ORDER:
        return {...state,filteredOrders:state.userOrders.filter(u=>u.userEmail === payload) }


    case ORDER_STATUS:
      {
        const orders= state.filteredOrders.map(o=>o.status)
        console.log("orders",orders)

        let arreglounico=[];

        for (let i = 0; i < orders.length; i++) {
          if(arreglounico.includes(orders[i])){
            console.log("se repite " + orders[i])
          }
          else{
            arreglounico.push(orders[i])
            console.log(arreglounico)
          }

        }
      return {...state,orderStatus:arreglounico}
    }

    case FILTER_STATUS:
      {
      let filterOrder = state.filteredOrders.filter(o => o.status.includes(payload));
      return { ...state, statusfiltered: filterOrder }

    }


    case CART_ITEMS:
      if (payload === 0) {
        return {
          ...state,
          cartItems: 0
        }
      }
      if (payload === -1) {
        return {
          ...state,
          cartItems: state.cartItems + payload
        }
      } else {
        return {
          ...state,
          cartItems: payload
        }
      }

    default: return state;
  }
}