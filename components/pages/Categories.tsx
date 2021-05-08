import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
  DrawerLayoutAndroid,
  TextInput,
  Modal,
  useWindowDimensions,
  Dimensions,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import utilStyle from "../../styles/utilStyle";
import {
  primaryColor,
  medColor,
  secondaryColor,
  darkColor,
} from "../../styles/_variables";

import {
  Ionicons,
  EvilIcons,
  MaterialIcons,
  FontAwesome5,
  AntDesign,
} from "@expo/vector-icons";

import Food from "../foodComponents/Food";
import Drawer from "../layout/Drawer";

import foodImg from "../../img/indian_food_1.png";
import testAvatar from "../../img/test_avatar.jpg";

// Type checking
type RootStackParamList = {
  Home: undefined;
  Food: undefined;
  Categories: { catid: number };
};

type CategoryScreenNavProp = StackNavigationProp<
  RootStackParamList,
  "Categories"
>;
type CategoryScreenRouteProp = RouteProp<RootStackParamList, "Categories">;

type Props = {
  route: CategoryScreenRouteProp;
  navigation: CategoryScreenNavProp;
};

let searchOpened = false;

const Categories = ({ route, navigation }: Props) => {
  // Width for the tabs
  const layout = Dimensions.get("window").width;
  const selectedCat = route.params.catid - 1;

  interface Food {
    id: number;
    title: string;
    price: number;
    img: string;
    rating: number;
    stars: number;
    reviews: number;
  }

  interface TabRoute {
    key: string;
    title: string;
  }

  const drawer = useRef<any>(null);

  // Dummy foods data
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
      rating: 4.9,
      stars: 4,
      img: foodImg,
    },
    {
      id: 3,
      title: "Mix Veg",
      price: 599,
      reviews: 150,
      rating: 4.9,
      stars: 4,
      img: foodImg,
    },
    {
      id: 4,
      title: "Mix Veg",
      price: 599,
      reviews: 150,
      rating: 4.9,
      stars: 4,
      img: foodImg,
    },
    {
      id: 5,
      title: "Mix Veg",
      price: 599,
      reviews: 150,
      rating: 4.9,
      stars: 4,
      img: foodImg,
    },
  ]);

  // State for the category segment
  const [index, setIndex] = useState<number>(selectedCat);

  // State for the filter segment
  const [filterIndex, setFilterIndex] = useState<number>(0);

  // Tab routes
  const [routes] = useState<TabRoute[]>([
    {
      key: "first",
      title: "Chicken",
    },
    {
      key: "second",
      title: "Sea Food",
    },
    {
      key: "third",
      title: "Mutton",
    },
  ]);

  // Filter routes
  const [filterRoutes] = useState<TabRoute[]>([
    {
      key: "first",
      title: "All",
    },
    {
      key: "second",
      title: "Low to high",
    },
    {
      key: "third",
      title: "Popularity",
    },
    {
      key: "fourth",
      title: "4+ rating",
    },
    {
      key: "fifth",
      title: "Latest",
    },
  ]);

  const filterLoading = () => {
    return (
      <View
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Loading...</Text>
      </View>
    );
  };

  const filterComp = () => {
    return (
      <View
        style={[
          style.categoryContain,
          {
            display: "flex",
            flex: 1,
            paddingHorizontal: 15,
          },
        ]}
      >
        {foods &&
          foods.map(food => (
            <View key={food.id} style={{ marginBottom: 15 }}>
              <Food navigation={navigation} food={food} />
            </View>
          ))}
      </View>
    );
  };

  // Cusotom filter tab bar
  const filterTabBar = (props: any) => {
    return (
      <TabBar
        {...props}
        scrollEnabled={true}
        activeColor={primaryColor}
        inactiveColor={secondaryColor}
        style={{ backgroundColor: "transparent", elevation: 0 }}
        labelStyle={{ fontSize: 15 }}
        indicatorStyle={{ backgroundColor: "transparent" }}
        tabStyle={{ width: 100 }}
      />
    );
  };
  // Category components
  const Comp1 = () => {
    return (
      <View style={[style.categoryContain, { display: "flex", flex: 1 }]}>
        <TabView
          navigationState={{ index: filterIndex, routes: filterRoutes }}
          renderScene={renderFilterScene}
          onIndexChange={setFilterIndex}
          initialLayout={{ width: layout }}
          renderTabBar={filterTabBar}
          lazy
          renderLazyPlaceholder={filterLoading}
        />
      </View>
    );
  };

  const Comp2 = () => {
    return (
      <View style={style.categoryContain}>
        {/* {foods &&
          foods.map(food => (
            <View key={food.id} style={{ marginBottom: 15 }}>
              <Food navigation={navigation} food={food} />
            </View>
          ))} */}
      </View>
    );
  };
  const Comp3 = () => {
    return (
      <View style={style.categoryContain}>
        {/* {foods &&
          foods.map(food => (
            <View key={food.id} style={{ marginBottom: 15 }}>
              <Food navigation={navigation} food={food} />
            </View>
          ))} */}
      </View>
    );
  };

  // Render filter scenes
  const renderFilterScene = SceneMap({
    first: filterComp,
    second: filterComp,
    third: filterComp,
    fourth: filterComp,
    fifth: filterComp,
  });

  // Render the scenes
  const renderScene = SceneMap({
    first: Comp1,
    second: Comp1,
    third: Comp1,
  });

  const renderTabBar = (props: any) => {
    return (
      <TabBar
        {...props}
        scrollEnabled={true}
        activeColor={darkColor}
        inactiveColor={secondaryColor}
        style={{ backgroundColor: "transparent", elevation: 0 }}
        labelStyle={{ fontWeight: "bold", fontSize: 20 }}
        indicatorStyle={{ backgroundColor: "transparent" }}
      />
    );
  };

  // Navigation view
  // const NavigationView = () => {
  //   return (
  //     <View style={style.navContain}>
  //       <Pressable style={style.profileContain}>
  //         <Image source={testAvatar} style={style.profileAvatar} />
  //         <View style={style.profileDetails}>
  //           <Text style={style.userName}>Joy Pashina</Text>
  //           <Text style={style.userEmail}>joypashina32@gmail.com</Text>
  //         </View>
  //       </Pressable>

  //       <View style={style.navLinks}>
  //         <Pressable
  //           style={style.navLink}
  //           android_ripple={{ color: secondaryColor }}
  //         >
  //           <FontAwesome5 name="receipt" size={20} color={primaryColor} />
  //           <Text style={style.linkTxt}>My Orders</Text>
  //         </Pressable>
  //         <Pressable
  //           style={style.navLink}
  //           android_ripple={{ color: secondaryColor }}
  //         >
  //           <FontAwesome5 name="shopping-bag" size={20} color={primaryColor} />
  //           <Text style={style.linkTxt}>Wishlist</Text>
  //         </Pressable>
  //         <Pressable
  //           style={style.navLink}
  //           android_ripple={{ color: secondaryColor }}
  //         >
  //           <MaterialIcons
  //             name="support-agent"
  //             size={20}
  //             color={primaryColor}
  //           />
  //           <Text style={style.linkTxt}>Support</Text>
  //         </Pressable>
  //         <Pressable
  //           style={style.navLink}
  //           android_ripple={{ color: secondaryColor }}
  //         >
  //           <FontAwesome5 name="ticket-alt" size={20} color={primaryColor} />
  //           <Text style={style.linkTxt}>Refer and earn</Text>
  //         </Pressable>
  //       </View>

  //       <Pressable
  //         style={style.closeNavBtn}
  //         android_ripple={{ color: secondaryColor, borderless: true }}
  //         onPress={() => drawer.current.closeDrawer()}
  //       >
  //         <AntDesign name="close" size={25} color={darkColor} />
  //       </Pressable>
  //     </View>
  //   );
  // };

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      renderNavigationView={() => <Drawer drawer={drawer} />}
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
            <View style={[utilStyle.card, style.searchBar]}>
              <AntDesign name="search1" color={primaryColor} size={24} />
              <TextInput style={style.searchInput} placeholder="Search" />
            </View>
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
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout }}
        renderTabBar={renderTabBar}
      />
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
  },
  searchInput: {
    position: "absolute",
    // transform: [{ translateY: 100 / 2 }],
    top: "45%",
    left: 0,
    height: "100%",
    width: "100%",
    marginLeft: 50,
    display: "none",
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
    // marginTop: 30,
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
});

export default Categories;
