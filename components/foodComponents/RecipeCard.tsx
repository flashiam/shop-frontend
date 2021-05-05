import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import {
  primaryColor,
  medColor,
  secondaryColor,
} from "../../styles/_variables";
import utilStyle from "../../styles/utilStyle";

import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import testAvatar from "../../img/test_avatar.jpg";

const RecipeCard = () => {
  return (
    <View style={[utilStyle.card, style.recipeCard]}>
      <View style={style.recipeHeader}>
        <View>
          <Image source={testAvatar} style={style.avatar} />
        </View>
        <View style={style.headerDesc}>
          <Text style={style.name}>Fred</Text>
          <Text style={style.date}>January 25,2021</Text>
        </View>
      </View>
      <View style={utilStyle.mt1}>
        <Text style={style.question}>
          How to follow a high protien diet plan with indian meals?
        </Text>
        <Text>
          This specialised diet plan lives up to the spoiler in its nomenclature
          by asking you to do just that: flood your system with friendly...
        </Text>
      </View>
      <View style={[utilStyle.mt1, style.recipeFooter]}>
        <MaterialCommunityIcons
          name="message-bulleted-off"
          size={20}
          color={medColor}
        />
        <View style={style.btnContain}>
          <View style={[utilStyle.card, style.btn]}>
            <Entypo name="share" size={15} color={primaryColor} />
          </View>
          <View style={[utilStyle.card, style.btn]}>
            <Entypo name="chevron-right" size={15} color={primaryColor} />
          </View>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  recipeCard: {
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginRight: 5,
    marginBottom: 5,
  },
  recipeHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    height: 45,
    width: 45,
    borderRadius: 100 / 2,
  },
  headerDesc: {
    paddingLeft: 20,
  },
  name: {
    fontSize: 15,
    fontWeight: "bold",
    paddingBottom: 3,
  },
  date: {
    color: secondaryColor,
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    paddingBottom: 5,
  },
  recipeFooter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btnContain: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  btn: {
    borderRadius: 100 / 2,
    marginLeft: 10,
  },
});

export default RecipeCard;
