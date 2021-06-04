import React, { useEffect, useRef, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import DrawerLayout from "react-native-drawer-layout";

import { RootStackParamList, FoodType } from "../../App";

import MinifiedNav from "../layout/MinifiedNav";
import Food from "../foodComponents/Food";
import Drawer from "../layout/Drawer";

import foodImg from "../../img/indian_food_1.png";
import utilStyle from "../../styles/utilStyle";

import { lightColor } from "../../styles/_variables";

type SearchScreenNavProp = StackNavigationProp<
  RootStackParamList,
  "ProductSearch"
>;
type SearchScreenRouteProp = RouteProp<RootStackParamList, "ProductSearch">;

type Props = {
  route: SearchScreenRouteProp;
  navigation: SearchScreenNavProp;
};

const ProductSearch = ({ route, navigation }: Props) => {
  const { keyword } = route.params;

  const [products] = useState<FoodType[]>([
    {
      id: 1,
      title: "Chicken (with skin)",
      price: 599,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea necessitatibus quaerat aperiam numquam vero! Ex vero quia dicta, odit facilis porro, placeat cupiditate illum neque facere similique optio tenetur velit.",
      img: foodImg,
      rating: 3,
      stars: 3,
      reviews: 150,
      tags: ["chicken", "Chicken", "CHIKCEN", "with skin", "chicken meat"],
    },
    {
      id: 2,
      title: "Rohu fish",
      price: 1099,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea necessitatibus quaerat aperiam numquam vero! Ex vero quia dicta, odit facilis porro, placeat cupiditate illum neque facere similique optio tenetur velit.",
      img: foodImg,
      rating: 4.5,
      stars: 4,
      reviews: 100,
      tags: [
        "Fish",
        "fish",
        "FISH",
        "with skin",
        "fish meat",
        "rohu",
        "rohu fish",
      ],
    },
    {
      id: 3,
      title: "Fish (whole)",
      price: 899,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea necessitatibus quaerat aperiam numquam vero! Ex vero quia dicta, odit facilis porro, placeat cupiditate illum neque facere similique optio tenetur velit.",
      img: foodImg,
      rating: 4,
      stars: 4,
      reviews: 150,
      tags: [
        "Fish",
        "fish",
        "FISH",
        "whole",
        "whole fish",
        "fish whole",
        "fish meat",
        "with head",
      ],
    },
    {
      id: 4,
      title: "Mutton (Keema)",
      price: 1200,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea necessitatibus quaerat aperiam numquam vero! Ex vero quia dicta, odit facilis porro, placeat cupiditate illum neque facere similique optio tenetur velit.",
      img: foodImg,
      rating: 3.5,
      stars: 3,
      reviews: 130,
      tags: [
        "Mutton",
        "MUTTON",
        "mutton",
        "goat",
        "keema",
        "mutton keema",
        "mince",
        "mutton mince",
      ],
    },
    {
      id: 5,
      title: "Sea Prawns",
      price: 699,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea necessitatibus quaerat aperiam numquam vero! Ex vero quia dicta, odit facilis porro, placeat cupiditate illum neque facere similique optio tenetur velit.",
      img: foodImg,
      rating: 4.5,
      stars: 4,
      reviews: 150,
      tags: ["Sea prawns", "sea prawns", "prawns", "sea food"],
    },
    {
      id: 6,
      title: "Chicken Legs",
      price: 999,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea necessitatibus quaerat aperiam numquam vero! Ex vero quia dicta, odit facilis porro, placeat cupiditate illum neque facere similique optio tenetur velit.",
      img: foodImg,
      rating: 4,
      stars: 4,
      reviews: 150,
      tags: [
        "chicken",
        "Chicken",
        "CHIKCEN",
        "chicken legs",
        "legs",
        "without skin",
      ],
    },
    {
      id: 7,
      title: "Chicken Breasts",
      price: 999,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea necessitatibus quaerat aperiam numquam vero! Ex vero quia dicta, odit facilis porro, placeat cupiditate illum neque facere similique optio tenetur velit.",
      img: foodImg,
      rating: 4,
      stars: 4,
      reviews: 150,
      tags: [
        "chicken",
        "Chicken",
        "CHIKCEN",
        "chicken brests",
        "breasts",
        "breast",
        "without skin",
      ],
    },
    {
      id: 8,
      title: "Salmon Fish",
      price: 899,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea necessitatibus quaerat aperiam numquam vero! Ex vero quia dicta, odit facilis porro, placeat cupiditate illum neque facere similique optio tenetur velit.",
      img: foodImg,
      rating: 4,
      stars: 4,
      reviews: 150,
      tags: ["Fish", "fish", "FISH", "salmon", "Salmon", "without skin"],
    },
    {
      id: 9,
      title: "Goat Brain",
      price: 999,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea necessitatibus quaerat aperiam numquam vero! Ex vero quia dicta, odit facilis porro, placeat cupiditate illum neque facere similique optio tenetur velit.",
      img: foodImg,
      rating: 4,
      stars: 4,
      reviews: 150,
      tags: [
        "Mutton",
        "MUTTON",
        "mutton",
        "goat",
        "Goat",
        "GOAT",
        "goat brain",
        "brain",
      ],
    },
    {
      id: 11,
      title: "Murg mussalam",
      price: 1200,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea necessitatibus quaerat aperiam numquam vero! Ex vero quia dicta, odit facilis porro, placeat cupiditate illum neque facere similique optio tenetur velit.",
      img: foodImg,
      rating: 4,
      stars: 4,
      reviews: 150,
      tags: ["chicken", "Chicken", "CHIKCEN", "murg mussalam", "murg"],
    },
    {
      id: 12,
      title: "Chicken boneless",
      price: 1200,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea necessitatibus quaerat aperiam numquam vero! Ex vero quia dicta, odit facilis porro, placeat cupiditate illum neque facere similique optio tenetur velit.",
      img: foodImg,
      rating: 4,
      stars: 4,
      reviews: 150,
      tags: ["chicken", "Chicken", "CHIKCEN", "chicken boneless", "boneless"],
    },
    {
      id: 10,
      title: "Prawns with skin",
      price: 1200,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea necessitatibus quaerat aperiam numquam vero! Ex vero quia dicta, odit facilis porro, placeat cupiditate illum neque facere similique optio tenetur velit.",
      img: foodImg,
      rating: 4,
      stars: 4,
      reviews: 150,
      tags: ["Prawns", "prawns", "sea prawns", "with skin"],
    },
    {
      id: 10,
      title: "Prawns with skin",
      price: 1200,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea necessitatibus quaerat aperiam numquam vero! Ex vero quia dicta, odit facilis porro, placeat cupiditate illum neque facere similique optio tenetur velit.",
      img: foodImg,
      rating: 4,
      stars: 4,
      reviews: 150,
      tags: ["Prawns", "prawns", "sea prawns", "with skin"],
    },
    {
      id: 10,
      title: "Prawns with skin",
      price: 1200,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea necessitatibus quaerat aperiam numquam vero! Ex vero quia dicta, odit facilis porro, placeat cupiditate illum neque facere similique optio tenetur velit.",
      img: foodImg,
      rating: 4,
      stars: 4,
      reviews: 150,
      tags: ["Prawns", "prawns", "sea prawns", "with skin"],
    },
  ]);

  // State for the search result
  const [searchRes, setSearchRes] = useState<FoodType[] | null>(null);

  const searchProducts = (keyword: string) => {
    const res = products.filter(product => product.tags?.includes(keyword));
    setSearchRes(res);
  };

  const drawer = useRef(null);

  useEffect(() => {
    searchProducts(keyword);
  }, []);

  return (
    <DrawerLayout
      ref={drawer}
      renderNavigationView={() => (
        <Drawer drawer={drawer} navigation={navigation} />
      )}
      drawerPosition="right"
      drawerWidth={300}
      drawerBackgroundColor={lightColor}
    >
      <View style={utilStyle.container}>
        <MinifiedNav navigation={navigation} drawer={drawer} />
        <View style={style.searchContain}>
          {searchRes && searchRes.length ? (
            <View>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Search results for "{keyword}"
              </Text>

              <ScrollView style={{ marginBottom: 320 }}>
                <View style={style.searchResults}>
                  {searchRes.map(product => (
                    <View key={product.id} style={{ marginBottom: 20 }}>
                      <Food navigation={navigation} food={product} />
                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>
          ) : (
            <View style={style.noSearchBox}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Sorry no search found for "{keyword}"
              </Text>
            </View>
          )}
        </View>
      </View>
    </DrawerLayout>
  );
};

const style = StyleSheet.create({
  searchContain: {},
  searchResults: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: 25,
  },
  noSearchBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 500,
    width: "100%",
    marginTop: 250,
  },
});

export default ProductSearch;
