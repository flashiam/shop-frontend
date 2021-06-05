import {
  SET_LOADING,
  ADD_CART_ITEM,
  FOOD_ERROR,
  GET_CART_NUM,
  CALCULATE_CART_TOTAL,
  OPEN_LOCATION,
  CLOSE_LOCATION,
  FETCH_CART_ITEMS,
  REMOVE_CART_ITEM,
  SHOW_CART_POP_UP,
  HIDE_CART_POP_UP,
  REMOVED_CART_ITEM,
  OPEN_CART,
  CLOSE_CART,
} from "./types";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface CartItem {
  id: number;
  title: string;
  subtitle?: string;
  price: number;
  quantity: number;
  weight: number;
}

// Function to add cart item
export const addCartItem = (item: CartItem) => async (dispatch: any) => {
  let items;
  try {
    // Set loading initially
    // setLoading();
    // Save to the storage too
    const existingData = await AsyncStorage.getItem("cart-items");

    if (existingData) {
      items = JSON.parse(existingData);
    } else {
      items = [];
    }

    items.push(item);

    const totalPrice = items.reduce(
      (prevItem: any, curItem: any) => prevItem + curItem.price,
      0
    );

    const totalQuantity = items.reduce(
      (prevItem: any, curItem: any) => prevItem + curItem.quantity,
      0
    );

    await AsyncStorage.setItem("cart-items", JSON.stringify(items));

    dispatch({
      type: ADD_CART_ITEM,
      payload: item,
    });

    // Dispatch the total price to the reducer
    dispatch({
      type: CALCULATE_CART_TOTAL,
      payload: {
        totalPrice,
        totalQuantity,
      },
    });
  } catch (err) {
    dispatch({
      type: FOOD_ERROR,
      payload: err,
    });
  }
};

// Function to fetch the cart items from storage when page refreshes
export const fetchCartItems = () => async (dispatch: any) => {
  try {
    const savedItems = await AsyncStorage.getItem("cart-items");
    if (savedItems) {
      // Calculating total price and quantity also
      const items = JSON.parse(savedItems);

      const totalPrice = items.reduce(
        (prevItem: any, curItem: any) => prevItem + curItem.price,
        0
      );
      const totalQuantity = items.reduce(
        (prevItem: any, curItem: any) => prevItem + curItem.quantity,
        0
      );

      // Dispatch the cart items to reducer
      dispatch({
        type: FETCH_CART_ITEMS,
        payload: items,
      });

      // Dispatch the total price and quantity to reducer
      dispatch({
        type: CALCULATE_CART_TOTAL,
        payload: {
          totalPrice,
          totalQuantity,
        },
      });
    } else {
      dispatch({
        type: FETCH_CART_ITEMS,
        payload: [],
      });
    }
  } catch (err) {
    dispatch({
      type: FOOD_ERROR,
      payload: err,
    });
  }
};

// Function to delete a item from cart
export const deleteCartItem = (id: number) => async (dispatch: any) => {
  try {
    const savedItems = await AsyncStorage.getItem("cart-items");

    if (savedItems) {
      const items = JSON.parse(savedItems);
      const filteredItems = items.filter((item: CartItem) => item.id !== id);

      const totalPrice = filteredItems.reduce(
        (prevItem: any, curItem: any) => prevItem + curItem.price,
        0
      );
      const totalQuantity = filteredItems.reduce(
        (prevItem: any, curItem: any) => prevItem + curItem.quantity,
        0
      );

      await AsyncStorage.setItem("cart-items", JSON.stringify(filteredItems));

      dispatch({
        type: REMOVE_CART_ITEM,
        payload: id,
      });

      dispatch({
        type: CALCULATE_CART_TOTAL,
        payload: {
          totalPrice,
          totalQuantity,
        },
      });
    }
  } catch (err) {
    dispatch({
      type: FOOD_ERROR,
      payload: err,
    });
  }
};

// Function to calculate total cart price
export const calculateTotalPrice =
  (newItem: CartItem) => async (dispatch: any) => {
    try {
      dispatch({
        type: CALCULATE_CART_TOTAL,
        payload: newItem,
      });
    } catch (err) {
      console.log(err);
    }
  };

// Function to get the num of items in cart
export const getCartNo = () => async (dispatch: any) => {
  try {
    const savedItems = await AsyncStorage.getItem("cart-items");

    if (savedItems) {
      dispatch({
        type: GET_CART_NUM,
        payload: JSON.parse(savedItems),
      });
    }
  } catch (err) {
    dispatch({
      type: FOOD_ERROR,
      payload: err,
    });
  }
};

// Function to show the cart pop up
export const showCartPopup = () => {
  return {
    type: SHOW_CART_POP_UP,
  };
};

// Function to hide the cart pop up
export const hideCartPopup = () => {
  return {
    type: HIDE_CART_POP_UP,
  };
};

// Function to open the cart modal
export const openCartModal = () => {
  return {
    type: OPEN_CART,
  };
};

// Function to close the cart modal
export const closeCartModal = () => {
  return {
    type: CLOSE_CART,
  };
};

// Function to open location modal
export const openLocation = () => {
  return {
    type: OPEN_LOCATION,
  };
};

// Function to close location modal
export const closeLocation = () => {
  return {
    type: CLOSE_LOCATION,
  };
};

// Function to set loading
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
