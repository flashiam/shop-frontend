import React, { useState, useRef, useCallback } from "react";
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
} from "react-native";
import utilStyle from "../../styles/utilStyle";
import { primaryColor, lightColor, darkColor } from "../../styles/_variables";
import {
  AntDesign,
  Ionicons,
  EvilIcons,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";

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
import { TouchableOpacity } from "react-native-gesture-handler";

// Slider width of the carousel
const SliderWidth = Dimensions.get("window").width - 450;

const HomeMobo = ({ navigation }: { navigation: any }) => {
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

  interface Food {
    id: number;
    title: string;
    price: number;
    img: string;
    rating: number;
    stars: number;
    reviews: number;
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
  const [suggested, setSuggested] = useState<Food[]>([
    {
      id: 1,
      title: "Mix Veg",
      rating: 4.9,
      stars: 4,
      price: 599,
      reviews: 150,
      img: suggestFood,
    },
    {
      id: 2,
      title: "Mix Veg",
      rating: 4.9,
      stars: 4,
      price: 599,
      reviews: 150,
      img: suggestFood,
    },
  ]);

  // State for showcase food
  const [foods, setFoods] = useState<Food[] | null>([
    {
      id: 1,
      title: "Mix Veg",
      price: 599,
      reviews: 150,
      rating: 4.9,
      stars: 4,
      img: foodImg,
    },
    {
      id: 2,
      title: "Mix Veg",
      price: 599,
      reviews: 150,
      rating: 3.9,
      stars: 3,
      img: foodImg,
    },
    {
      id: 3,
      title: "Mix Veg",
      price: 599,
      reviews: 150,
      rating: 3.9,
      stars: 3,
      img: foodImg,
    },
    {
      id: 4,
      title: "Mix Veg",
      price: 599,
      reviews: 150,
      rating: 3.9,
      stars: 3,
      img: foodImg,
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

  const ref = useRef(null);
  const drawer = useRef<any>(null);

  // const [drawer, setDrawer] = useState<any>();

  // const refDrawer = useCallback(el => {
  //   setDrawer(el);
  // }, []);

  type CatProps = {
    cat: Category;
  };

  // Function to open drawer
  // const openDrawer = () => {
  //   if (drawer) {
  //     drawer.current.openDrawer();
  //   }
  // };

  // Category item
  const CatItem = ({ cat }: CatProps) => {
    return (
      <View style={style.catContain}>
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
  const OfferItem = () => {
    return (
      <View style={{ width: 300, marginRight: 10 }}>
        <Pressable onPress={() => console.log("Show offers")}>
          <Image style={style.offerImg} source={offerImg1} />
        </Pressable>
      </View>
    );
  };

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      renderNavigationView={() => (
        <Drawer drawer={drawer} navigation={navigation} />
      )}
      drawerPosition="right"
      drawerWidth={300}
    >
      <ScrollView>
        <View style={[utilStyle.container, style.container]}>
          {/* Navbar */}
          <View style={style.nav}>
            {/* Access location */}
            <Pressable onPress={() => console.log("location")}>
              <View style={style.leftContent}>
                <Ionicons
                  name="location-outline"
                  size={30}
                  color={secondaryColor}
                  style={style.locateIcon}
                />
                <View>
                  <Text
                    style={[
                      style.locationTxt,
                      { fontWeight: "bold", fontSize: 18 },
                    ]}
                  >
                    Bhopal
                  </Text>
                  <Text style={style.locationTxt}>
                    10 no. market near arera colony...
                  </Text>
                </View>
              </View>
            </Pressable>
            {/* Navbar btn */}
            <Pressable
              onPress={() => drawer?.current.openDrawer()}
              // android_ripple={{
              //   color: secondaryColor,
              //   borderless: true,
              // }}
            >
              <EvilIcons name="navicon" size={35} color="red" />
            </Pressable>
          </View>
          <View style={[utilStyle.card, style.searchBar]}>
            <AntDesign name="search1" size={24} color={primaryColor} />
            <TextInput
              style={style.searchInput}
              placeholder="Search for products"
            />
          </View>

          <View style={style.offersContain}>
            <ScrollView
              style={{ width: SliderWidth }}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToOffsets={[0, 300]}
            >
              {offers && offers.map(offer => <OfferItem key={offer.id} />)}
            </ScrollView>
          </View>

          <View style={utilStyle.mt1}>
            <Text style={utilStyle.head}>Categories</Text>
            <ScrollView
              style={{ width: SliderWidth }}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {categories &&
                categories.map(cat => <CatItem key={cat.id} cat={cat} />)}
            </ScrollView>
          </View>

          {/* Todays deal */}
          <View style={utilStyle.mt1}>
            <Text style={[utilStyle.head]}>Today's deal</Text>

            <ScrollView
              style={{ width: SliderWidth }}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {foods &&
                foods.map(food => (
                  <Food
                    key={food.id}
                    navigation={navigation}
                    food={food}
                    mr={20}
                  />
                ))}
            </ScrollView>
          </View>

          {/* Most selling */}
          <View style={utilStyle.mt1}>
            <Text style={utilStyle.head}>Most Selling</Text>

            <ScrollView
              style={{ width: SliderWidth }}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {foods &&
                foods.map(food => (
                  <Food
                    key={food.id}
                    navigation={navigation}
                    food={food}
                    mr={20}
                  />
                ))}
            </ScrollView>
          </View>

          {/* Suggested */}
          <View style={utilStyle.mt1}>
            <Text style={utilStyle.head}>Suggested</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {suggested &&
                suggested.map(food => <FoodWide key={food.id} food={food} />)}
            </ScrollView>
          </View>

          {/* Offers */}
          <View style={utilStyle.mt1}>
            <Text style={utilStyle.head}>Offers</Text>
            <ScrollView
              style={{ width: SliderWidth }}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToOffsets={[100, 300]}
            >
              {offers && offers.map(offer => <OfferItem key={offer.id} />)}
            </ScrollView>
          </View>

          {/* Special recipies */}
          <View style={utilStyle.mt1}>
            <Text style={utilStyle.head}>Special Recipies</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              // snapToOffsets={[50, 200]}
            >
              {recipes &&
                recipes.map(recipe => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
            </ScrollView>
          </View>

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
    </DrawerLayoutAndroid>
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
    paddingTop: 10,
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
  locateIcon: {
    fontSize: 30,
  },
  searchBar: {
    marginTop: 20,
    position: "relative",
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
  },
  searchInput: {
    marginLeft: 20,
  },
  offersContain: {
    marginTop: 15,
  },
  offerImg: {
    height: 150,
    width: 300,
    borderRadius: 10,
    marginRight: 10,
  },
  catContain: {
    marginRight: 5,
    backgroundColor: "transparent",
    width: 90,
  },
  category: {
    borderRadius: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: lightColor,
    marginRight: 10,
    position: "relative",
  },
  catImg: {
    height: 40,
    width: 40,
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
});

export default HomeMobo;
