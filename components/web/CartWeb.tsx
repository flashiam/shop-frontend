import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  Pressable,
  StyleSheet,
  TextInput,
  Platform,
} from "react-native";
import "@expo/match-media";
import { connect } from "react-redux";
import { useMediaQuery } from "react-responsive";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { primaryColor, darkColor, lightColor } from "../../styles/_variables";
import utilStyle from "../../styles/utilStyle";

import { RootStackParamList } from "../../App";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

import { addCartItem } from "../../actions/foodActions";

type CartScreenNavProp = StackNavigationProp<RootStackParamList, "CartWeb">;
type CartScreenRouteProp = RouteProp<RootStackParamList, "CartWeb">;

type Props = {
  navigation: CartScreenNavProp;
  route: CartScreenRouteProp;
  addCartItem: Function;
};

interface CartItem {
  id: number;
  title: string;
  subtitle?: string;
  price: number;
  quantity: number;
  weight: number;
}

interface CartData {
  quantity: number;
  price: number;
}

const CartWeb = ({ navigation, route, addCartItem }: Props) => {
  // State for cart items
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  // State for cart data
  const [cartData, setCartData] = useState<CartData>({ quantity: 0, price: 0 });
  // Media query
  const phoneOrTablets = useMediaQuery({ maxDeviceWidth: 768 });
  // State for total cart price
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // Function to delete item from the cart
  const deleteItem = async (id: number) => {
    try {
      // Delete from the state
      const updatedItems = cartItems.filter(item => item.id !== id);
      setCartItems(updatedItems);

      // Delete from storage too
      const storedItems = await AsyncStorage.getItem("cart-items");

      if (storedItems) {
        const filteredItems = JSON.parse(storedItems).filter(
          (item: { id: number }) => item.id !== id
        );
        await AsyncStorage.setItem("cart-items", JSON.stringify(filteredItems));
      }

      fetchDataFromCart();

      //   addCartItem(updatedItems);

      // if (!storedItems) {
      //     popDown();
      // } else {
      //     fetchDataFromCart();
      // }
      // console.log("item removed");

      // Enable the cart btn to add item
      // setCartStatus(false);
    } catch (err) {
      console.log(err);
    }
  };

  // Function to fetch the item quantity and price from the cart
  const fetchDataFromCart = async () => {
    try {
      const savedItems = await AsyncStorage.getItem("cart-items");
      let initQuantity = 0;
      let initPrice = 0;

      if (savedItems) {
        JSON.parse(savedItems).forEach((item: any) => {
          initQuantity = parseInt(item.quantity) + initQuantity;
          initPrice = parseInt(item.price) + initPrice;
        });

        // const isItemPresent = JSON.parse(savedItems).filter((item:CartItem) => item.id === id)

        // if(!isItemPresent) {
        //   setCartData({ quantity: quantity,price: foodPrice });
        // }
      } else {
        initQuantity = 0;
        initPrice = 0;
      }
      console.log(initQuantity, initPrice);
      setCartData({ quantity: initQuantity, price: initPrice });
    } catch (err) {
      console.log(err);
    }
  };

  // Function to fetch the cart items
  const fetchCartItems = async () => {
    try {
      const storedItems = await AsyncStorage.getItem("cart-items");

      // Set the items to the state
      if (storedItems) setCartItems(JSON.parse(storedItems));
      console.log("items fetched successfully");
    } catch (err) {
      console.log(err);
    }
  };

  // Function to run when user proceeds for payment
  const onProceedPayment = () => {
    navigation.navigate("OrderLoading");
    // fetchOrderId();

    // if (orderLoading) {
    //   console.log("loading...");
    // } else {
    //   navigation.navigate("OrderLoading");
    // }
    // setCart(false);
    // Redirect to payment page
    // navigation.navigate("Payment", { orderid: orderId });
  };

  useEffect(() => {
    fetchCartItems();
    fetchDataFromCart();
  }, []);

  return (
    <View style={[{ flex: 1 }]}>
      <View style={[utilStyle.container, style.cartContain]}>
        <ScrollView style={style.cartSection}>
          {cartItems &&
            cartItems.map(item => (
              <View
                key={item?.id}
                style={[
                  utilStyle.card,
                  style.cartItem,
                  { padding: phoneOrTablets ? 15 : 20 },
                ]}
              >
                <View
                  style={
                    phoneOrTablets
                      ? { flexDirection: "column" }
                      : {
                          width: "50%",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }
                  }
                >
                  <View>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                      {item?.title} {item?.subtitle}
                    </Text>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                      <Text
                        style={{
                          color: primaryColor,
                          fontWeight: "bold",
                        }}
                      >
                        ₹ {item?.price.toString()}.00
                      </Text>
                      <Text
                        style={{
                          color: primaryColor,
                          fontWeight: "bold",
                        }}
                      >
                        / {item?.weight.toString()}gm
                      </Text>
                    </View>
                  </View>
                  <View
                    style={[
                      style.quantityContain,
                      phoneOrTablets
                        ? { marginTop: 20 }
                        : { marginLeft: 100, marginTop: 0 },
                    ]}
                  >
                    <Text>Quantity</Text>
                    <View style={[utilStyle.card, style.quantityBox]}>
                      <Pressable style={style.btn}>
                        <Text>-</Text>
                      </Pressable>
                      <TextInput
                        style={style.quantityField}
                        value={item?.quantity.toString()}
                        keyboardType="numeric"
                      />
                      <Pressable style={style.btn}>
                        <Text>+</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
                <Pressable
                  onPress={() => {
                    deleteItem(item?.id);
                    // autoCloseCart();
                  }}
                >
                  <MaterialIcons
                    name="delete-outline"
                    color={darkColor}
                    size={25}
                  />
                </Pressable>
              </View>
            ))}
        </ScrollView>

        <View style={style.topContent}>
          <Pressable onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" color={darkColor} size={30} />
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate("Promo");
            }}
          >
            <Text
              style={{
                color: primaryColor,
                textDecorationLine: "underline",
                textDecorationStyle: "solid",
                paddingRight: 15,
              }}
            >
              Add promocode
            </Text>
          </Pressable>
        </View>
      </View>
      <View style={[utilStyle.card, style.cartFooter]}>
        <View style={[utilStyle.container, style.footerContain]}>
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              ₹ {cartData.price}
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>Total</Text>
          </View>
          <Pressable
            style={style.paymentBtn}
            onPress={() => onProceedPayment()}
          >
            <Text style={{ color: lightColor }}>Proceed to payment</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  cartContain: {
    elevation: 5,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    height: "100%",
    // backgroundColor: lightColor,
    backgroundColor: "#F4F4F4",
  },
  cartItem: {
    backgroundColor: lightColor,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 15,
    marginBottom: 10,
    zIndex: 1,
  },
  cartSection: {
    marginTop: 100,
    paddingHorizontal: 15,
    marginBottom: 70,
  },
  quantityContain: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  quantityBox: {
    marginLeft: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 25,
    // padding: 3,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  cartFooter: {
    position: "absolute",
    bottom: -8,
    left: 0,
    width: "100%",
    margin: 0,

    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  footerContain: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  paymentBtn: {
    backgroundColor: primaryColor,
    padding: 10,
    borderRadius: 8,
  },
  topContent: {
    position: "absolute",
    top: 10,
    left: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 15,
  },
  btn: {
    borderRadius: 100 / 2,
  },
  quantityField: {
    textAlign: "center",
    width: 50,
    // flex: 1,
  },
});

export default connect(null, { addCartItem })(CartWeb);
