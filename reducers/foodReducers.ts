import { SET_LOADING } from "../actions/types";

// Setting the initial state to be manipulated
const initialState = {
  foods: [],
  loading: true,
};

const foodReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default foodReducer;
