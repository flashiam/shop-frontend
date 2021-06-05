import React, { useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
} from "react-native";
import Modal from "react-native-modal";
import { connect } from "react-redux";

import {
  hideCartPopup,
  deleteCartItem,
  closeCartModal,
  fetchCartItems,
} from "../../actions/foodActions";

import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import utilStyle from "../../styles/utilStyle";
import {
  primaryColor,
  darkColor,
  lightColor,
  secondaryColor,
} from "../../styles/_variables";

import { CartItem } from "../../App";

type Props = {
  food: {
    cartItems: any;
    cartOpened: boolean;
    cartTotalPrice: number;
  };
  hideCartPopup: Function;
  closeCartModal: Function;
  deleteCartItem: Function;
  fetchCartItems: Function;
};

const CartModal = ({
  food: { cartItems, cartOpened, cartTotalPrice },
  hideCartPopup,
  deleteCartItem,
  closeCartModal,
  fetchCartItems,
}: Props) => {
  // Function to delete the item
  const deleteItem = (id: number) => {
    deleteCartItem(id);
    // if (id === foodId) {
    // setCartStatus(false);
    // }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <Modal
      isVisible={cartOpened}
      statusBarTranslucent
      style={{ margin: 0, position: "relative", bottom: 0, left: 0 }}
    >
      <View style={style.cartContain}>
        <ScrollView style={style.cartSection}>
          {
            //   loading ? (
            //     <View>
            //       <Text>Loading...</Text>
            //     </View>
            //   ) : (
            cartItems &&
              cartItems.map((item: CartItem) => (
                <View key={item?.id} style={[utilStyle.card, style.cartItem]}>
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
                    <View style={style.quantityContain}>
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
                  <Pressable onPress={() => deleteItem(item.id)}>
                    <MaterialIcons
                      name="delete-outline"
                      color={darkColor}
                      size={25}
                    />
                  </Pressable>
                </View>
              ))
          }
        </ScrollView>
        <View style={[utilStyle.card, style.cartFooter]}>
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              ₹ {cartTotalPrice}
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>Total</Text>
          </View>
          <Pressable
            style={style.paymentBtn}
            //   onPress={() => onProceedPayment()}
          >
            <Text style={{ color: lightColor }}>Proceed to payment</Text>
          </Pressable>
        </View>

        <View style={style.topContent}>
          <Pressable onPress={() => closeCartModal()}>
            <AntDesign name="close" color={darkColor} size={25} />
          </Pressable>
          <Pressable
            onPress={() => {
              closeCartModal();
              // navigation.navigate("Promo");
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
    </Modal>
  );
};

const style = StyleSheet.create({
  cartContain: {
    position: "absolute",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    height: "90%",
    bottom: 0,
    left: 0,
    right: 0,
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
    marginTop: 50,
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
    padding: 3,
  },
  cartFooter: {
    position: "absolute",
    bottom: -8,
    left: 0,
    width: "100%",
    margin: 0,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
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
  quantityField: {
    width: "40%",
    textAlign: "center",
    borderLeftWidth: 1,
    borderLeftColor: secondaryColor,
    borderRightWidth: 1,
    borderRightColor: secondaryColor,
    fontWeight: "bold",
    height: 20,
  },
});

const mapStateToProps = (state: any) => ({
  food: state.food,
});

export default connect(mapStateToProps, {
  hideCartPopup,
  deleteCartItem,
  closeCartModal,
  fetchCartItems,
})(CartModal);
