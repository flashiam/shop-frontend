import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  DrawerLayoutAndroid,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import "@expo/match-media";
import { useMediaQuery } from "react-responsive";
import { RouteProp } from "@react-navigation/native";
import utilStyle from "../../styles/utilStyle";
import {
  primaryColor,
  medColor,
  secondaryColor,
  darkColor,
  lightColor,
} from "../../styles/_variables";

import {
  EvilIcons,
  MaterialIcons,
  FontAwesome5,
  AntDesign,
} from "@expo/vector-icons";

import Food from "../foodComponents/Food";
import Drawer from "../layout/Drawer";

import foodImg from "../../img/indian_food_1.png";

import { RootStackParamList, FoodType } from "../../App";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import DrawerLayout from "react-native-drawer-layout";
import MinifiedNav from "../layout/MinifiedNav";

// Type checking
type CategoryScreenNavProp = StackNavigationProp<
  RootStackParamList,
  "Categories"
>;
type CategoryScreenRouteProp = RouteProp<RootStackParamList, "Categories">;

type Props = {
  route: CategoryScreenRouteProp;
  navigation: CategoryScreenNavProp;
};

const Categories = ({ route, navigation }: Props) => {
  // Width for the tabs
  const layout = Dimensions.get("window").width;
  const selectedCat = route.params.catid - 1;
  const phoneOrTablets = useMediaQuery({ maxWidth: 768 });

  const srchInput = useRef<HTMLAllCollection>(null);

  interface Category {
    id: number;
    catName: string;
    catItems: FoodType[];
  }

  interface SubCategory {
    id: number;
    subCatName: string;
    subCatItems: FoodType[] | any;
  }

  const drawer = useRef<any>(null);

  // Dummy foods data
  const [foods, setFoods] = useState<FoodType[]>([
    {
      id: 1,
      title: "Chicken wings",
      price: 799,
      reviews: 120,
      rating: 4.0,
      stars: 4,
      img: foodImg,
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit, earum sint dicta soluta odio aperiam assumenda obcaecati laudantium culpa? Laborum, tempore quae provident illum cumque similique nam magni voluptas sapiente?",
    },
    {
      id: 2,
      title: "Chicken stew",
      price: 650,
      reviews: 10,
      rating: 4.5,
      stars: 4,
      img: foodImg,
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit, earum sint dicta soluta odio aperiam assumenda obcaecati laudantium culpa? Laborum, tempore quae provident illum cumque similique nam magni voluptas sapiente?",
    },
    {
      id: 3,
      title: "Kadaknath",
      price: 359,
      reviews: 125,
      rating: 3.9,
      stars: 3,
      img: foodImg,
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit, earum sint dicta soluta odio aperiam assumenda obcaecati laudantium culpa? Laborum, tempore quae provident illum cumque similique nam magni voluptas sapiente?",
    },
    {
      id: 4,
      title: "Chicken legs",
      price: 899,
      reviews: 150,
      rating: 4.3,
      stars: 4,
      img: foodImg,
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit, earum sint dicta soluta odio aperiam assumenda obcaecati laudantium culpa? Laborum, tempore quae provident illum cumque similique nam magni voluptas sapiente?",
    },
    {
      id: 5,
      title: "Murg mussalam",
      price: 1299,
      reviews: 900,
      rating: 5.0,
      stars: 5,
      img: foodImg,
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit, earum sint dicta soluta odio aperiam assumenda obcaecati laudantium culpa? Laborum, tempore quae provident illum cumque similique nam magni voluptas sapiente?",
    },
    {
      id: 6,
      title: "Chicken Tangdi",
      price: 1099,
      reviews: 900,
      rating: 5.0,
      stars: 5,
      img: foodImg,
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit, earum sint dicta soluta odio aperiam assumenda obcaecati laudantium culpa? Laborum, tempore quae provident illum cumque similique nam magni voluptas sapiente?",
    },
    {
      id: 7,
      title: "Chicken Keema",
      price: 1199,
      reviews: 900,
      rating: 5.0,
      stars: 5,
      img: foodImg,
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit, earum sint dicta soluta odio aperiam assumenda obcaecati laudantium culpa? Laborum, tempore quae provident illum cumque similique nam magni voluptas sapiente?",
    },
  ]);

  const [categories, setCategories] = useState<Category[]>([
    {
      id: 0,
      catName: "Chicken",
      catItems: foods,
    },
    {
      id: 1,
      catName: "Sea Food",
      catItems: foods,
    },
    {
      id: 2,
      catName: "Mutton",
      catItems: foods,
    },
    {
      id: 3,
      catName: "Exotic",
      catItems: foods,
    },
    {
      id: 4,
      catName: "Ready to cook",
      catItems: foods,
    },
  ]);

  const [subCategories, setSubCategories] = useState<SubCategory[]>([
    {
      id: 0,
      subCatName: "All",
      subCatItems: [...foods].map(food => food),
    },
    {
      id: 1,
      subCatName: "Low to high",
      subCatItems: [...foods]
        .map(food => food)
        .sort((cheap, costly) => {
          const cheapFood = cheap["price"];
          const costlyFood = costly["price"];

          if (cheapFood < costlyFood) {
            return -1;
          } else if (cheapFood > costlyFood) {
            return 1;
          }
          return 0;
        }),
    },
    {
      id: 2,
      subCatName: "Popular",
      subCatItems: [...foods]
        .map(food => food)
        .sort((popular, unpopular) => {
          const popularFood = popular["reviews"];
          const unpopularFood = unpopular["reviews"];

          if (popularFood > unpopularFood) {
            return -1;
          } else if (popularFood < unpopularFood) {
            return 1;
          }
          return 0;
        }),
    },
    {
      id: 3,
      subCatName: "4+ rating",
      subCatItems: [...foods].filter(food => food.rating > 4),
    },
    {
      id: 4,
      subCatName: "Latest",
      subCatItems: [...foods].map(food => food),
    },
  ]);

  const [activeTab, setActiveTab] = useState<number>(selectedCat | 0);
  const [activeSubTab, setActiveSubTab] = useState<number>(0);

  const [searchOpened, setSearch] = useState<boolean>(false);

  useEffect(() => {
    console.log(searchOpened);
  }, []);

  return (
    // Comment out this view below to make the app compatible on the web temporary it is commented
    // <View>
    <DrawerLayout
      ref={drawer}
      renderNavigationView={() => (
        <Drawer drawer={drawer} navigation={navigation} />
      )}
      drawerPosition="right"
      drawerWidth={300}
      drawerBackgroundColor={lightColor}
    >
      <View style={[utilStyle.container, { paddingBottom: 0 }]}>
        {/* Navbar */}
        {/* <Pressable style={style.nav} onPress={() => setSearch(false)}>
          <TouchableWithoutFeedback
            style={style.leftContent}
            onPress={() => navigation.goBack()}
            // android_ripple={{ color: secondaryColor, borderless: true }}
          >
            <MaterialIcons name="arrow-back" size={30} color={darkColor} />
          </TouchableWithoutFeedback>
          <View style={style.rightContent}>
            <Pressable
              style={[
                utilStyle.card,
                style.searchBar,
                { width: searchOpened ? 230 : "auto" },
              ]}
              onPress={() => {
                setSearch(true);
                if (srchInput.current) {
                  srchInput.current.focus();
                }
              }}
            >
              <AntDesign name="search1" color={primaryColor} size={24} />
              <TextInput
                ref={srchInput}
                style={[
                  style.searchInput,
                  { display: searchOpened ? "flex" : "none" },
                ]}
                onBlur={() => setSearch(false)}
              />
            </Pressable>

            <Pressable
              onPress={() => {
                drawer?.current.openDrawer();
              }}
              android_ripple={{
                color: secondaryColor,
                borderless: true,
              }}
            >
              <EvilIcons name="navicon" size={35} color="red" />
            </Pressable>
          </View>
        </Pressable> */}
        <MinifiedNav navigation={navigation} drawer={drawer} />
      </View>
      <View style={utilStyle.container}>
        {Platform.OS === "web" ? (
          phoneOrTablets ? (
            <ScrollView showsHorizontalScrollIndicator={false} horizontal>
              {categories &&
                categories.map(cat => (
                  <TouchableOpacity
                    key={cat.id}
                    style={style.tab}
                    onPress={() => setActiveTab(cat.id)}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        style.tabLabel,
                        activeTab === cat.id && style.activeLabel,
                      ]}
                    >
                      {cat.catName}
                    </Text>
                  </TouchableOpacity>
                ))}
            </ScrollView>
          ) : (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                marginBottom: 30,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {categories &&
                  categories.map(cat => (
                    <TouchableOpacity
                      key={cat.id}
                      style={style.tab}
                      onPress={() => setActiveTab(cat.id)}
                      activeOpacity={0.8}
                    >
                      <Text
                        style={[
                          style.tabLabel,
                          activeTab === cat.id && style.activeLabel,
                        ]}
                      >
                        {cat.catName}
                      </Text>
                    </TouchableOpacity>
                  ))}
              </View>
            </View>
          )
        ) : (
          <ScrollView showsHorizontalScrollIndicator={false} horizontal>
            {categories &&
              categories.map(cat => (
                <TouchableOpacity
                  key={cat.id}
                  style={style.tab}
                  onPress={() => setActiveTab(cat.id)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      style.tabLabel,
                      activeTab === cat.id && style.activeLabel,
                    ]}
                  >
                    {cat.catName}
                  </Text>
                </TouchableOpacity>
              ))}
          </ScrollView>
        )}

        {Platform.OS === "web" ? (
          phoneOrTablets ? (
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal
              style={style.subCategory}
            >
              {subCategories &&
                subCategories.map(subCat => (
                  <TouchableOpacity
                    key={subCat.id}
                    style={style.subTab}
                    onPress={() => setActiveSubTab(subCat.id)}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        style.subTabLabel,
                        Platform.OS === "web" && {
                          paddingVertical: 5,
                          paddingHorizontal: 15,
                          borderWidth: 2,
                          borderColor: "transparent",
                          borderRadius: 8,
                        },
                        activeSubTab === subCat.id && style.activeSubLabel,
                      ]}
                    >
                      {subCat.subCatName}
                    </Text>
                  </TouchableOpacity>
                ))}
            </ScrollView>
          ) : (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: "90%",
                marginBottom: 50,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {subCategories &&
                  subCategories.map(subCat => (
                    <TouchableOpacity
                      key={subCat.id}
                      style={style.subTab}
                      onPress={() => setActiveSubTab(subCat.id)}
                      activeOpacity={0.8}
                    >
                      <Text
                        style={[
                          style.subTabLabel,
                          Platform.OS === "web" && {
                            paddingVertical: 5,
                            paddingHorizontal: 15,
                            borderWidth: 2,
                            borderColor: "transparent",
                            borderRadius: 8,
                          },
                          activeSubTab === subCat.id && style.activeSubLabel,
                          { fontWeight: "normal" },
                        ]}
                      >
                        {subCat.subCatName}
                      </Text>
                    </TouchableOpacity>
                  ))}
              </View>
            </View>
          )
        ) : (
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal
            style={style.subCategory}
          >
            {subCategories &&
              subCategories.map(subCat => (
                <TouchableOpacity
                  key={subCat.id}
                  style={style.subTab}
                  onPress={() => setActiveSubTab(subCat.id)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      style.subTabLabel,

                      activeSubTab === subCat.id && style.activeSubLabel,
                    ]}
                  >
                    {subCat.subCatName}
                  </Text>
                </TouchableOpacity>
              ))}
          </ScrollView>
        )}

        <ScrollView style={{ marginBottom: 220 }}>
          <View
            style={[
              style.categoryContain,
              // Platform.OS === "web" &&
              //   !phoneOrTablets && { marginHorizontal: 200 },
            ]}
          >
            {subCategories &&
              subCategories[activeSubTab].subCatItems &&
              subCategories[activeSubTab].subCatItems.map((item: FoodType) => (
                <View
                  key={item.id}
                  style={{
                    // marginHorizontal: 1,
                    marginBottom: 20,
                  }}
                >
                  <Food navigation={navigation} food={item} />
                </View>
              ))}
          </View>
        </ScrollView>
      </View>
      {/* </View> */}
    </DrawerLayout>
  );
};

