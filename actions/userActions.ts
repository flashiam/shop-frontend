import {
  FETCH_USER,
  FETCH_TOKEN,
  REGISTER_ERROR,
  USER_AUTHORIZED,
  USER_UNAUTHORIZED,
  SET_LOADING,
} from "./types";

import * as Google from "expo-google-app-auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Function to register a user
export const registerUser = () => async (dispatch: any) => {
  try {
    setLoading();
    const res = await Google.logInAsync({
      androidClientId:
        "712914795953-4crcea3mqdsnek1610l71psg68q0oqdj.apps.googleusercontent.com",
      webClientId:
        "712914795953-r145j4pqfgdcqi45asaf9hu24d3bge0f.apps.googleusercontent.com",
    });

    if (res.type !== "success") return console.log("Login failed");

    // Store the access token and user details to async storage
    await AsyncStorage.setItem(
      "tokens",
      JSON.stringify({
        authToken: res.accessToken,
        refreshToken: res.refreshToken,
        idToken: res.idToken,
      })
    );
    await AsyncStorage.setItem("user", JSON.stringify(res.user));

    // Dispatch the user profile and auth token
    dispatch({
      type: FETCH_TOKEN,
      payload: {
        accessToken: res.accessToken,
        idToken: res.idToken,
        refreshToken: res.refreshToken,
      },
    });

    dispatch({
      type: FETCH_USER,
      payload: {
        user: res.user,
      },
    });
  } catch (err) {
    // Dispatch the error to the reducer
    dispatch({
      type: REGISTER_ERROR,
      payload: err,
    });
  }
};

// Function to fetch the user credentials from the storage when the app loads
export const fetchUserCredentials = () => async (dispatch: any) => {
  try {
    const tokens = await AsyncStorage.getItem("tokens");
    const user = await AsyncStorage.getItem("user");

    if (!tokens && !user) {
      // user is not logged in
      dispatch({
        type: USER_UNAUTHORIZED,
      });
      console.log("user not logged in");
    } else {
      // User is logged in
      dispatch({
        type: USER_AUTHORIZED,
        payload: {
          tokens: JSON.parse(tokens),
          user: JSON.parse(user),
        },
      });
    }
  } catch (err) {
    // Dispatch the error to reducer
    dispatch({
      type: REGISTER_ERROR,
      payload: err,
    });
  }
};

// Function to sign out from the app
export const signOutUser = () => async (dispatch: any) => {
  try {
    setLoading();
    const tokens = await AsyncStorage.getItem("tokens");
    if (!tokens) return console.log("token not found");

    const { authToken } = JSON.parse(tokens);

    await Google.logOutAsync({
      accessToken: authToken,
      androidClientId:
        "712914795953-4crcea3mqdsnek1610l71psg68q0oqdj.apps.googleusercontent.com",
    });

    const keys = ["tokens", "user"];

    // Remove the keys from async storage
    await AsyncStorage.multiRemove(keys);

    // Dispatch the unauthorized state to reducer
    dispatch({
      type: USER_UNAUTHORIZED,
    });

    console.log("user signed out");
  } catch (err) {
    // Dispatch the error to reducer
    dispatch({
      type: REGISTER_ERROR,
      payload: err,
    });
  }
};

// Function to set auth loading
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
