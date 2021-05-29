import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchCartItem = async () => {
  try {
    const savedItems = await AsyncStorage.getItem("cart-items");
    if (savedItems) return JSON.parse(savedItems);
    else return [];
  } catch (err) {
    console.log(err);
  }
};
