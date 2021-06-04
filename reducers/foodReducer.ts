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
} from "../actions/types";

// Setting the initial state to be manipulated
const initialState = {
  foods: [],
  searchedFoods: [],
  loading: true,
  cartItems: [],
  cartTotalPrice: 0,
  cartNum: 0,
  error: null,
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
        loading: false,
      };
    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item: any) => item.id !== action.payload
        ),
      };
    case CALCULATE_CART_TOTAL:
      return {
        ...state,
        cartTotalPrice:
          state.cartItems.length > 0
            ? state.cartItems
                .push(action.payload)
                .reduce((prevItem, curItem) => prevItem + curItem.price, 0)
            : action.payload.price,
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
