import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  Pressable,
} from "react-native";
import { MaterialIcons, FontAwesome, Entypo } from "@expo/vector-icons";

import utilStyle from "../../styles/utilStyle";
import {
  primaryColor,
  medColor,
  darkColor,
  secondaryColor,
} from "../../styles/_variables";

// import foodImg from "../../img/indian_food_1.png";

interface Food {
  id: number;
  title: string;
  price: number;
  img: string;
  rating: number;
  stars: number;
  reviews: number;
}

// Type checking

type Props = {
  navigation: any;
  food: Food;
  updatePage?: boolean;
  mr?: number;
};

// import FoodDesc from "../pages/FoodDesc";

const Food = ({ navigation, food, updatePage, mr }: Props) => {
  const { id, title, price, img, rating, stars, reviews } = food;

  return (
    <Pressable
      style={[utilStyle.card, style.dealCard, { marginRight: mr ? mr : 0 }]}
      onPress={() =>
        updatePage
          ? navigation.push("Food", { foodid: id })
          : navigation.navigate("Food", { foodid: id })
      }
    >
      <View style={style.imgContain}>
        <Image source={img} style={style.dealImg} />
      </View>

      <View style={style.dealContent}>
        <View>
          <Text style={{ fontSize: 20, color: medColor, fontWeight: "bold" }}>
            {title}
          </Text>
          <View style={style.ratings}>
            <Text style={style.txt}>{rating}</Text>
            <View style={[style.rating]}>
              {[1, 2, 3, 4, 5].map(star =>
                star <= stars ? (
                  <MaterialIcons
                    key={star}
                    name="star"
                    size={8}
                    color={primaryColor}
                  />
                ) : (
                  <MaterialIcons
                    key={star}
                    name="star"
                    size={8}
                    color={medColor}
                  />
                )
              )}
            </View>
            <Text style={style.txt}>({reviews})</Text>
          </View>
          <Text
            style={{
              color: darkColor,
              fontSize: 20,
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            ₹ {price}
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
    </Pressable>
  );
};

const style = StyleSheet.create({
  dealCard: {
    borderRadius: 10,
    width: 160,
    // width: Platform.OS === "web" ? 300 : 150,
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
