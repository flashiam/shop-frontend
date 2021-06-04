import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  Pressable,
  StatusBar,
  Share,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

import { MaterialIcons, FontAwesome, Entypo } from "@expo/vector-icons";

import { RootStackParamList } from "../../App";

import utilStyle from "../../styles/utilStyle";
import {
  darkColor,
  primaryColor,
  lightColor,
  medColor,
} from "../../styles/_variables";
import suggestFood from "../../img/suggest_food.jpg";
import foodImg from "../../img/indian_food_1.png";

type SpecialScreenNavProp = StackNavigationProp<
  RootStackParamList,
  "SpecialFoodDesc"
>;

type SpecialScreenRouteProp = RouteProp<RootStackParamList, "SpecialFoodDesc">;

type Props = {
  route: SpecialScreenRouteProp;
  navigation: SpecialScreenNavProp;
};

const SpecialFoodDesc = ({ route, navigation }: Props) => {
  const { food } = route.params;
  const { id, title, subtitle, price, desc } = food;

  const [favorite, setFavorite] = useState<boolean>(false);

  // Function to share the food
  const shareFood = async () => {
    try {
      await Share.share({
        title: `Share Food`,
        message: `Try this awesome and delicious ${title} from fresh fred https://www.fresh-fred.com/Food/${id}`,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // Variant component
  const Variant = () => {
    const [quantity, setQuantity] = useState<number>(0);

    // Function to increase quantity
    const increaseQuantity = () => {
      setQuantity(prevQuantity => prevQuantity + 1);
    };

    // Function to decrease quantity
    const decreaseQuantity = () => {
      setQuantity(prevQuantity => prevQuantity - 1);
    };

    return (
      <View style={style.variant}>
        <View style={style.leftVariantContent}>
          <View style={[utilStyle.card, style.variantImgBox]}>
            <Image source={foodImg} style={style.variantImg} />
          </View>
          <View style={style.variantContent}>
            <Text style={{ fontSize: 16, color: medColor }}>
              {title} {subtitle && subtitle}
            </Text>
            <View style={style.rate}>
              <Text
                style={{
                  fontSize: 16,
                  color: darkColor,
                  fontWeight: "bold",
                }}
              >
                ₹ {price}
              </Text>
              <Text style={{ color: medColor }}> /200g</Text>
            </View>
          </View>
        </View>
        <View style={[utilStyle.card, style.ctrlBtnContain]}>
          {quantity >= 1 && (
            <Pressable style={style.ctrlBtn} onPress={() => decreaseQuantity()}>
              <Text style={{ color: medColor }}>-</Text>
            </Pressable>
          )}

          {quantity > 0 ? (
            <Text
              style={{
                marginHorizontal: 5,
                color: primaryColor,
                fontWeight: "bold",
              }}
            >
              {quantity}
            </Text>
          ) : (
            <Text
              style={{
                marginHorizontal: 5,
                color: medColor,
                paddingLeft: 15,
              }}
            >
              Add
            </Text>
          )}

          <Pressable style={style.ctrlBtn} onPress={() => increaseQuantity()}>
            <Text style={{ color: medColor }}>+</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <ScrollView>
      <View style={utilStyle.container}>
        <View style={style.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" color={darkColor} size={30} />
          </Pressable>
          <View style={style.rightContent}>
            <Pressable
              style={[utilStyle.card, style.btn]}
              onPress={() => shareFood()}
            >
              <Entypo name="share" color={primaryColor} size={15} />
            </Pressable>
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
          </View>
        </View>
        <View>
          <Image source={suggestFood} style={style.specialImg} />
          <View style={style.foodDesc}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                paddingBottom: 5,
                color: darkColor,
              }}
            >
              {title} 500g - 1.5kg
            </Text>
            <Text style={{ fontSize: 16, color: medColor }}>{desc}</Text>
          </View>
        </View>
        <View style={style.variants}>
          <Text style={utilStyle.head}>Variants</Text>
          {[1, 2, 3, 4, 5, 6].map(item => (
            <Variant key={item} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  header: {
    marginTop: StatusBar.currentHeight,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rightContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  btn: {
    borderRadius: 100 / 2,
    marginLeft: 10,
  },
  specialImg: {
    width: "100%",
    height: 160,
    borderRadius: 10,
    marginBottom: 10,
  },
  foodDesc: {
    marginTop: 10,
  },
  variants: {
    marginTop: 30,
  },
  variant: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  variantImgBox: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    padding: 5,
    height: 65,
    width: 65,
  },
  variantImg: {
    height: 55,
    width: 55,
  },
  rate: {
    flexDirection: "row",
    alignItems: "center",
  },
  leftVariantContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  variantContent: {
    marginLeft: 10,
  },
  ctrlBtnContain: {
    flexDirection: "row",
    paddingVertical: 0,
    paddingHorizontal: 0,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "space-between",
    width: 75,
  },
  ctrlBtn: {
    paddingVertical: 8,
    paddingHorizontal: 9,
  },
});

export default SpecialFoodDesc;
