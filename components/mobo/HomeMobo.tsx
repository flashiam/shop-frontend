import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  Dimensions,
  Pressable,
  DrawerLayoutAndroid,
  StatusBar,
  Button,
  TouchableNativeFeedback,
  ActivityIndicator,
  // Modal,
} from "react-native";
import DrawerLayout from "react-native-drawer-layout";
import Modal from "react-native-modal";
import { connect } from "react-redux";

import utilStyle from "../../styles/utilStyle";
import {
  primaryColor,
  lightColor,
  darkColor,
  bgColor,
} from "../../styles/_variables";
import {
  AntDesign,
  Ionicons,
  EvilIcons,
  FontAwesome5,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchUserCredentials } from "../../actions/userActions";

import OfferItem from "../foodComponents/OfferItem";
import Food from "../foodComponents/Food";
import FoodWide from "../foodComponents/FoodWide";
import RecipeCard from "../foodComponents/RecipeCard";
import SvgComponent from "../layout/SvgComponent";
import Footer from "../layout/Footer";
import Drawer from "../layout/Drawer";

import offerImg1 from "../../img/food_coupons.jpg";
import offerImg2 from "../../img/food_coupons_2.jpg";
import suggestFood from "../../img/suggest_food.jpg";
import testAvatar from "../../img/test_avatar.jpg";
import playStore from "../../img/google-play-badge.png";
import appStore from "../../img/app-store-badge.png";
import foodImg from "../../img/indian_food_1.png";

import { medColor, secondaryColor } from "../../styles/_variables";

import { FoodType } from "../../App";

// Slider width of the carousel
const SliderWidth = Dimensions.get("window").width - 450;

type Props = {
  navigation: any;
  user: {
    tokens: any;
    userProfile: any;
    authLoading: boolean;
  };
  fetchUserCredentials: Function;
};

