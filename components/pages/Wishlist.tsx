import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Pressable,
  StatusBar,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

import { RootStackParamList } from "../../App";

import { MaterialIcons } from "@expo/vector-icons";
import foodImg from "../../img/indian_food_1.png";

import utilStyle from "../../styles/utilStyle";
import { darkColor } from "../../styles/_variables";

import Food from "../foodComponents/Food";

type WishlistScreenNavProp = StackNavigationProp<
  RootStackParamList,
  "Wishlist"
>;

type Props = {
  navigation: WishlistScreenNavProp;
};

interface FoodType {
  id: number;
  title: string;
  price: number;
  img: string;
  rating: number;
  stars: number;
  reviews: number;
}

const Wishlist = ({ navigation }: Props) => {
  const [foods, setFoods] = useState<FoodType[] | null>([
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
  return (
    <ScrollView>
      <View style={utilStyle.container}>
        <View style={style.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" color={darkColor} size={30} />
          </Pressable>
        </View>
        <View style={style.section}>
          <Text style={utilStyle.head}>Wishlist</Text>
          <View style={style.wishlistContain}>
            {foods &&
              foods.map(food => (
                <View key={food.id} style={{ marginBottom: 15 }}>
                  <Food food={food} navigation={navigation} />
                </View>
              ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  header: {
    marginTop: StatusBar.currentHeight,
    paddingVertical: 15,
  },
  wishHead: {
    fontWeight: "bold",
  },
  wishlistContain: {
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default Wishlist;
