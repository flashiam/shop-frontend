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
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import utilStyle from "../../styles/utilStyle";
import {
  primaryColor,
  medColor,
  secondaryColor,
  darkColor,
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

  const srchInput = useRef<HTMLAllCollection>(null);

  // interface Food {
  //   id: number;
  //   title: string;
  //   price: number;
  //   img: string;
  //   rating: number;
  //   stars: number;
  //   reviews: number;
  // }

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
    <DrawerLayoutAndroid
      ref={drawer}
      renderNavigationView={() => (
        <Drawer drawer={drawer} navigation={navigation} />
      )}
      drawerPosition="right"
      drawerWidth={300}
    >
      <View style={[utilStyle.container, { paddingBottom: 0 }]}>
        {/* Navbar */}
        <View style={style.nav}>
          {/* Back btn */}
          <Pressable
            style={style.leftContent}
            onPress={() => navigation.goBack()}
            android_ripple={{ color: secondaryColor, borderless: true }}
          >
            <MaterialIcons name="arrow-back" size={30} color={darkColor} />
          </Pressable>
          <View style={style.rightContent}>
            {/* Search bar */}
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
            {/* Navbar btn */}
            <Pressable
              onPress={() => {
                drawer.current.openDrawer();
              }}
              android_ripple={{
                color: secondaryColor,
                borderless: true,
              }}
            >
              <EvilIcons name="navicon" size={35} color="red" />
            </Pressable>
          </View>
        </View>
      </View>
      <View style={utilStyle.container}>
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

        <ScrollView style={{ marginBottom: 120 }}>
          <View style={style.categoryContain}>
            {subCategories &&
              subCategories[activeSubTab].subCatItems &&
              subCategories[activeSubTab].subCatItems.map((item: FoodType) => (
                <View
                  key={item.id}
                  style={{ marginHorizontal: 1, marginBottom: 20 }}
                >
                  <Food navigation={navigation} food={item} />
                </View>
              ))}
          </View>
        </ScrollView>
      </View>
    </DrawerLayoutAndroid>
  );
};

const style = StyleSheet.create({
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
    marginTop: 10,
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
  activeSubLabel: {
    color: primaryColor,
  },
});

export default Categories;
