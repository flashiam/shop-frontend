import React, { useState, useEffect, useRef, useReducer } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
  Dimensions,
  // Modal,
  ActivityIndicator,
  Share,
  Platform,
  Animated,
  Easing,
} from "react-native";
import Modal from "react-native-modal";
import PropTypes from "prop-types";
import "@expo/match-media";
import { useMediaQuery } from "react-responsive";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { Picker } from "native-base";
import DrawerLayout from "react-native-drawer-layout";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
import { connect } from "react-redux";

import { fetchOrderId } from "../../actions/paymentActions";
import { addCartItem, getCartNo } from "../../actions/foodActions";

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
  Octicons,
  Feather,
} from "@expo/vector-icons";
import { RootStackParamList, FoodType } from "../../App";

import food from "../../img/indian_food_1.png";
import chicken from "../../img/chicken.png";

import Food from "../foodComponents/Food";
import NavbarWeb from "../web/NavbarWeb";
import Drawer from "../layout/Drawer";
import NavbarMobo from "../mobo/NavbarMobo";

const SliderWidth = Dimensions.get("window").width - 450;

interface Photo {
  id: number;
  img: string;
}

interface CartItem {
  id: number;
  title: string;
  subtitle?: string;
  price: number;
  quantity: number;
  weight: number;
}

interface PickerValue {
  label: string;
  value: string;
}

interface CartData {
  quantity: number;
  price: number;
}

// Type checking
type FoodDescScreenNavProp = StackNavigationProp<RootStackParamList, "Food">;
type FoodDescScreenRouteProp = RouteProp<RootStackParamList, "Food">;

type Prop = {
  route: FoodDescScreenRouteProp;
  navigation: FoodDescScreenNavProp;
  fetchOrderId: Function;
  addCartItem: Function;
  getCartNo: Function;
  payment: { orderId: number | null; orderLoading: boolean };
  user: { userRegistered: boolean };
};

type PhotoProps = {
  photo: Photo;
  marginStyle?: any;
};

