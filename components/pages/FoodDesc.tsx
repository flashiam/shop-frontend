import React, { useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
  Dimensions,
  Modal,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import Carousel from "react-native-snap-carousel";
import utilStyle from "../../styles/utilStyle";
import {
  darkColor,
  lightColor,
  medColor,
  primaryColor,
  secondaryColor,
} from "../../styles/_variables";

import {
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
  Entypo,
} from "@expo/vector-icons";
import { RootStackParamList } from "../../App";

import food from "../../img/indian_food_1.png";
import chicken from "../../img/chicken.png";

import Food from "../foodComponents/Food";

const SliderWidth = Dimensions.get("window").width - 450;

interface Photo {
  id: number;
  img: string;
}

interface FoodType {
  id: number;
  title: string;
  subtitle?: string;
  price: number;
  img: string;
  rating: number;
  stars: number;
  reviews: number;
}

interface CartItem {
  id: number;
  title: string;
  subtitle?: string;
  price: number;
  quantity: number;
  weight: number;
}

// Type checking
type FoodDescScreenNavProp = StackNavigationProp<RootStackParamList, "Food">;
type FoodDescScreenRouteProp = RouteProp<RootStackParamList, "Food">;

type Prop = {
  route: FoodDescScreenRouteProp;
  navigation: FoodDescScreenNavProp;
};

type PhotoProps = {
  photo: Photo;
};

const FoodDesc = ({ route, navigation }: Prop) => {
  // State for related
  const [related, setRelated] = useState<FoodType[]>([
    {
      id: 1,
      title: "Kadaknath chicken",
      subtitle: "(without skin)",
      price: 184,
      img: food,
      stars: 4,
      reviews: 150,
      rating: 4.9,
    },
    {
      id: 2,
      title: "Kadaknath chicken",
      subtitle: "(without skin)",
      price: 184,
      img: food,
      stars: 4,
      reviews: 150,
      rating: 4.9,
    },
  ]);

  // State for photo
  const [photos, setPhotos] = useState<Photo[]>([
    {
      id: 1,
      img: chicken,
    },
    {
      id: 2,
      img: chicken,
    },
    {
      id: 3,
      img: chicken,
    },
    {
      id: 4,
      img: chicken,
    },
    {
      id: 5,
      img: chicken,
    },
  ]);

  let defaultWeight = 500;
  let defaultPrice = 184;

  // State for cart popup
  const [showCart, setCart] = useState<boolean>(false);

  // State for cart items
  const [cartItems, setCartItems] = useState<CartItem[] | null>([
    {
      id: 1,
      title: "Chicken drumstick",
      subtitle: "(without skin)",
      price: 184,
      weight: 500,
      quantity: 1,
    },
    {
      id: 2,
      title: "Chicken drumstick",
      subtitle: "(without skin)",
      price: 184,
      weight: 500,
      quantity: 1,
    },
    {
      id: 3,
      title: "Chicken drumstick",
      subtitle: "(without skin)",
      price: 184,
      weight: 500,
      quantity: 1,
    },
    {
      id: 4,
      title: "Chicken drumstick",
      subtitle: "(without skin)",
      price: 184,
      weight: 500,
      quantity: 1,
    },
    {
      id: 5,
      title: "Chicken drumstick",
      subtitle: "(without skin)",
      price: 184,
      weight: 500,
      quantity: 1,
    },
  ]);

  // State for weight
  const [weight, setWeight] = useState<number>(defaultWeight);

  // State for quantity counter
  const [quantity, setQuantity] = useState<number>(0);

  // State for price
  const [price, setPrice] = useState<number>(defaultPrice);

  const ref = useRef(null);

  // Function to increment the weight
  const increaseWeight = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
    setPrice(price * quantity);
  };

  // Function to decrement the weight
  const decreaseWeight = () => {
    setQuantity(prevQuantity => (prevQuantity > 0 ? prevQuantity - 1 : 0));
    setPrice(price * quantity);
  };

  // Function to control weight
  const ctrlWeight = (wt: string) => {
    let multiplePrice = 0;
    const newWt = parseInt(wt.split("g")[0]);
    if (newWt === defaultWeight) {
      setPrice(defaultPrice);
    } else {
      multiplePrice = newWt / defaultWeight;
      setPrice(defaultPrice * multiplePrice);
    }
    setWeight(newWt);
  };

  // Function to control quantity
  const ctrlQuantity = (qty: string) => {
    if (quantity === 0) {
      setPrice(defaultPrice);
    } else {
      setPrice(price * parseInt(qty));
    }
  };

  // Photo component
  const PhotoItem = ({ photo }: PhotoProps) => {
    return (
      <Pressable style={{ marginRight: 10 }}>
        <Image source={photo.img} />
      </Pressable>
    );
  };

  return (
    <ScrollView>
      {/* Backdrop for modal */}
      {/* Cart modal */}
      <Modal
        animationType="slide"
        visible={showCart}
        transparent={true}
        statusBarTranslucent
      >
        <Pressable style={style.modalContain}>
          <View style={style.cartContain}>
            <ScrollView style={style.cartSection}>
              {cartItems &&
                cartItems.map(item => (
                  <View key={item.id} style={[utilStyle.card, style.cartItem]}>
                    <View>
                      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                        {item.title} {item?.subtitle}
                      </Text>
                      <View style={{ display: "flex", flexDirection: "row" }}>
                        <Text
                          style={{ color: primaryColor, fontWeight: "bold" }}
                        >
                          ₹ {item.price.toString()}.00
                        </Text>
                        <Text
                          style={{ color: primaryColor, fontWeight: "bold" }}
                        >
                          / {item.weight.toString()}gm
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
                            value={item.quantity.toString()}
                            keyboardType="numeric"
                          />
                          <Pressable style={style.btn}>
                            <Text>+</Text>
                          </Pressable>
                        </View>
                      </View>
                    </View>
                    <Pressable>
                      <MaterialIcons
                        name="delete-outline"
                        color={darkColor}
                        size={25}
                      />
                    </Pressable>
                  </View>
                ))}
            </ScrollView>
            <View style={[utilStyle.card, style.cartFooter]}>
              <View>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>₹ 423</Text>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>Total</Text>
              </View>
              <Pressable
                style={style.paymentBtn}
                onPress={() => navigation.navigate("OrderLoading")}
              >
                <Text style={{ color: lightColor }}>Proceed to payment</Text>
              </Pressable>
            </View>

            <View style={style.topContent}>
              <Pressable
                style={style.closeCartBtn}
                onPress={() => setCart(false)}
              >
                <AntDesign name="close" color={darkColor} size={25} />
              </Pressable>
              <Pressable onPress={() => navigation.navigate("Promo")}>
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
        </Pressable>
      </Modal>
      <View style={utilStyle.container}>
        <View style={style.mainHeader}>
          <View style={style.imgContain}>
            <Image source={food} style={style.foodImg} />
          </View>
          <View style={style.foodContent}>
            <View>
              <Text style={style.title}>Chicken Drumstick</Text>
              <Text style={style.subTitle}>(without skin)</Text>
              <View style={style.ratings}>
                <Text
                  style={{
                    fontSize: 15,
                    color: secondaryColor,
                    fontWeight: "bold",
                  }}
                >
                  4.3
                </Text>
                <View style={style.ratingsContain}>
                  <MaterialIcons name="star" size={15} color={primaryColor} />
                  <MaterialIcons name="star" size={15} color={primaryColor} />
                  <MaterialIcons name="star" size={15} color={primaryColor} />
                  <MaterialIcons name="star" size={15} color={primaryColor} />
                  <MaterialIcons name="star" size={15} color={secondaryColor} />
                </View>
              </View>
              <Text style={style.description}>
                Half a chicken with medium-sized pieces including one leg, a
                wing, one breast with half backbone. A bone-in meat, ideal to
                deliver a taste of soft and relatively tougher meat all packed
                in one dish.
              </Text>
            </View>

            <View style={style.bottomContent}>
              <View style={style.controls}>
                <View style={style.control}>
                  <Text style={style.label}>Weight</Text>
                  <View>
                    <Picker
                      selectedValue={weight.toString()}
                      onValueChange={value => ctrlWeight(value)}
                      style={[utilStyle.card, style.weightInput]}
                    >
                      <Picker.Item label="500g" value="500g" />
                      <Picker.Item label="1000g" value="1000g" />
                      <Picker.Item label="1500g" value="1500g" />
                      <Picker.Item label="2000g" value="2000g" />
                    </Picker>
                  </View>
                </View>
                <View style={style.control}>
                  <Text style={style.label}>Quantity</Text>
                  <View style={[utilStyle.card, style.quantityCtrl]}>
                    <Pressable
                      onPress={() => decreaseWeight()}
                      style={{
                        paddingHorizontal: 15,
                        height: 30,
                      }}
                      android_ripple={{
                        color: secondaryColor,
                        borderless: true,
                      }}
                    >
                      <Text style={style.quantityBtn}>-</Text>
                    </Pressable>
                    <TextInput
                      keyboardType="numeric"
                      value={quantity.toString()}
                      style={style.quantityField}
                      onChangeText={qty => ctrlQuantity(qty)}
                    />
                    <Pressable
                      onPress={() => increaseWeight()}
                      style={{
                        paddingHorizontal: 15,
                        height: 30,
                      }}
                      android_ripple={{
                        color: secondaryColor,
                        borderless: true,
                      }}
                    >
                      <Text style={style.quantityBtn}>+</Text>
                    </Pressable>
                  </View>
                </View>
              </View>

              <View style={[utilStyle.card, style.cartBtnContain]}>
                <Text>
                  <Text style={{ fontSize: 17, color: medColor }}>
                    ₹{price.toString()}.00/
                  </Text>
                  <Text style={{ color: medColor }}>{weight.toString()}g</Text>
                </Text>
                <Pressable style={style.cartBtn} onPress={() => setCart(true)}>
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: "bold",
                      marginRight: 10,
                      color: quantity > 0 ? primaryColor : secondaryColor,
                    }}
                  >
                    Add to cart
                  </Text>
                  <MaterialCommunityIcons
                    name="cart-outline"
                    color={quantity > 0 ? primaryColor : secondaryColor}
                    size={17}
                  />
                </Pressable>
              </View>

              <View style={style.sideContent}>
                <View style={[utilStyle.card, style.btn, { marginBottom: 10 }]}>
                  <FontAwesome name="heart-o" color={primaryColor} size={15} />
                </View>
                <View style={[utilStyle.card, style.btn]}>
                  <Entypo name="share" color={primaryColor} size={15} />
                </View>
              </View>

              <Pressable
                style={[style.closeBtn]}
                android_ripple={{ color: secondaryColor, borderless: true }}
                onPress={() => navigation.goBack()}
              >
                <AntDesign name="close" color={darkColor} size={20} />
              </Pressable>
            </View>
          </View>
        </View>

        {/* Photos */}
        <View style={utilStyle.mt1}>
          <Text style={utilStyle.head}>Photos</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {photos &&
              photos.map(photo => <PhotoItem key={photo.id} photo={photo} />)}
          </ScrollView>
        </View>

        {/* Related */}
        <View style={utilStyle.mt1}>
          <Text style={utilStyle.head}>More like this</Text>
          <View style={style.relatedContain}>
            {related &&
              related.map(relFood => (
                <Food
                  key={relFood.id}
                  navigation={navigation}
                  food={relFood}
                  updatePage
                />
              ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  mainHeader: {
    marginTop: 30,
    position: "relative",
  },
  imgContain: {
    paddingTop: 25,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  foodContent: {
    marginTop: 10,
  },
  foodImg: {
    height: 200,
    width: 200,
  },
  title: {
    fontWeight: "bold",
    fontSize: 25,
  },
  subTitle: {
    fontSize: 19,
  },
  ratings: {
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  ratingsContain: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 10,
  },
  description: {
    marginTop: 20,
    fontSize: 16,
    color: medColor,
  },
  closeBtn: {
    position: "absolute",
    top: "-280%",
    // left: 15,
  },
  bottomContent: {
    marginTop: 40,
  },
  controls: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  weightInput: {
    width: 100,
    borderRadius: 100 / 2,
  },
  quantityCtrl: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    width: 150,
    padding: 0,
    paddingVertical: 10,
  },
  quantityBtn: {
    fontSize: 25,
  },
  quantityField: {
    width: "40%",
    textAlign: "center",
    borderLeftWidth: 1,
    borderLeftColor: secondaryColor,
    borderRightWidth: 1,
    borderRightColor: secondaryColor,
    fontWeight: "bold",
  },
  control: {
    display: "flex",
    alignItems: "center",
  },
  label: {
    fontWeight: "bold",
    paddingBottom: 5,
    fontSize: 15,
  },
  cartBtnContain: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 0,
    paddingHorizontal: 15,
  },
  cartBtn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  sideContent: {
    position: "absolute",
    bottom: "310%",
    right: 0,
  },
  btn: {
    borderRadius: 100 / 2,
  },
  relatedContain: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalContain: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
    // paddingHorizontal: 15,
    position: "relative",
  },
  cartContain: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    height: "90%",
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
  },
  cartSection: {
    marginTop: 50,
    paddingHorizontal: 15,
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
  closeCartBtn: {
    // position: "absolute",
    // top: 10,
    // left: 10,
  },
  backdrop: {
    display: "none",
    zIndex: 10,
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});

export default FoodDesc;