const style = StyleSheet.create({
  nav: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 30,
  },
  leftContent: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  rightContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  locationTxt: {
    color: secondaryColor,
    paddingLeft: 10,
  },
  searchBar: {
    position: "relative",
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    padding: 10,
    marginRight: 15,
    alignItems: "center",
    width: "auto",
    // width: 230,
  },
  searchInput: {
    height: 20,
    width: 150,
    marginLeft: 10,
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
  categoryContain: {
    marginTop: 5,
    display: "flex",
    // flex: 1,
    // height: 90,
    // width: 90,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    // backgroundColor: "red",
  },
  filterSegment: {
    marginTop: 6,
  },
  tab: {
    marginRight: 40,
    padding: 5,
    borderRadius: 8,
  },
  tabLabel: {
    fontSize: 24,
    fontWeight: "bold",
    color: secondaryColor,
  },
  subTab: {
    padding: 5,
    marginRight: 20,
  },
  subTabLabel: {
    color: secondaryColor,
    fontWeight: "bold",
  },
  subCategory: {
    marginTop: 10,
    marginBottom: 10,
  },
  activeLabel: {
    color: darkColor,
  },
  activeSubLabel:
    Platform.OS === "web"
      ? {
          color: primaryColor,
          paddingVertical: 5,
          paddingHorizontal: 15,
          borderWidth: 2,
          borderColor: primaryColor,
          borderRadius: 8,
        }
      : {
          color: primaryColor,
        },
});

export default Categories;
