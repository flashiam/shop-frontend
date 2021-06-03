import {
  SET_LOADING,
  ADD_CART_ITEM,
  FOOD_ERROR,
  GET_CART_NUM,
  OPEN_LOCATION,
  CLOSE_LOCATION,
  GET_CART_ITEMS,
} from "../actions/types";

// Setting the initial state to be manipulated
const initialState = {
  foods: [],
  searchedFoods: [],
  loading: true,
  cartItems: [],
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
        cartItems: action.payload,
        cartNum: action.payload.length,
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