const FoodDesc = ({
  route,
  navigation,
  payment: { orderId, orderLoading },
  user: { userRegistered },
  fetchOrderId,
  addCartItem,
  getCartNo,
}: Prop) => {
  // Media query
  const phoneOrTablets = useMediaQuery({ maxDeviceWidth: 768 });
  const [mainFood] = useState<FoodType>(route.params.food);
  const {
    id,
    title,
    subtitle,
    price: foodPrice,
    desc,
    img,
    rating,
    stars,
    reviews,
  } = mainFood;

  // State for the orderId
  // const [orderId, setOrderId] = useState<number | null>(null);

  // State for related
  const [related, setRelated] = useState<FoodType[]>([
    {
      id: 1,
      title: "Kadaknath chicken",
      subtitle: "(without skin)",
      price: 344,
      img: food,
      stars: 4,
      reviews: 350,
      rating: 4.9,
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit, earum sint dicta soluta odio aperiam assumenda obcaecati laudantium culpa? Laborum, tempore quae provident illum cumque similique nam magni voluptas sapiente?",
    },
    {
      id: 2,
      title: "Murg mussalam",
      price: 900,
      img: food,
      stars: 4,
      reviews: 100,
      rating: 4.9,
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit, earum sint dicta soluta odio aperiam assumenda obcaecati laudantium culpa? Laborum, tempore quae provident illum cumque similique nam magni voluptas sapiente?",
    },
    {
      id: 3,
      title: "Chicken wings",
      price: 154,
      img: food,
      stars: 2,
      reviews: 250,
      rating: 2.9,
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit, earum sint dicta soluta odio aperiam assumenda obcaecati laudantium culpa? Laborum, tempore quae provident illum cumque similique nam magni voluptas sapiente?",
    },
    {
      id: 4,
      title: "Chicken lolipop",
      price: 499,
      img: food,
      stars: 3,
      reviews: 50,
      rating: 3.9,
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit, earum sint dicta soluta odio aperiam assumenda obcaecati laudantium culpa? Laborum, tempore quae provident illum cumque similique nam magni voluptas sapiente?",
    },
    {
      id: 5,
      title: "Chicken breasts",
      price: 999,
      img: food,
      stars: 3,
      reviews: 50,
      rating: 3.9,
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit, earum sint dicta soluta odio aperiam assumenda obcaecati laudantium culpa? Laborum, tempore quae provident illum cumque similique nam magni voluptas sapiente?",
    },
    {
      id: 6,
      title: "Chicken with skin",
      price: 999,
      img: food,
      stars: 3,
      reviews: 50,
      rating: 3.9,
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit, earum sint dicta soluta odio aperiam assumenda obcaecati laudantium culpa? Laborum, tempore quae provident illum cumque similique nam magni voluptas sapiente?",
    },
    {
      id: 7,
      title: "Fish (whole)",
      price: 999,
      img: food,
      stars: 3,
      reviews: 50,
      rating: 3.9,
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit, earum sint dicta soluta odio aperiam assumenda obcaecati laudantium culpa? Laborum, tempore quae provident illum cumque similique nam magni voluptas sapiente?",
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
  let defaultPrice = foodPrice;
  const drawer = useRef<any>(null);
  const cartAnim = useRef(new Animated.Value(1)).current;
  const cartSlideAnim = useRef(new Animated.Value(100)).current;
  const cartTranslateX = useRef(new Animated.Value(0)).current;

  const qty = useRef<number>(0);

  // State for cart popup
  const [showCart, setCart] = useState<boolean>(false);

  // State for cart items
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // State for weight
  const [weight, setWeight] = useState<number>(defaultWeight);

  // State for quantity counter
  const [quantity, setQuantity] = useState<number>(1);

  // State for price
  const [price, setPrice] = useState<number>(defaultPrice);

  // State for price
  const [updatedPrice, setUpdatedPrice] = useState<number>(1);

  const [itemData, setItemData] = useState<any>({
    itemQty: 1,
    itemPrice: defaultPrice,
  });

  // State for price track
  const [priceTrack, setPriceTrack] = useState<number[]>([]);

  // State for cart status
  const [itemAdded, setCartStatus] = useState<boolean>(false);

  // State for cart data
  const [cartData, setCartData] = useState<CartData>({ quantity: 0, price: 0 });

  // State for status loading
  const [statusLoading, setStatusLoading] = useState<boolean>(true);

  // State for cart item
  const [totalCartItems, setTotalCart] = useState<number>(0);

  // State for cart message
  const [isCartMsgShowing, setCartMsg] = useState<boolean>(false);

  // State for favourite
  const [favorite, setFavorite] = useState<boolean>(false);

  // State for default margin
  const [defaultMargin] = useState<number>(18);

  // Function to share the food
  const shareFood = async () => {
    try {
      const res = await Share.share({
        title: `Share Food`,
        message: `Try this awesome and delicious ${title} from fresh fred https://www.fresh-fred.com/Food/${id}`,
      });

      if (res.action === Share.sharedAction) {
        console.log("Food suggested");
      } else {
        console.log("Food not suggested");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // const increasePrice = () => {
  //   if (quantity >= 1) {
  //     setPrice(parseInt((price * quantity).toFixed(2)));
  //   }
  // };

  // const decreasePrice = () => {
  //   if (quantity === 2) {
  //     setPrice(defaultPrice);
  //     ctrlWeight(weight.toString());
  //   } else {
  //     setPrice(parseInt((price / quantity).toFixed(2)));
  //   }
  // };

  // Function to increase the quantity
  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
    // console.log(quantity);
    // increasePrice();
    setPrice(parseInt((price * quantity).toFixed(2)));

    // console.log(qty.current);
  };

  // Function to decrement the weight
  const decreaseQuantity = () => {
    setQuantity(prevQuantity => (prevQuantity === 1 ? 1 : prevQuantity - 1));
    // decreasePrice();
    if (quantity === 1) {
      setPrice(defaultPrice);
      ctrlWeight(weight.toString());
    } else {
      setPrice(parseInt((price / quantity).toFixed(2)));
    }
  };

  // Function to control weight
  const ctrlWeight = (wt: string) => {
    let multiplePrice = 0;
    const newWt = parseInt(wt);
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
    setPrice(price * quantity);
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

  // Function to check the cart
  const checkCart = async () => {
    try {
      const storedItems = await AsyncStorage.getItem("cart-items");

      if (!storedItems) {
        setTotalCart(0);
      } else {
        setTotalCart(1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Function to add the cart item
  const makeCartItem = (
    id: number,
    title: string,
    subTitle?: string,
    cweight: number,
    cprice: number,
    cquantity: number
  ) => {
    // Create a cart item
    const newCartItem = {
      id,
      title,
      subTitle: subTitle ? subTitle : "",
      price: cprice,
      quantity: cquantity,
      weight: cweight,
    };

    setCartStatus(true);

    addCartItem(newCartItem);
    saveItem(newCartItem);
    // getCartNo();
    console.log(newCartItem);
  };

  // Function to save the cart item
  const saveItem = async (item: CartItem) => {
    let items;
    try {
      // Add to the state
      setCartItems([...cartItems, item]);
      // Save to the storage too
      const existingData = await AsyncStorage.getItem("cart-items");

      if (existingData) {
        items = JSON.parse(existingData);
      } else {
        items = [];
      }

      items.push(item);
      await AsyncStorage.setItem("cart-items", JSON.stringify(items));
      console.log("added to cart");
    } catch (err) {
      console.log(err);
    }
  };

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

      if (!storedItems) {
        popDown();
      } else {
        fetchDataFromCart();
      }
      console.log("item removed");

      // Enable the cart btn to add item
      setCartStatus(false);
    } catch (err) {
      console.log(err);
    }
  };

  // Function to auto close modal after checking condition
  const autoCloseCart = () => {
    if (cartItems.length > 0) {
      setCart(true);
    } else {
      setCart(false);
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
          initQuantity = parseInt(item.quantity) + quantity;
          initPrice = parseInt(item.price) + price;
        });

        // const isItemPresent = JSON.parse(savedItems).filter((item:CartItem) => item.id === id)

        // if(!isItemPresent) {
        //   setCartData({ quantity: quantity,price: foodPrice });
        // }
      } else {
        initQuantity = quantity;
        initPrice = foodPrice;
      }
      console.log(initQuantity, initPrice);
      setCartData({ quantity: initQuantity, price: initPrice });
    } catch (err) {
      console.log(err);
    }
  };

  // Function to check the cart item status and maniputate the cart according to that
  const checkCartStatus = async (id: number) => {
    try {
      const storedItems = await AsyncStorage.getItem("cart-items");

      if (storedItems) {
        const itemExists = JSON.parse(storedItems).filter(
          (item: CartItem) => item.id === id
        );
        if (itemExists.length > 0) {
          // Item present in the storage
          setCartStatus(true);
        } else {
          // Item is not present
          setCartStatus(false);
        }
      }

      setStatusLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  // Function to run when user proceeds for payment
  const onProceedPayment = () => {
    navigation.navigate("OrderLoading");
    setCart(false);
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

  // Function to get total price from the cart
  // const fetchTotalPrice = async () => {
  //   try {
  //     const savedItems = AsyncStorage.getItem('cart-items');
  //     if(savedItems) {

  //     }
  //   } catch (err) {

  //   }
  // }

  // Function to pop up the cart message
  const popUp = () => {
    setCartMsg(true);
    Animated.timing(cartSlideAnim, {
      toValue: 0,
      duration: 500,
      easing: Easing.elastic(1),
      useNativeDriver: true,
    }).start();
  };

  const popDown = () => {
    setCartMsg(false);
    Animated.timing(cartSlideAnim, {
      toValue: 100,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  // Photo component
  const PhotoItem = ({ photo, marginStyle }: PhotoProps) => {
    return (
      <Pressable style={{ ...marginStyle }}>
        <Image source={photo.img} />
      </Pressable>
    );
  };

  // Cart popup component
  const CartPopUp = () => {
    return (
      // <Swipeable>
      <Animated.View
        style={[
          style.popUpContain,
          {
            transform: [{ translateY: cartSlideAnim }],
          },
        ]}
      >
        <View style={[utilStyle.card, style.popUpStyle]}>
          <View style={style.cartMsg}>
            <Text
              style={{
                color: lightColor,
                fontSize: 18,
                letterSpacing: 2,
                paddingBottom: 6,
                textTransform: "uppercase",
              }}
            >
              {cartData.quantity} Item
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
                ₹{cartData.price}{" "}
              </Text>
              <Text style={{ color: lightColor, fontSize: 12 }}>
                plus taxes
              </Text>
            </View>
          </View>
          <Pressable
            style={style.showCartBtn}
            onPress={() => {
              setCart(true);
            }}
          >
            <Text style={{ color: lightColor, fontSize: 20, paddingRight: 5 }}>
              View Cart
            </Text>
            <MaterialIcons name="arrow-right" color={lightColor} size={20} />
          </Pressable>
        </View>
      </Animated.View>
      // </Swipeable>
    );
  };

  const CartModal = () => {
    // Cart quantity
    const [cartQuantity, setCartQuantity] = useState<number>(quantity);

    // Function to increment cart quantity
    // const increaseCartQuantity = () => {

    // }

    return (
      <Modal
        isVisible={showCart}
        statusBarTranslucent
        style={{ margin: 0, position: "relative", bottom: 0, left: 0 }}
      >
        <View style={style.cartContain}>
          <ScrollView style={style.cartSection}>
            {cartItems &&
              cartItems.map(item => (
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
                  <Pressable
                    onPress={() => {
                      deleteItem(item?.id);
                      autoCloseCart();
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
          <View style={[utilStyle.card, style.cartFooter]}>
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

          <View style={style.topContent}>
            <Pressable onPress={() => setCart(false)}>
              <AntDesign name="close" color={darkColor} size={25} />
            </Pressable>
            <Pressable
              onPress={() => {
                setCart(false);
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
      </Modal>
    );
  };

  useEffect(() => {
    fetchCartItems();
    checkCartStatus(id);
    checkCart();
    fetchDataFromCart();
  }, []);

  return (
    // Comment out this view below to make the app compatible on the web temporary it is commented
    <View style={{ overflow: "hidden" }}>
      <DrawerLayout
        ref={drawer}
        renderNavigationView={() => (
          <Drawer drawer={drawer} navigation={navigation} />
        )}
        drawerPosition="right"
        drawerWidth={300}
        drawerBackgroundColor={lightColor}
        // style={{ alignItems: "center" }}
      >
        <ScrollView>
          {Platform.OS !== "web" && <CartModal />}
          <View style={[utilStyle.container]}>
            {Platform.OS === "web" &&
              (phoneOrTablets ? (
                <NavbarMobo drawer={drawer} />
              ) : (
                <NavbarWeb drawer={drawer} navigation={navigation} />
              ))}
            <View
              style={[
                style.mainHeader,
                {
                  flexDirection:
                    Platform.OS === "web"
                      ? phoneOrTablets
                        ? "column"
                        : "row"
                      : "column",
                },
              ]}
            >
              <View
                style={[
                  style.imgContain,
                  {
                    width:
                      Platform.OS === "web"
                        ? phoneOrTablets
                          ? "100%"
                          : "50%"
                        : "100%",
                  },
                ]}
              >
                <Image
                  source={img}
                  style={[
                    style.foodImg,
                    Platform.OS === "web"
                      ? phoneOrTablets
                        ? { height: 200, width: 200 }
                        : { height: 450, width: 450 }
                      : { height: 200, width: 200 },
                  ]}
                />
              </View>
              <View style={style.foodContent}>
                <View
                  style={{
                    width:
                      Platform.OS === "web"
                        ? phoneOrTablets
                          ? "100%"
                          : "25%"
                        : "100%",
                  }}
                >
                  <Text style={style.title}>{title}</Text>
                  {subtitle && <Text style={style.subTitle}>{subtitle}</Text>}
                  <View style={style.ratings}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: secondaryColor,
                        fontWeight: "bold",
                      }}
                    >
                      {rating}
                    </Text>
                    <View style={style.ratingsContain}>
                      {[1, 2, 3, 4, 5].map(star =>
                        star <= stars ? (
                          <MaterialIcons
                            key={star}
                            name="star"
                            size={15}
                            color={primaryColor}
                          />
                        ) : (
                          <MaterialIcons
                            key={star}
                            name="star"
                            size={15}
                            color={secondaryColor}
                          />
                        )
                      )}
                    </View>
                  </View>
                  <Text style={style.description}>{desc}</Text>
                </View>

                <View style={style.bottomContent}>
                  <View
                    style={[
                      style.controls,
                      {
                        width:
                          Platform.OS === "web"
                            ? phoneOrTablets
                              ? "100%"
                              : "25%"
                            : "100%",
                      },
                    ]}
                  >
                    <View style={style.control}>
                      <Text style={style.label}>Weight</Text>

                      <View
                        style={[
                          utilStyle.card,
                          { height: 50, borderRadius: 10 },
                        ]}
                      >
                        <Picker
                          note
                          mode="dropdown"
                          style={{ width: 120, borderWidth: 0 }}
                          selectedValue={weight}
                          onValueChange={value => ctrlWeight(value)}
                          itemStyle={{ backgroundColor: lightColor }}
                          placeholder="Select"
                        >
                          <Picker.Item label="500g" value="500" />
                          <Picker.Item label="1000g" value="1000" />
                          <Picker.Item label="1500g" value="1500" />
                          <Picker.Item label="2000g" value="2000" />
                        </Picker>
                      </View>
                    </View>
                    <View style={style.control}>
                      <Text style={style.label}>Quantity</Text>
                      <View style={[utilStyle.card, style.quantityCtrl]}>
                        <Pressable
                          onPress={() => {
                            decreaseQuantity();
                          }}
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
                          // onChangeText={qty => ctrlQuantity(qty)}
                        />
                        <Pressable
                          onPress={() => {
                            increaseQuantity();
                          }}
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

                  <View
                    style={[
                      utilStyle.card,
                      style.cartBtnContain,
                      {
                        width:
                          Platform.OS === "web"
                            ? phoneOrTablets
                              ? "100%"
                              : "25%"
                            : "100%",
                      },
                    ]}
                  >
                    <Text>
                      <Text style={{ fontSize: 17, color: medColor }}>
                        ₹{price.toString()}.00/
                      </Text>
                      <Text style={{ color: medColor }}>
                        {weight.toString()}g
                      </Text>
                    </Text>
                    {!itemAdded ? (
                      <Pressable
                        style={style.cartBtn}
                        onPress={() => {
                          if (userRegistered) {
                            fetchDataFromCart();
                            makeCartItem(
                              id,
                              title,
                              subtitle,
                              weight,
                              price,
                              quantity
                            );
                            popUp();
                          } else {
                            navigation.navigate("Login");
                          }
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 17,
                            fontWeight: "bold",
                            marginRight: 10,
                            color: primaryColor,
                          }}
                        >
                          Add to cart
                        </Text>
                        <MaterialCommunityIcons
                          name="cart-outline"
                          color={primaryColor}
                          size={17}
                        />
                      </Pressable>
                    ) : (
                      <Pressable
                        style={style.cartBtn}
                        onPress={() => setCart(true)}
                      >
                        <Text
                          style={{
                            fontSize: 17,
                            fontWeight: "bold",
                            marginRight: 10,
                            color: secondaryColor,
                          }}
                        >
                          Added to cart
                        </Text>
                        <Octicons
                          name="check"
                          color={secondaryColor}
                          size={17}
                        />
                      </Pressable>
                    )}
                  </View>

                  {/* <Pressable
                  style={[style.closeBtn]}
                  android_ripple={{ color: secondaryColor, borderless: true }}
                  onPress={() => navigation.goBack()}
                  >
                  <AntDesign name="close" color={darkColor} size={20} />
                </Pressable> */}
                </View>
              </View>
              <View style={style.sideContent}>
                <Pressable
                  style={[utilStyle.card, style.btn, { marginBottom: 10 }]}
                  onPress={() => setFavorite(() => !favorite)}
                >
                  <FontAwesome
                    name={favorite ? "heart" : "heart-o"}
                    color={primaryColor}
                    size={15}
                  />
                </Pressable>
                <Pressable
                  style={[utilStyle.card, style.btn]}
                  onPress={() => shareFood()}
                >
                  <Entypo name="share" color={primaryColor} size={15} />
                </Pressable>
              </View>
              <Pressable
                style={style.closeBtn}
                onPress={() => navigation.goBack()}
              >
                <MaterialIcons name="arrow-back" color={darkColor} size={30} />
              </Pressable>
            </View>
          </View>

          {/* Photos */}
          {Platform.OS !== "web" && (
            <View style={utilStyle.mt1}>
              <View style={utilStyle.container}>
                <Text style={utilStyle.head}>Photos</Text>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {photos &&
                  photos.map((photo, i) =>
                    i === 0 ? (
                      <PhotoItem
                        key={photo.id}
                        photo={photo}
                        marginStyle={{ marginHorizontal: defaultMargin }}
                      />
                    ) : (
                      <PhotoItem
                        key={photo.id}
                        photo={photo}
                        marginStyle={{ marginRight: defaultMargin }}
                      />
                    )
                  )}
              </ScrollView>
            </View>
          )}

          {/* Related */}
          {/* This above section is only for the mobile app */}
          {/* <View
          style={[
            utilStyle.mt1,
            Platform.OS === "web" && !phoneOrTablets && { marginTop: 55 },
          ]}
        >
          <View style={utilStyle.container}>
            <Text style={utilStyle.head}>More like this</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={
              [
                // style.scrollWidth,
                // {
                //   width:
                //     Platform.OS === "web"
                //       ? phoneOrTablets
                //         ? "90%"
                //         : "83%"
                //       : "90%",
                // },
              ]
            }
          >
            {related &&
              related.map((food, i) =>
                i === 0 ? (
                  <Food
                    key={food.id}
                    navigation={navigation}
                    food={food}
                    marginStyle={{ marginHorizontal: defaultMargin }}
                    updatePage
                  />
                ) : (
                  <Food
                    key={food.id}
                    navigation={navigation}
                    food={food}
                    marginStyle={{ marginRight: defaultMargin }}
                    updatePage
                  />
                )
              )}
          </ScrollView>
        </View> */}
          {/* This is specific for the web */}
          <View
            style={[
              utilStyle.mt1,
              Platform.OS === "web" && !phoneOrTablets && { marginTop: 55 },
            ]}
          >
            <View style={utilStyle.container}>
              <Text style={utilStyle.head}>More like this</Text>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={
                  [
                    // style.scrollWidth,
                    // {`5
                    //   width:
                    //     Platform.OS === "web"
                    //       ? phoneOrTablets
                    //         ? "90%"
                    //         : "83%"
                    //       : "90%",
                    // },
                  ]
                }
              >
                {related &&
                  related.map((food, i) =>
                    i === 0 ? (
                      <Food
                        key={food.id}
                        navigation={navigation}
                        food={food}
                        marginStyle={{ marginRight: defaultMargin }}
                        updatePage
                      />
                    ) : (
                      <Food
                        key={food.id}
                        navigation={navigation}
                        food={food}
                        marginStyle={{ marginRight: defaultMargin }}
                        updatePage
                      />
                    )
                  )}
              </ScrollView>
            </View>
          </View>
          {/* </View> */}
        </ScrollView>
        {/* Cart pop up */}
        {Platform.OS !== "web" && <CartPopUp />}
      </DrawerLayout>
    </View>
  );
};

const style = StyleSheet.create({
  mainHeader: {
    marginTop: Platform.OS === "web" ? 50 : 30,
    position: "relative",
    flexDirection: Platform.OS === "web" ? "row" : "column",
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
    // top: "-280%",
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
  weightContain: {
    position: "relative",
    width: 150,
    paddingVertical: 24,
    borderRadius: 10,
  },
  weightInput: {
    position: "absolute",
    zIndex: 2,
    // top: 0,
    // left: 0,
    // height: "100%",
    // width: "100%",
    // borderRadius: 100 / 2,
    // height: 50,
    // backgroundColor: lightColor,
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
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
    height: 20,
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
    // bottom: "310%",
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
    backgroundColor: "rgba(0,0,0,0.2)",
    // paddingHorizontal: 15,
    position: "relative",
  },
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
  cartMsg: {
    // flexDirection: "row",
    // alignItems: "center",
  },
  showCartBtn: {
    // padding: 10,
    borderRadius: 8,
    backgroundColor: primaryColor,
    flexDirection: "row",
    alignItems: "center",
  },
  scrollWidth: {
    // width: "83%",
    marginLeft: "auto",
    marginRight: "auto",
  },
});

// Prop types
FoodDesc.proptypes = {
  payment: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  fetchOrderId: PropTypes.func.isRequired,
};

// Function to map states to props
const mapStateToProps = (state: any) => ({
  payment: state.payment,
  user: state.user,
});

export default connect(mapStateToProps, {
  fetchOrderId,
  addCartItem,
  getCartNo,
})(FoodDesc);
