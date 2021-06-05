import {
  SET_LOADING,
  ADD_CART_ITEM,
  FOOD_ERROR,
  GET_CART_NUM,
  OPEN_LOCATION,
  CLOSE_LOCATION,
  FETCH_CART_ITEMS,
  REMOVE_CART_ITEM,
  CALCULATE_CART_TOTAL,
  SHOW_CART_POP_UP,
  HIDE_CART_POP_UP,
  OPEN_CART,
  CLOSE_CART,
  REMOVED_CART_ITEM,
} from "../actions/types";

// Setting the initial state to be manipulated
const initialState = {
  foods: [],
  searchedFoods: [],
  loading: true,
  cartItems: [],
  cartTotalPrice: 0,
  cartTotalQuantity: 1,
  cartNum: 0,
  removedCartItem: null,
  error: null,
  showPopup: false,
  cartOpened: false,
  locationOpened: false,
};

const foodReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ADD_CART_ITEM:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
        cartNum: action.payload.length,
        loading: false,
      };
    case FETCH_CART_ITEMS:
      return {
        ...state,
        cartItems: action.payload,
        cartTotalPrice: action.payload.totalPrice,
        cartTotalQuantity: action.payload.totalQuantity,
        loading: false,
      };
    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item: any) => item.id !== action.payload
        ),
        removedCartItem: action.payload,
      };
    case CALCULATE_CART_TOTAL:
      return {
        ...state,
        cartTotalPrice: action.payload.totalPrice,
        cartTotalQuantity: action.payload.totalQuantity,
        loading: false,
      };
    case GET_CART_NUM: {
      return {
        ...state,
        cartNum: action.payload,
      };
    }
    case FOOD_ERROR:
      console.log(action.payload);
      return {
        ...state,
        error: action.payload,
      };
    case SHOW_CART_POP_UP:
      return {
        ...state,
        showPopup: true,
      };
    case HIDE_CART_POP_UP:
      return {
        ...state,
        showPopup: false,
      };
    case OPEN_CART:
      return {
        ...state,
        cartOpened: true,
      };
    case CLOSE_CART:
      return {
        ...state,
        cartOpened: false,
      };
    case OPEN_LOCATION:
      return {
        ...state,
        locationOpened: true,
      };
    case CLOSE_LOCATION:
      return {
        ...state,
        locationOpened: false,
      };
    default:
      return state;
  }
};

export default foodReducer;
