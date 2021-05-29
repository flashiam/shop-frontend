import React, { useState, useRef } from "react";
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
} from "react-native";
import "@expo/match-media";
import { useMediaQuery } from "react-responsive";
import DrawerLayout from "react-native-drawer-layout";
import utilStyle from "../../styles/utilStyle";
import { primaryColor, lightColor, darkColor } from "../../styles/_variables";
import {
  AntDesign,
  Ionicons,
  EvilIcons,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";

// import OfferItem from "../foodComponents/OfferItem";
import Food from "../foodComponents/Food";
import FoodWide from "../foodComponents/FoodWide";
import RecipeCard from "../foodComponents/RecipeCard";
import SvgComponent from "../layout/SvgComponent";
import Footer from "../layout/Footer";
import NavbarWeb from "./NavbarWeb";
import NavbarMobo from "../mobo/NavbarMobo";
import Drawer from "../layout/Drawer";

import offerImg1 from "../../img/food_coupons.jpg";
import offerImg2 from "../../img/food_coupons_2.jpg";
import suggestFood from "../../img/suggest_food.jpg";
import testAvatar from "../../img/test_avatar.jpg";
import playStore from "../../img/google-play-badge.png";
import appStore from "../../img/app-store-badge.png";
import foodImg from "../../img/indian_food_1.png";
import adMockup from "../../img/ad-mockup.png";

import { FoodType } from "../../App";

import { medColor, secondaryColor } from "../../styles/_variables";

// Slider width of the carousel
const SliderWidth = Dimensions.get("window").width;

interface Category {
  id: number;
  title: string;
  img: string;
}

type CatProp = {
  cat: Category;
  marginStyle?: any;
};

type OfferProp = {
  imgStyle?: {
    height: number;
    width: number;
  };
  marginStyle: any;
};

const HomeWeb = ({ navigation }: { navigation: any }) => {
  interface Offer {
    id: number;
    img: string;
  }

  interface Suggested {
    id: number;
    title: string;
    img: string;
    rating: number;
    stars: number;
    reviews: number;
    price: number;
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

  // Media query
  const phoneOrTablets = useMediaQuery({ maxDeviceWidth: 768 });

  // Category item
  const CatItem = ({ cat, marginStyle }: CatProp) => {
    return (
      <View style={[style.catContain, { ...marginStyle }]}>
        <View style={{ borderRadius: 8, overflow: "hidden" }}>
          <Pressable
            android_ripple={{ color: secondaryColor }}
            style={[utilStyle.card, style.category]}
            onPress={() => navigation.navigate("Categories", { catid: cat.id })}
          >
            <Image
              style={[
                style.catImg,
                { borderRadius: 8 },
                phoneOrTablets
                  ? { height: 30, width: 30 }
                  : { height: 60, width: 60 },
              ]}
              source={{ uri: cat.img }}
            />
          </Pressable>
        </View>
        <Text style={style.catTxt}>{cat.title}</Text>
      </View>
    );
  };

  // Offer item
  const OfferItem = ({ imgStyle, marginStyle }: OfferProp) => {
    return (
      <View style={{ ...marginStyle }}>
        <Pressable onPress={() => console.log("Show offers")}>
          <Image
            style={[
              style.offerImg,
              phoneOrTablets
                ? { height: 160, width: 300 }
                : { height: 400, width: 1000 },
              imgStyle && { height: imgStyle.height, width: imgStyle.width },
            ]}
            source={offerImg1}
          />
        </Pressable>
      </View>
    );
  };

  const [drawerClosed, setDrawer] = useState<boolean>(true);
  const [defaultMargin] = useState<number>(18);

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
    {
      id: 3,
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
      id: 7,
      title: "Sushi",
      img: "https://img.icons8.com/color/96/000000/sushi.png",
    },
    {
      id: 8,
      title: "Sushi",
      img: "https://img.icons8.com/color/96/000000/sushi.png",
    },
    {
      id: 9,
      title: "Sushi",
      img: "https://img.icons8.com/color/96/000000/sushi.png",
    },
    {
      id: 10,
      title: "Sushi",
      img: "https://img.icons8.com/color/96/000000/sushi.png",
    },
  ]);

  // State for suggested foods
  const [suggested, setSuggested] = useState<Suggested[]>([
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
  const [foods, setFoods] = useState<FoodType[] | null>([
    {
      id: 1,
      title: "Mix Veg",
      price: 599,
      reviews: 150,
      rating: 4.9,
      stars: 4,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem placeat, reprehenderit aliquam vero soluta dolorem dolore, ipsa delectus a porro iusto, et perspiciatis unde similique veniam omnis quam reiciendis quibusdam?",
      img: foodImg,
    },
    {
      id: 2,
      title: "Mix Veg",
      price: 599,
      reviews: 150,
      rating: 3.9,
      stars: 3,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem placeat, reprehenderit aliquam vero soluta dolorem dolore, ipsa delectus a porro iusto, et perspiciatis unde similique veniam omnis quam reiciendis quibusdam?",
      img: foodImg,
    },
    {
      id: 3,
      title: "Mix Veg",
      price: 599,
      reviews: 150,
      rating: 3.9,
      stars: 3,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem placeat, reprehenderit aliquam vero soluta dolorem dolore, ipsa delectus a porro iusto, et perspiciatis unde similique veniam omnis quam reiciendis quibusdam?",
      img: foodImg,
    },
    {
      id: 4,
      title: "Mix Veg",
      price: 599,
      reviews: 150,
      rating: 3.9,
      stars: 3,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem placeat, reprehenderit aliquam vero soluta dolorem dolore, ipsa delectus a porro iusto, et perspiciatis unde similique veniam omnis quam reiciendis quibusdam?",
      img: foodImg,
    },
    {
      id: 5,
      title: "Mix Veg",
      price: 599,
      reviews: 150,
      rating: 3.9,
      stars: 3,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem placeat, reprehenderit aliquam vero soluta dolorem dolore, ipsa delectus a porro iusto, et perspiciatis unde similique veniam omnis quam reiciendis quibusdam?",
      img: foodImg,
    },
    {
      id: 6,
      title: "Mix Veg",
      price: 599,
      reviews: 150,
      rating: 3.9,
      stars: 3,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem placeat, reprehenderit aliquam vero soluta dolorem dolore, ipsa delectus a porro iusto, et perspiciatis unde similique veniam omnis quam reiciendis quibusdam?",
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
    {
      id: 5,
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

  const [drawerDisabled, setDrawerState] = useState<boolean>(true);

  const ref = useRef(null);
  const drawer = useRef<any>(null);

  return (
    <View style={{ overflow: "hidden" }}>
      <DrawerLayout
        ref={drawer}
        renderNavigationView={() => (
          <Drawer navigation={navigation} drawer={drawer} />
        )}
        drawerPosition="right"
        drawerWidth={300}
        drawerBackgroundColor={lightColor}
        style={{ overflow: "hidden" }}
        onDrawerOpen={() => setDrawerState(false)}
        onDrawerClose={() => setDrawerState(true)}
      >
        {/* <ScrollView> */}
        <View style={[utilStyle.container, style.container]}>
          {phoneOrTablets ? (
            <NavbarMobo drawer={drawer} />
          ) : (
            <NavbarWeb drawer={drawer} navigation={navigation} />
          )}
        </View>

        <View style={utilStyle.container}>
          <View style={[utilStyle.mt1]}>
            <ScrollView
              // style={style.scrollWidth}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToOffsets={[0, 300]}
            >
              {offers &&
                offers.map((offer, i) =>
                  i === 0 ? (
                    <OfferItem
                      key={offer.id}
                      marginStyle={{ marginRight: defaultMargin }}
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
            <ScrollView
              // style={style.scrollWidth}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {categories &&
                categories.map((category, i) =>
                  i === 0 ? (
                    <CatItem
                      key={category.id}
                      cat={category}
                      marginStyle={{ marginRight: defaultMargin }}
                    />
                  ) : (
                    <CatItem
                      key={category.id}
                      cat={category}
                      marginStyle={{ marginRight: defaultMargin }}
                    />
                  )
                )}
            </ScrollView>
          </View>
        </View>

        {/* Todays deal */}
        <View style={utilStyle.mt1}>
          <View style={utilStyle.container}>
            <Text style={[utilStyle.head]}>Today's deal</Text>

            <ScrollView
              // style={style.scrollWidth}
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
                      // mr={30}
                      marginStyle={{ marginRight: defaultMargin }}
                    />
                  ) : (
                    <Food
                      key={food.id}
                      navigation={navigation}
                      food={food}
                      // mr={30}
                      marginStyle={{ marginRight: defaultMargin }}
                    />
                  )
                )}
            </ScrollView>
          </View>
        </View>

        {/* Most selling */}
        <View style={[utilStyle.mt1]}>
          <View style={utilStyle.container}>
            <Text style={utilStyle.head}>Most Selling</Text>

            <ScrollView
              // style={style.scrollWidth}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              <View style={style.dealContain}>
                {foods &&
                  foods.map((food, i) =>
                    i === 0 ? (
                      <Food
                        key={food.id}
                        navigation={navigation}
                        food={food}
                        marginStyle={{ marginRight: defaultMargin }}
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
              </View>
            </ScrollView>
          </View>
        </View>

        {/* Suggested */}
        <View style={[utilStyle.mt1]}>
          <View style={utilStyle.container}>
            <Text style={utilStyle.head}>Suggested</Text>

            <ScrollView
              // style={style.scrollWidth}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {/* <View style={style.dealContain}> */}
              {foods &&
                foods.map((food, i) =>
                  i === 0 ? (
                    <Food
                      key={food.id}
                      navigation={navigation}
                      food={food}
                      marginStyle={{ marginRight: defaultMargin }}
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
              {/* </View> */}
            </ScrollView>
          </View>
        </View>

        {/* Offers */}
        {phoneOrTablets ? (
          <View style={utilStyle.mt1}>
            <View style={utilStyle.container}>
              <Text style={utilStyle.head}>Offers</Text>

              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View
                  style={[
                    style.dealContain,
                    // {
                    //   flexDirection: "row",
                    //   justifyContent: "space-between",
                    //   alignItems: "center",
                    // },
                  ]}
                >
                  {offers &&
                    offers.map((offer, i) =>
                      i === 0 ? (
                        <OfferItem
                          key={offer.id}
                          imgStyle={{
                            height: 130,
                            width: 280,
                          }}
                          marginStyle={{
                            marginRight: defaultMargin,
                          }}
                        />
                      ) : (
                        <OfferItem
                          key={offer.id}
                          imgStyle={{
                            height: 130,
                            width: 280,
                          }}
                          marginStyle={{
                            marginRight: defaultMargin,
                          }}
                        />
                      )
                    )}
                </View>
              </ScrollView>
            </View>
          </View>
        ) : (
          <View style={utilStyle.mt1}>
            <View style={utilStyle.container}>
              <Text style={utilStyle.head}>Offers</Text>

              <View
                style={[
                  style.dealContain,
                  {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  },
                ]}
              >
                {offers &&
                  offers.map((offer, i) =>
                    i === 0 ? (
                      <OfferItem
                        key={offer.id}
                        imgStyle={{
                          height: 200,
                          width: 420,
                        }}
                        marginStyle={{
                          marginRight: defaultMargin,
                        }}
                      />
                    ) : (
                      <OfferItem
                        key={offer.id}
                        imgStyle={{
                          height: 200,
                          width: 420,
                        }}
                        marginStyle={{
                          marginRight: defaultMargin,
                        }}
                      />
                    )
                  )}
              </View>
            </View>
          </View>
        )}

        {/* Special recipies */}
        <View style={[utilStyle.mt1]}>
          <View style={utilStyle.container}>
            <Text style={utilStyle.head}>Special Recipies</Text>

            <ScrollView
              // style={style.scrollWidth}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              <View style={style.dealContain}>
                {recipes &&
                  recipes.map((recipe, i) =>
                    i === 0 ? (
                      <RecipeCard
                        key={recipe.id}
                        recipe={recipe}
                        marginStyle={{ marginRight: defaultMargin }}
                      />
                    ) : (
                      <RecipeCard
                        key={recipe.id}
                        recipe={recipe}
                        marginStyle={{ marginRight: defaultMargin }}
                      />
                    )
                  )}
              </View>
            </ScrollView>
          </View>
        </View>

        <View style={[utilStyle.container, { paddingBottom: 100 }]}>
          {/* Advertisment */}
          {phoneOrTablets ? (
            <View>
              <View style={utilStyle.mt1}>
                <Text style={utilStyle.head}>Also available on</Text>
                <View
                  style={[
                    style.advContain,
                    {
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    },
                  ]}
                >
                  <Pressable>
                    <View>
                      <Image
                        style={[style.advImg, { width: 155, height: 70 }]}
                        source={playStore}
                      />
                    </View>
                  </Pressable>
                  <Pressable>
                    <View>
                      <Image
                        style={[style.advImg, { width: 155, height: 70 }]}
                        source={appStore}
                      />
                    </View>
                  </Pressable>
                </View>
              </View>
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
            </View>
          ) : (
            <View style={utilStyle.mt1}>
              <View style={style.advContain}>
                <Image source={adMockup} style={style.mockupStyle} />
                <View style={style.launchingContain}>
                  <Text style={{ fontSize: 30 }}>Launching Soon on...</Text>
                  <View style={style.launchingPlatforms}>
                    <Pressable>
                      <View>
                        <Image
                          style={[style.advImg, { height: 120, width: 270 }]}
                          source={playStore}
                        />
                      </View>
                    </Pressable>
                    <Pressable>
                      <View style={{ marginLeft: 30 }}>
                        <Image style={style.advImg} source={appStore} />
                      </View>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          )}

          {/* Why fresh fred */}
          <View style={utilStyle.mt1}>
            <Text
              style={[
                style.concludeTxt,
                phoneOrTablets ? { fontSize: 30 } : { fontSize: 40 },
              ]}
            >
              Why Fresh Fred?
            </Text>
            {conclusions &&
              conclusions.map(conclusion => (
                <View
                  key={conclusion.id}
                  style={[
                    utilStyle.card,
                    style.concludeCard,
                    phoneOrTablets
                      ? { padding: 20 }
                      : { paddingVertical: 50, paddingHorizontal: 50 },
                  ]}
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
        {/* </ScrollView> */}
      </DrawerLayout>
    </View>
  );
};

const style = StyleSheet.create({
  scrollWidth: {
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  container: {
    display: "flex",
    // flex: 1,
    // minHeight: "100%",
    // overflow: "hidden",
  },
  nav: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 50,
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
    position: "relative",
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
  },
  searchInput: {
    marginLeft: 20,
  },
  offerImg: {
    height: 400,
    // width: 500,
    // width: SliderWidth - 50
    // width: "90%",
    width: 1000,
    borderRadius: 10,
    marginRight: 10,
  },
  catContain: {
    marginRight: 30,
    backgroundColor: "transparent",
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
    height: 60,
    width: 60,
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
    alignItems: "center",
    // justifyContent: "space-between",
  },
  advImg: {
    width: 250,
    height: 100,
    marginVertical: 10,
  },
  concludeCard: {
    position: "relative",
    borderRadius: 10,
    marginTop: 25,
    // paddingVertical: 50,
    // paddingHorizontal: 50,
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
    fontSize: 20,
    paddingBottom: 10,
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
    top: -30,
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
  // Mockup
  mockupStyle: {
    height: 650,
    width: 320,
  },
  launchingPlatforms: {
    flexDirection: "row",
    alignItems: "center",
  },
  launchingContain: {
    marginLeft: 150,
  },
  // advContain: {
  //   flexDirection: 'row',
  //   alignItems: 'center'
  // }
});

export default HomeWeb;
