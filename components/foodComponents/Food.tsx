import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  Pressable,
  TouchableWithoutFeedback,
  // Animated,
  // Easing,
} from "react-native";
import "@expo/match-media";
import { useMediaQuery } from "react-responsive";
import { MaterialIcons, FontAwesome, Entypo } from "@expo/vector-icons";

import utilStyle from "../../styles/utilStyle";
import {
  primaryColor,
  medColor,
  darkColor,
  secondaryColor,
} from "../../styles/_variables";

import { FoodType } from "../../App";

// Type checking
type Props = {
  navigation: any;
  food: FoodType;
  updatePage?: boolean;
  marginStyle?: Object;
  markedFavorite?: boolean;
};

const Food = ({
  navigation,
  food,
  updatePage,
  marginStyle,
  markedFavorite,
}: Props) => {
  const phoneOrTablets = useMediaQuery({ maxWidth: 768 });
  const [favourite, setFavourite] = useState<boolean>(false);
  // const scaleAnim = useRef(new Animated.Value(0)).current;

  // const cardScale = scaleAnim.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: [1, 1.1],
  // });

  // Function to exapand card
  // const expandCard = () => {
  //   Animated.timing(scaleAnim, {
  //     toValue: 1,
  //     duration: 250,
  //     easing: Easing.linear,
  //     useNativeDriver: true,
  //   }).start();
  // };

  // Function to contract card
  // const contractCard = () => {
  //   Animated.timing(scaleAnim, {
  //     toValue: 0,
  //     duration: 250,
  //     easing: Easing.linear,
  //     useNativeDriver: true,
  //   }).start();
  // };

  const { title, price, img, rating, stars, reviews, isSpecial } = food;

  // Function to navigate to pages
  const navigateToPage = () => {
    if (isSpecial) {
      updatePage
        ? navigation.push("SpecialFoodDesc", { food })
        : navigation.navigate("SpecialFoodDesc", { food });
    } else {
      updatePage
        ? navigation.push("Food", { food })
        : navigation.navigate("Food", { food });
    }
  };

  return (
    <TouchableWithoutFeedback
      // onPressIn={() => expandCard()}
      // onPressOut={() => contractCard()}
      onPress={() => navigateToPage()}
    >
      <View
        style={[
          utilStyle.card,
          style.dealCard,
          {
            position: "relative",
            // transform: [{ scale: cardScale }],
            zIndex: 3,
            ...marginStyle,
          },
          // phoneOrTablets && { width: 175 },
          phoneOrTablets && { width: 155 },
        ]}
      >
        <View style={style.imgContain}>
          <Image source={img} style={style.dealImg} />
        </View>

        <View style={style.dealContent}>
          <View>
            <Text
              style={{
                fontSize: 20,
                color: medColor,
                fontWeight: "bold",
                width: "95%",
              }}
            >
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
                marginTop: 2,
              }}
            >
              ??? {price}
            </Text>
          </View>
        </View>
        <View style={style.bottomContent}>
          <MaterialIcons name="arrow-forward" size={20} color={darkColor} />
        </View>

        <View style={style.topContent}>
          <Pressable
            style={[utilStyle.card, style.btn]}
            onPress={() => setFavourite(() => !favourite)}
          >
            <FontAwesome
              name={markedFavorite ? "heart" : favourite ? "heart" : "heart-o"}
              size={15}
              color={primaryColor}
            />
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const style = StyleSheet.create({
  dealCard: {
    borderRadius: 10,
    height: 245,
    // width: 160,
    width: Platform.OS === "web" ? 200 : 155,
    // width: Platform.OS === "web" ? 200 : 155,
  },
  imgContain: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  dealImg: {
    height: 120,
    width: 120,
  },
  dealContent: {
    position: "absolute",
    // position: "relative",
    bottom: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    // marginTop: 20,
    // marginTop: 30,
    marginTop: 50,
    paddingBottom: 13,
    // paddingVertical: 15,
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