const HomeMobo = ({
  navigation,
  user: { userProfile, authLoading },
  fetchUserCredentials,
}: Props) => {
  interface Offer {
    id: number;
    img: string;
  }

  interface Category {
    id: number;
    title: string;
    img: string;
  }

  interface Recipe {
    id: number;
    name: string;
    date: string;
    title: string;
    desc: string;
    avatar: string;
  }

  interface Conclusion {
    id: number;
    title: string;
    msg: string;
  }

  // State for the offer carousel
  const [offers, setOffers] = useState<Offer[]>([
    {
      id: 1,
      img: offerImg1,
    },
    {
      id: 2,
      img: offerImg2,
    },
  ]);

  // State for the categories
  const [categories, setCategories] = useState<Category[]>([
    {
      id: 1,
      title: "Sushi",
      img: "https://img.icons8.com/color/96/000000/sushi.png",
    },
    {
      id: 2,
      title: "Fast Food",
      img: "https://img.icons8.com/fluent/96/000000/french-fries.png",
    },
    {
      id: 3,
      title: "Fruits",
      img: "https://img.icons8.com/fluent/96/000000/group-of-fruits.png",
    },
    {
      id: 4,
      title: "Sushi",
      img: "https://img.icons8.com/color/96/000000/sushi.png",
    },
    {
      id: 5,
      title: "Sushi",
      img: "https://img.icons8.com/color/96/000000/sushi.png",
    },
    {
      id: 6,
      title: "Sushi",
      img: "https://img.icons8.com/color/96/000000/sushi.png",
    },
  ]);

  // State for suggested foods
  const [suggested, setSuggested] = useState<FoodType[]>([
    {
      id: 1,
      title: "Raw chicken",
      rating: 2.9,
      stars: 3,
      price: 599,
      reviews: 150,
      img: suggestFood,
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit, earum sint dicta soluta odio aperiam assumenda obcaecati laudantium culpa? Laborum, tempore quae provident illum cumque similique nam magni voluptas sapiente?",
    },
    {
      id: 2,
      title: "Kadaknath",
      rating: 4.9,
      stars: 4,
      price: 599,
      reviews: 150,
      img: suggestFood,
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit, earum sint dicta soluta odio aperiam assumenda obcaecati laudantium culpa? Laborum, tempore quae provident illum cumque similique nam magni voluptas sapiente?",
    },
  ]);

  // State for showcase food
  const [foods, setFoods] = useState<FoodType[] | null>([
    {
      id: 1,
      title: "Tuna fish",
      price: 799,
      reviews: 150,
      rating: 4.9,
      stars: 4,
      img: foodImg,
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit, earum sint dicta soluta odio aperiam assumenda obcaecati laudantium culpa? Laborum, tempore quae provident illum cumque similique nam magni voluptas sapiente?",
    },
    {
      id: 2,
      title: "Mutton",
      price: 599,
      reviews: 150,
      rating: 3.9,
      stars: 3,
      img: foodImg,
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit, earum sint dicta soluta odio aperiam assumenda obcaecati laudantium culpa? Laborum, tempore quae provident illum cumque similique nam magni voluptas sapiente?",
    },
    {
      id: 3,
      title: "Chicken (Whole)",
      price: 599,
      reviews: 150,
      rating: 3.9,
      stars: 3,
      img: foodImg,
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit, earum sint dicta soluta odio aperiam assumenda obcaecati laudantium culpa? Laborum, tempore quae provident illum cumque similique nam magni voluptas sapiente?",
    },
    {
      id: 4,
      title: "Sea Prawns",
      price: 599,
      reviews: 150,
      rating: 3.9,
      stars: 3,
      img: foodImg,
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit, earum sint dicta soluta odio aperiam assumenda obcaecati laudantium culpa? Laborum, tempore quae provident illum cumque similique nam magni voluptas sapiente?",
    },
  ]);

  // State for the recipes
  const [recipes, setRecipes] = useState<Recipe[]>([
    {
      id: 1,
      name: "Fred",
      date: "January 25,2021",
      title: "How to follow a high protien diet plan with indian meals?",
      desc: "This specialised diet plan lives up to the spoiler in its nomenclature by asking you to do just that: flood your system with friendly...",
      avatar: testAvatar,
    },
    {
      id: 2,
      name: "Fred",
      date: "January 25,2021",
      title: "How to follow a high protien diet plan with indian meals?",
      desc: "This specialised diet plan lives up to the spoiler in its nomenclature by asking you to do just that: flood your system with friendly...",
      avatar: testAvatar,
    },
    {
      id: 3,
      name: "Fred",
      date: "January 25,2021",
      title: "How to follow a high protien diet plan with indian meals?",
      desc: "This specialised diet plan lives up to the spoiler in its nomenclature by asking you to do just that: flood your system with friendly...",
      avatar: testAvatar,
    },
    {
      id: 4,
      name: "Fred",
      date: "January 25,2021",
      title: "How to follow a high protien diet plan with indian meals?",
      desc: "This specialised diet plan lives up to the spoiler in its nomenclature by asking you to do just that: flood your system with friendly...",
      avatar: testAvatar,
    },
  ]);

  // State for conclusions
  const [conclusions, setConclusions] = useState<Conclusion[]>([
    {
      id: 1,
      title: "We only sell products that we eat ourselves..",
      msg: "At Freshfred, we are big carnivorous lovers. So when it comes to the range of meat/fish/chicken/ other products we put it on your plate, we are very choosy and each product is handpicked by an experienced team with years of experience.",
    },
    {
      id: 2,
      title:
        "You will only find what is fresh, if not fresh, we will not sell..",
      msg: "To keep all non-veg products fresh and hygienic with their natural juices, it is necessary to store them at temperatures between 0 ° and 5 ° C. Here at FreshFred we are committed and maintain all freshness and adherence to optimal hygiene standards. We maintain this temperature from the time of purchase until the product is cleaned, cut, stored, and delivered. You will find all of your ordered products chilled until it arrives at your doorstep. Don’t you think… it’s all about our true love for freshness and hygiene?",
    },
    {
      id: 3,
      title: "We only charge for the weight of the product delivered..",
      msg: "Do other people follow it? not necessarily. Most of the places get the weight of the meat first, then cutting it into pieces, they exclude fractions that are unfit to eat, such as offal, fat, gizzards, etc. In the end, what you are getting is 10% to 30% less product. It doesn’t matter that you paid for the whole.",
    },
  ]);

  // State for location modal
  const [openLocation, setLocationModal] = useState<boolean>(false);

  // State for the location
  const [address, setAddress] = useState<any>(null);

  // State for the loader in location
  const [locationLoading, setLocationLoading] = useState<boolean>(false);

  // State for the search keyword
  const [search, setSearch] = useState<string>("");

  const [defaultMargin] = useState<number>(18);

  const ref = useRef(null);
  const drawer = useRef<any>(null);

  // const isFocused = useIsFocused();

  type CatProps = {
    cat: Category;
    marginStyle: any;
  };

  // Category item
  const CatItem = ({ cat, marginStyle }: CatProps) => {
    return (
      <View style={[style.catContain, { ...marginStyle }]}>
        {/* <View style={{ borderRadius: 8, overflow: "hidden" }}> */}
        <Pressable
          style={[utilStyle.card, style.category]}
          onPress={() => navigation.navigate("Categories", { catid: cat.id })}
        >
          <Image
            style={[style.catImg, { borderRadius: 8 }]}
            source={{ uri: cat.img }}
          />
        </Pressable>
        {/* </View> */}
        <Text style={style.catTxt}>{cat.title}</Text>
      </View>
    );
  };

  // Offer item
  const OfferItem = ({ marginStyle }: any) => {
    return (
      <View style={{ width: 300, ...marginStyle }}>
        <Pressable onPress={() => console.log("Show offers")}>
          <Image style={style.offerImg} source={offerImg1} />
        </Pressable>
      </View>
    );
  };

  // Function to save the location to localstorage
  const saveAddress = async (address: any) => {
    try {
      await AsyncStorage.setItem("user-address", JSON.stringify(address));
      console.log("address saved");
    } catch (err) {
      console.log(err);
    }
  };

  // Function to get the location from the storage if it is saved
  const fetchAddress = async () => {
    try {
      const savedAddress = await AsyncStorage.getItem("user-address");
      if (savedAddress) return setAddress(JSON.parse(savedAddress));

      setAddress(null);
    } catch (err) {
      console.log(err);
    }
  };

  // Function to fetch the current location
  const getCurrentLocation = async () => {
    try {
      setLocationLoading(true);
      // Close the modal after location is fetched
      setLocationModal(false);

      let { status } = await Location.requestForegroundPermissionsAsync();

      // Checking permission status
      if (status !== "granted") {
        console.log("Permission denied");
      } else {
        const isServicesEnabled = await Location.hasServicesEnabledAsync();
        if (!isServicesEnabled)
          return console.log("Please enable the location");

        // If permission granted then fetch the location
        const currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        // Fetching current address through coordinates
        const currentAddress = await Location.reverseGeocodeAsync({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });

        // Set the current address
        setAddress(currentAddress);

        // Save the address also
        saveAddress(currentAddress);

        // Disable loading
        setLocationLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Function to delete the address
  const deleteAddress = async () => {
    try {
      await AsyncStorage.removeItem("user-address");
      setAddress(null);
      console.log("address deleted");
    } catch (err) {
      console.log(err);
    }
  };

  // Function to search for the product
  const searchTheProduct = (keyword: string) => {
    setSearch(keyword);
    // Redirect to the search page
    if (search !== "") {
      navigation.navigate("ProductSearch", { keyword: search });
    }
    // Clear the search
    setSearch("");
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  // Location modal currently for apps only
  const LocateModal = () => {
    return (
      <Modal
        onBackdropPress={() => setLocationModal(false)}
        onSwipeComplete={() => setLocationModal(false)}
        style={{
          position: "relative",
          padding: 0,
          margin: 0,
        }}
        isVisible={openLocation}
        swipeDirection="down"
      >
        <View style={style.locationContain}>
          <View style={style.locationHeader}>
            <Text style={{ fontSize: 18 }}>Select Location</Text>
            <Pressable onPress={() => setLocationModal(false)}>
              <AntDesign name="close" color={medColor} size={18} />
            </Pressable>
          </View>
          <View style={style.locationSection}>
            <Pressable
              style={style.currentLocationBtn}
              onPress={() => getCurrentLocation()}
            >
              <MaterialIcons
                name="my-location"
                color={primaryColor}
                size={18}
              />
              <Text
                style={{ color: primaryColor, marginLeft: 15, fontSize: 15 }}
              >
                Use current location
              </Text>
            </Pressable>
            <View style={style.savedAddressContain}>
              <Text style={{ fontSize: 16, paddingBottom: 10 }}>
                Saved Address
              </Text>
              {address && address[0] && (
                <View style={style.addressItem}>
                  <View style={style.addressLeftContent}>
                    <Entypo name="home" color={darkColor} size={18} />
                    <Text style={{ marginLeft: 15 }}>{address[0].city}</Text>
                  </View>
                  <Pressable onPress={() => deleteAddress()}>
                    <MaterialIcons
                      name="delete-outline"
                      color={primaryColor}
                      size={20}
                    />
                  </Pressable>
                </View>
              )}
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  if (authLoading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={primaryColor} />
      </View>
    );

  return (
    <DrawerLayout
      ref={drawer}
      renderNavigationView={() => (
        <Drawer drawer={drawer} navigation={navigation} />
      )}
      drawerBackgroundColor={lightColor}
      drawerPosition="right"
      drawerWidth={300}
    >
      <LocateModal />
      <ScrollView>
        <View style={[utilStyle.container]}>
          {/* Navbar */}
          <View style={style.nav}>
            {/* Access location */}
            <Pressable onPress={() => setLocationModal(true)}>
              <View style={style.leftContent}>
                {/* <View style={[utilStyle.card, style.locationBtn]}> */}
                <Ionicons
                  name="location-outline"
                  size={30}
                  color={primaryColor}
                />
                {/* </View> */}
                {locationLoading && locationLoading ? (
                  <View
                    style={{
                      marginLeft: 10,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ActivityIndicator color={primaryColor} />
                  </View>
                ) : (
                  address &&
                  address[0] && (
                    <View>
                      <Text
                        style={[
                          style.locationTxt,
                          { fontWeight: "bold", fontSize: 18 },
                        ]}
                      >
                        {address[0].city}
                      </Text>
                      <Text style={style.locationTxt}>
                        {address[0].name}, {address[0].district} -{" "}
                        {address[0].postalCode}
                      </Text>
                    </View>
                  )
                )}
              </View>
            </Pressable>
            {/* Navbar btn */}
            <Pressable onPress={() => drawer?.current.openDrawer()}>
              <EvilIcons name="navicon" size={35} color="red" />
            </Pressable>
          </View>
          <View style={[utilStyle.card, style.searchBar]}>
            <AntDesign name="search1" size={24} color={primaryColor} />
            <TextInput
              style={style.searchInput}
              placeholder="Search for products"
              value={search}
              onChange={e => setSearch(e.nativeEvent.text)}
              onSubmitEditing={() => searchTheProduct(search)}
            />
          </View>
        </View>

        <View style={utilStyle.containerBlock}>
          <View style={style.offersContain}>
            <ScrollView
              style={{
                width: SliderWidth,

                // justifyContent: "space-between",
              }}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToOffsets={[0, 300]}
            >
              {offers &&
                offers.map((offer, i) =>
                  i === 0 ? (
                    <OfferItem
                      key={offer.id}
                      marginStyle={{ marginHorizontal: defaultMargin }}
                    />
                  ) : (
                    <OfferItem
                      key={offer.id}
                      marginStyle={{ marginRight: defaultMargin }}
                    />
                  )
                )}
            </ScrollView>
          </View>
        </View>

        <View style={utilStyle.mt1}>
          <View style={utilStyle.container}>
            <Text style={utilStyle.head}>Categories</Text>
          </View>
          <ScrollView
            style={{ width: SliderWidth }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {categories &&
              categories.map((cat, i) =>
                i === 0 ? (
                  <CatItem
                    key={cat.id}
                    cat={cat}
                    marginStyle={{ marginHorizontal: defaultMargin }}
                  />
                ) : (
                  <CatItem
                    key={cat.id}
                    cat={cat}
                    marginStyle={{ marginRight: defaultMargin }}
                  />
                )
              )}
          </ScrollView>
        </View>

        {/* Todays deal */}
        <View style={utilStyle.mt1}>
          <View style={utilStyle.container}>
            <Text style={[utilStyle.head]}>Today's deal</Text>
          </View>

          <ScrollView
            style={{ width: SliderWidth }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {foods &&
              foods.map((food, i) =>
                i === 0 ? (
                  <Food
                    key={food.id}
                    navigation={navigation}
                    food={food}
                    marginStyle={{ marginHorizontal: defaultMargin }}
                  />
                ) : (
                  <Food
                    key={food.id}
                    navigation={navigation}
                    food={food}
                    marginStyle={{ marginRight: defaultMargin }}
                  />
                )
              )}
          </ScrollView>
        </View>

        {/* Most selling */}
        <View style={utilStyle.mt1}>
          <View style={utilStyle.container}>
            <Text style={[utilStyle.head]}>Most Selling</Text>
          </View>

          <ScrollView
            style={{ width: SliderWidth }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {foods &&
              foods.map((food, i) =>
                i === 0 ? (
                  <Food
                    key={food.id}
                    navigation={navigation}
                    food={food}
                    marginStyle={{ marginHorizontal: defaultMargin }}
                  />
                ) : (
                  <Food
                    key={food.id}
                    navigation={navigation}
                    food={food}
                    marginStyle={{ marginRight: defaultMargin }}
                  />
                )
              )}
          </ScrollView>
        </View>

        {/* Suggested */}
        <View style={utilStyle.mt1}>
          <View style={utilStyle.container}>
            <Text style={[utilStyle.head]}>Suggested</Text>
          </View>

          <ScrollView
            style={{ width: SliderWidth }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {foods &&
              foods.map((food, i) =>
                i === 0 ? (
                  <Food
                    key={food.id}
                    navigation={navigation}
                    food={food}
                    marginStyle={{ marginHorizontal: defaultMargin }}
                  />
                ) : (
                  <Food
                    key={food.id}
                    navigation={navigation}
                    food={food}
                    marginStyle={{ marginRight: defaultMargin }}
                  />
                )
              )}
          </ScrollView>
        </View>

        {/* Offers */}
        <View style={[utilStyle.mt1, utilStyle.containerBlock]}>
          <View style={style.offersContain}>
            <ScrollView
              style={{
                width: SliderWidth,

                // justifyContent: "space-between",
              }}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToOffsets={[0, 300]}
            >
              {offers &&
                offers.map((offer, i) =>
                  i === 0 ? (
                    <OfferItem
                      key={offer.id}
                      marginStyle={{ marginHorizontal: defaultMargin }}
                    />
                  ) : (
                    <OfferItem
                      key={offer.id}
                      marginStyle={{ marginRight: defaultMargin }}
                    />
                  )
                )}
            </ScrollView>
          </View>
        </View>

        {/* Special recipies */}
        <View style={utilStyle.mt1}>
          <View style={utilStyle.container}>
            <Text style={utilStyle.head}>Special Recipies</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            // snapToOffsets={[50, 200]}
          >
            {recipes &&
              recipes.map((recipe, i) =>
                i === 0 ? (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    marginStyle={{ marginHorizontal: defaultMargin }}
                  />
                ) : (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    marginStyle={{ marginRight: defaultMargin }}
                  />
                )
              )}
          </ScrollView>
        </View>

        <View style={[utilStyle.container, { marginBottom: 100 }]}>
          {/* Advertisment */}
          <View style={utilStyle.mt1}>
            <Text style={utilStyle.head}>Also available on</Text>
            <View style={style.advContain}>
              <Pressable>
                <View>
                  <Image style={style.advImg} source={playStore} />
                </View>
              </Pressable>
              <Pressable>
                <View>
                  <Image style={style.advImg} source={appStore} />
                </View>
              </Pressable>
            </View>
          </View>

          {/* Illustration */}
          <View
            style={
              (utilStyle.mt1,
              {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 5,
                alignContent: "center",
              })
            }
          >
            <SvgComponent />
          </View>

          {/* Why fresh fred */}
          <View style={utilStyle.mt1}>
            <Text style={style.concludeTxt}>Why Fresh Fred?</Text>
            {conclusions &&
              conclusions.map(conclusion => (
                <View
                  key={conclusion.id}
                  style={[utilStyle.card, style.concludeCard]}
                >
                  <Text style={style.concludeTitle}>{conclusion.title}</Text>
                  <Text style={style.concludeDesc}>{conclusion.msg}</Text>
                  <Text style={[style.apostrophe, style.leftApost]}>"</Text>
                  <Text style={[style.apostrophe, style.rightApost]}>"</Text>
                </View>
              ))}
          </View>
        </View>

        <Footer />
      </ScrollView>
    </DrawerLayout>
  );
};

const style = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    minHeight: "100%",
  },
  nav: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: StatusBar.currentHeight,
    paddingTop: 20,
    paddingBottom: 5,
  },
  leftContent: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  locationTxt: {
    color: secondaryColor,
    paddingLeft: 10,
  },
  locationBtn: {
    padding: 10,
    borderRadius: 8,
  },
  searchBar: {
    marginTop: 10,
    position: "relative",
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    padding: 10,
    marginBottom: 15,
  },
  searchInput: {
    marginLeft: 20,
  },
  offersContain: {
    // position: "absolute",
    // zIndex: 3,
    // marginRight: 5,
    marginTop: 15,
    // marginHorizontal: 10,
  },
  offerImg: {
    // position: "absolute",
    // paddingHorizontal: 10,
    height: 160,
    width: 300,
    left: 0,
    // zIndex: 2,
    borderRadius: 10,
    // marginLeft: 18,
    // marginRight: 18,
  },
  catContain: {
    marginRight: 18,
    backgroundColor: "transparent",
    width: 65,
  },
  category: {
    borderRadius: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: lightColor,
    // marginRight: 10,
    position: "relative",
  },
  catImg: {
    height: 30,
    width: 30,
  },
  catTxt: {
    textAlign: "center",
    color: medColor,
    marginTop: 6,
  },
  dealContain: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  advContain: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  advImg: {
    width: 155,
    height: 70,
    // marginVertical: 10,
  },
  concludeCard: {
    position: "relative",
    borderRadius: 10,
    marginTop: 25,
    zIndex: 2,
  },
  concludeTxt: {
    color: medColor,
    fontWeight: "bold",
    fontSize: 40,
    paddingBottom: 10,
    textAlign: "center",
  },
  concludeTitle: {
    fontWeight: "bold",
    fontSize: 16,
    paddingBottom: 5,
    color: darkColor,
  },
  concludeDesc: {
    color: medColor,
    fontSize: 15,
    paddingBottom: 20,
  },
  apostrophe: {
    fontWeight: "bold",
    fontSize: 60,
    color: secondaryColor,
    position: "absolute",
    top: -25,
    zIndex: 4,
  },
  leftApost: {
    left: 0,
  },
  rightApost: {
    right: 0,
  },
  // Nav
  navContain: {
    paddingTop: 120,
    margin: 0,
  },
  profileContain: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    marginLeft: 25,
  },
  profileAvatar: {
    height: 50,
    width: 50,
    borderRadius: 100 / 2,
  },
  profileDetails: {
    marginLeft: 15,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 25,
    paddingBottom: 3,
  },
  userEmail: {
    color: medColor,
  },
  navLinks: {
    marginTop: 50,
  },
  navLink: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 40,
    paddingVertical: 20,
  },
  linkTxt: {
    paddingLeft: 30,
    fontSize: 15,
    fontWeight: "700",
  },
  closeNavBtn: {
    position: "absolute",
    top: 50,
    right: 30,
  },
  locationContain: {
    backgroundColor: lightColor,
    paddingHorizontal: 15,
    paddingVertical: 20,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "50%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  locationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationSection: {
    marginTop: 50,
  },
  currentLocationBtn: {
    flexDirection: "row",
    alignItems: "center",
  },
  savedAddressContain: {
    marginTop: 25,
  },
  addressLeftContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  addressItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: bgColor,
  },
});

// Function to map state to props
const mapStateToProps = (state: any) => ({
  user: state.user,
});

export default connect(mapStateToProps, { fetchUserCredentials })(HomeMobo);
