import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Pressable,
  Animated,
  StyleSheet,
  Easing,
} from "react-native";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { MaterialIcons } from "@expo/vector-icons";

import utilStyle from "../../styles/utilStyle";
import { lightColor, primaryColor } from "../../styles/_variables";

import { openCartModal, hideCartPopup } from "../../actions/foodActions";

type Props = {
  food: {
    showPopup: boolean;
    cartTotalPrice: number;
    cartTotalQuantity: number;
    loading: boolean;
  };
  openCartModal: Function;
  hideCartPopup: Function;
};

const CartPopUp = ({
  food: { showPopup, cartTotalPrice, cartTotalQuantity, loading },
  openCartModal,
  hideCartPopup,
}: Props) => {
  const cartSlideAnim = useRef(new Animated.Value(100)).current;

  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [calculating, setCalculating] = useState<boolean>(false);

  // Function to perform a pop up animation
  const popUp = () => {
    Animated.timing(cartSlideAnim, {
      toValue: 0,
      duration: 500,
      easing: Easing.elastic(1),
      useNativeDriver: true,
    }).start();
  };

  // Function to perform a pop down animation
  const popDown = () => {
    Animated.timing(cartSlideAnim, {
      toValue: 100,
      duration: 1300,
      easing: Easing.elastic(1),
      useNativeDriver: true,
    }).start();
  };

  // Function to switch the animation states
  const switchState = () => {
    if (showPopup) {
      popUp();
      calcTotalCartPrice();
    } else if (cartTotalPrice === 0) {
      popDown();
    } else {
      popDown();
    }
  };

  // Function to get the total price from cart Item
  const calcTotalCartPrice = async () => {
    try {
      const cartItems = await AsyncStorage.getItem("cart-items");

      if (cartItems) {
        const items = JSON.parse(cartItems);
        const total = items.reduce(
          (prevItem: any, curItem: any) => prevItem + curItem.price,
          0
        );
        // console.log(items);
        setTotalPrice(total);
        // console.log(total);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    switchState();
  }, [showPopup]);

  return (
    <Animated.View
      style={[
        style.popUpContain,
        {
          transform: [{ translateY: cartSlideAnim }],
        },
      ]}
    >
      <View style={[utilStyle.card, style.popUpStyle]}>
        {loading ? (
          <View style={{ height: "100%" }}>
            <Text>loading...</Text>
          </View>
        ) : (
          <Pressable onPress={() => hideCartPopup()}>
            <Text
              style={{
                color: lightColor,
                fontSize: 18,
                letterSpacing: 2,
                paddingBottom: 6,
                textTransform: "uppercase",
              }}
            >
              {cartTotalQuantity > 1
                ? `${cartTotalQuantity} Items`
                : `${cartTotalQuantity} Item`}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  color: lightColor,
                  fontSize: 20,
                  fontWeight: "bold",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                ₹ {cartTotalPrice}{" "}
              </Text>

              <Text style={{ color: lightColor, fontSize: 12 }}>
                plus taxes
              </Text>
            </View>
          </Pressable>
        )}

        <Pressable
          style={style.showCartBtn}
          onPress={() => {
            openCartModal();
          }}
        >
          <Text style={{ color: lightColor, fontSize: 20, paddingRight: 5 }}>
            View Cart
          </Text>
          <MaterialIcons name="arrow-right" color={lightColor} size={20} />
        </Pressable>
      </View>
    </Animated.View>
  );
};

const style = StyleSheet.create({
  popUpContain: {
    position: "absolute",
    left: 0,
    width: "100%",
    bottom: 10,
    zIndex: 3,
    alignItems: "center",
  },
  popUpStyle: {
    width: "95%",
    borderRadius: 15,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: primaryColor,
    // borderWidth: 3,
    // borderColor: lightColor,
  },
  showCartBtn: {
    // padding: 10,
    borderRadius: 8,
    backgroundColor: primaryColor,
    flexDirection: "row",
    alignItems: "center",
  },
});

// Function to map state to props
const mapStateToProps = (state: any) => ({
  food: state.food,
});

export default connect(mapStateToProps, { openCartModal, hideCartPopup })(
  CartPopUp
);
