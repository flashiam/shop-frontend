import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  StatusBar,
  Image,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

import { RootStackParamList } from "../../App";

import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import utilStyle from "../../styles/utilStyle";
import {
  darkColor,
  medColor,
  primaryColor,
  secondaryColor,
} from "../../styles/_variables";

import couponImg from "../../img/promo-coin.png";
// import testAvatar from "../../img/test_avatar.jpg";

type PromoNavScreenProp = StackNavigationProp<RootStackParamList, "Promo">;

type Props = {
  navigation: PromoNavScreenProp;
};

const Promo = ({ navigation }: Props) => {
  return (
    <ScrollView>
      <View style={utilStyle.container}>
        <View style={style.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" color={darkColor} size={30} />
          </Pressable>
        </View>
        <View style={style.section}>
          <View style={[utilStyle.card, style.promoItem]}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View style={style.promoImgContain}>
                <Image source={couponImg} style={style.promoImg} />
              </View>
              <View style={style.promoDesc}>
                <Text>
                  <Text style={{ fontWeight: "700", paddingRight: 5 }}>
                    Fresh Point:
                  </Text>
                  <Text style={{ color: medColor }}> joypashina007</Text>
                </Text>
                <View style={style.points}>
                  <FontAwesome5 name="coins" size={14} color={medColor} />
                  <Text style={{ color: medColor, paddingLeft: 5 }}>200</Text>
                </View>
              </View>
            </View>
            <View style={style.applySection}>
              <Pressable
                android_ripple={{ color: secondaryColor, borderless: true }}
              >
                <Text
                  style={{
                    color: primaryColor,
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    // paddingRight: 10,
                  }}
                >
                  Apply
                </Text>
              </Pressable>
            </View>
          </View>

          <View style={style.availContain}>
            <Text style={utilStyle.head}>Available Offers</Text>

            <View style={[utilStyle.card, style.promoItem]}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View style={style.promoImgContain}>
                  <Image source={couponImg} style={style.promoImg} />
                </View>
                <View style={style.promoDesc}>
                  <Text
                    style={{ fontWeight: "700", paddingRight: 5, width: 180 }}
                  >
                    Get 25% OFF up to ₹100 on your first buy
                  </Text>
                  <View style={style.promocode}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: medColor,
                        letterSpacing: 2,
                      }}
                    >
                      FIRSTTIME
                    </Text>
                  </View>
                </View>
              </View>
              <View style={style.applySection}>
                <Pressable
                  android_ripple={{ color: secondaryColor, borderless: true }}
                >
                  <Text
                    style={{
                      color: primaryColor,
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      paddingRight: 10,
                    }}
                  >
                    Apply
                  </Text>
                </Pressable>
              </View>
            </View>

            <View style={[utilStyle.card, style.promoItem]}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View style={style.promoImgContain}>
                  <Image source={couponImg} style={style.promoImg} />
                </View>
                <View style={style.promoDesc}>
                  <Text
                    style={{ fontWeight: "700", paddingRight: 5, width: 180 }}
                  >
                    Get 50% OFF up to ₹200 on exotic meet
                  </Text>
                  <View style={style.promocode}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: medColor,
                        letterSpacing: 2,
                        textTransform: "uppercase",
                      }}
                    >
                      EXOTIC
                    </Text>
                  </View>
                </View>
              </View>
              <View style={style.applySection}>
                <Pressable
                  android_ripple={{ color: secondaryColor, borderless: true }}
                >
                  <Text
                    style={{
                      color: primaryColor,
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      paddingRight: 10,
                    }}
                  >
                    Apply
                  </Text>
                </Pressable>
              </View>
            </View>
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
  section: {
    marginTop: 10,
  },
  promoItem: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    // alignItems: "center",
    borderRadius: 10,
    padding: 0,
    paddingVertical: 18,
  },
  promoImgContain: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  promoImg: {
    height: 65,
    width: 60,
    borderRadius: 8,
  },
  promoDesc: {
    marginLeft: 20,
  },
  points: {
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  promocode: {
    marginTop: 15,
    backgroundColor: "#FFE7E7",
    width: "60%",
    padding: 3,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderStyle: "dashed",
    borderColor: primaryColor,
    borderWidth: 1,
  },
  applySection: {
    display: "flex",
    justifyContent: "flex-end",
  },
  availContain: {
    marginTop: 30,
  },
});

export default Promo;
