import React from "react";
import { View, Text, StyleSheet, Image, Platform } from "react-native";
import utilStyle from "../../styles/utilStyle";
import { MaterialIcons, FontAwesome, Entypo } from "@expo/vector-icons";
import food from "../../img/indian_food_1.png";
import {
  primaryColor,
  medColor,
  darkColor,
  secondaryColor,
} from "../../styles/_variables";

const Food = () => {
  return (
    <View style={[utilStyle.card, style.dealCard]}>
      <View style={style.imgContain}>
        <Image source={food} style={style.dealImg} />
      </View>

      <View style={style.dealContent}>
        <View>
          <Text style={{ fontSize: 20, color: medColor, fontWeight: "bold" }}>
            Mix Veg
          </Text>
          <View style={style.ratings}>
            <Text style={style.txt}>4.9</Text>
            <View style={[style.rating]}>
              <MaterialIcons name="star" size={8} color={primaryColor} />
              <MaterialIcons name="star" size={8} color={primaryColor} />
              <MaterialIcons name="star" size={8} color={primaryColor} />
              <MaterialIcons name="star" size={8} color={primaryColor} />
              <MaterialIcons name="star" size={8} color={medColor} />
            </View>
            <Text style={style.txt}>(150)</Text>
          </View>
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
      <View style={style.bottomContent}>
        <MaterialIcons name="arrow-forward" size={20} color={darkColor} />
      </View>

      <View style={style.topContent}>
        <View style={[utilStyle.card, style.btn]}>
          <FontAwesome name="heart-o" size={15} color={primaryColor} />
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  dealCard: {
    borderRadius: 10,
    width: Platform.OS === "web" ? 300 : 150,
  },
  imgContain: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  dealImg: {
    height: 120,
    width: 120,
  },
  dealContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    top: 5,
    right: 5,
  },
  bottomContent: {
    position: "absolute",
    bottom: 15,
    right: 15,
  },
  btn: {
    borderRadius: 100 / 2,
    marginBottom: 8,
    padding: 10,
  },
});
export default Food;
