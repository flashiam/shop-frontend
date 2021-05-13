import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import utilStyle from "../../styles/utilStyle";
import { MaterialIcons, FontAwesome, Entypo } from "@expo/vector-icons";
import {
  primaryColor,
  medColor,
  darkColor,
  secondaryColor,
} from "../../styles/_variables";
import suggestFood from "../../img/suggest_food.jpg";

interface Food {
  id: number;
  title: string;
  price: number;
  img: string;
  rating: number;
  stars: number;
  reviews: number;
}

type Props = {
  food: Food;
};

const Food = ({ food }: Props) => {
  return (
    <View style={[utilStyle.card, style.dealCard]}>
      <View style={style.imgContain}>
        <Image source={food.img} style={style.dealImg} />
      </View>

      <View style={style.dealContent}>
        <View>
          <Text style={{ fontSize: 20, color: medColor, fontWeight: "bold" }}>
            {food.title}
          </Text>
          <View style={style.ratings}>
            <Text style={style.txt}>{food.rating}</Text>
            <View style={[style.rating]}>
              <MaterialIcons name="star" size={8} color={primaryColor} />
              <MaterialIcons name="star" size={8} color={primaryColor} />
              <MaterialIcons name="star" size={8} color={primaryColor} />
              <MaterialIcons name="star" size={8} color={primaryColor} />
              <MaterialIcons name="star" size={8} color={medColor} />
            </View>
            <Text style={style.txt}>({food.reviews})</Text>
          </View>
        </View>
        <View>
          <Text
            style={{
              color: darkColor,
              fontSize: 20,
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            ₹ 599
          </Text>
        </View>
      </View>

      <View style={style.topContent}>
        <View style={[utilStyle.card, style.btn]}>
          <FontAwesome name="heart-o" size={15} color={primaryColor} />
        </View>
        <View style={[utilStyle.card, style.btn]}>
          <Entypo name="share" size={15} color={primaryColor} />
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  dealCard: {
    borderRadius: 10,
    width: 300,
    padding: 0,
    marginRight: 10,
  },
  imgContain: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 150,
    borderRadius: 10,
  },
  dealImg: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    borderRadius: 10,
  },
  dealContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  ratings: {
    display: "flex",
    flexDirection: "row",
    marginTop: 5,
  },
  rating: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 5,
  },
  txt: {
    color: secondaryColor,
  },
  topContent: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  btn: {
    borderRadius: 100 / 2,
    marginBottom: 8,
    padding: 10,
  },
});
export default Food;
