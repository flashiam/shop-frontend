import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  StatusBar,
  Image,
  Platform,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import "@expo/match-media";
import { useMediaQuery } from "react-responsive";

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
  // Media query
  const phoneOrTablets = useMediaQuery({ maxDeviceWidth: 768 });

  return (
    <ScrollView>
      <View style={utilStyle.container}>
        <View style={style.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" color={darkColor} size={30} />
          </Pressable>
        </View>
        <View
          style={[
            style.section,
            // Platform.OS === "web"
            //   ? phoneOrTablets
            //     ? { marginHorizontal: 0 }
            //     : { marginHorizontal: 100 }
            //   : { marginHorizontal: 0 },
          ]}
        >
          {/* <View
            style={[
              utilStyle.card,
              style.promoItem,
              Platform.OS === "web"
                ? phoneOrTablets
                  ? { marginHorizontal: 0 }
                  : { marginHorizontal: 100 }
                : { marginHorizontal: 0 },
            ]}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
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
              {Platform.OS === "web" && !phoneOrTablets && (
                <View>
                  <Pressable
                    android_ripple={{
                      color: secondaryColor,
                      borderless: true,
                    }}
                  >
                    <Text
                      style={{
                        color: primaryColor,
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        paddingRight: 10,
                        fontSize: 18,
                      }}
                    >
                      Apply
                    </Text>
                  </Pressable>
                </View>
              )}
            </View>
            {phoneOrTablets && (
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
            )}
          </View> */}
          <View
            style={[
              utilStyle.card,
              style.promoItem,
              Platform.OS === "web"
                ? phoneOrTablets
                  ? { marginHorizontal: 0 }
                  : { marginHorizontal: 100 }
                : { marginHorizontal: 0 },
            ]}
          >
            <View
              style={[
                {
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                },
                Platform.OS === "web" &&
                  !phoneOrTablets && {
                    alignItems: "center",
                    justifyContent: "space-around",
                    width: "100%",
                  },
              ]}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={style.promoImgContain}>
                  <Image source={couponImg} style={style.promoImg} />
                </View>
                <View
                  style={[
                    style.promoDesc,
                    Platform.OS === "web" &&
                      !phoneOrTablets && {
                        flexDirection: "row",
                        justifyContent: "space-around",
                        width: "70%",
                        marginLeft: 55,
                        alignItems: "center",
                      },
                  ]}
                >
                  <Text>
                    <Text style={{ fontWeight: "700", paddingRight: 5 }}>
                      Fresh Point:
                    </Text>
                    <Text style={{ color: medColor }}> joypashina007</Text>
                  </Text>
                  <View
                    style={[
                      style.points,
                      Platform.OS === "web" &&
                        !phoneOrTablets && { marginTop: 0, marginLeft: 55 },
                    ]}
                  >
                    <FontAwesome5 name="coins" size={14} color={medColor} />
                    <Text
                      style={[
                        { color: medColor, paddingLeft: 5 },
                        Platform.OS === "web" && { fontSize: 18 },
                      ]}
                    >
                      200
                    </Text>
                  </View>
                  {/* <Text
                    style={[
                      { fontWeight: "700", paddingRight: 5, width: 180 },
                      Platform.OS === "web" &&
                        !phoneOrTablets && { width: 400 },
                    ]}
                  >
                    Get 25% OFF up to ₹100 on your first buy
                  </Text>
                  <View
                    style={[
                      style.promocode,
                      Platform.OS === "web" &&
                        !phoneOrTablets && {
                          marginTop: 0,
                          marginLeft: 24,
                          padding: 10,
                        },
                    ]}
                  >
                    <Text
                      style={[
                        {
                          fontSize: 12,
                          color: medColor,
                          letterSpacing: 2,
                          textTransform: "uppercase",
                        },
                      ]}
                    >
                      FIRSTTIME
                    </Text>
                  </View> */}
                </View>
              </View>
              {Platform.OS === "web" && !phoneOrTablets && (
                <View>
                  <Pressable
                    android_ripple={{
                      color: secondaryColor,
                      borderless: true,
                    }}
                  >
                    <Text
                      style={{
                        color: primaryColor,
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        paddingRight: 10,
                        fontSize: 18,
                      }}
                    >
                      Apply
                    </Text>
                  </Pressable>
                </View>
              )}
            </View>
            {phoneOrTablets && (
              <View style={[style.applySection]}>
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
            )}
            {Platform.OS !== "web" && (
              <View style={[style.applySection]}>
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
            )}
          </View>

          <View
            style={[
              style.availContain,
              Platform.OS === "web"
                ? phoneOrTablets
                  ? { marginHorizontal: 0 }
                  : { marginHorizontal: 100 }
                : { marginHorizontal: 0 },
            ]}
          >
            <Text style={utilStyle.head}>Available Offers</Text>
            {/* 
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
            </View> */}

            <View style={[utilStyle.card, style.promoItem]}>
              <View
                style={[
                  {
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  },
                  Platform.OS === "web" &&
                    !phoneOrTablets && {
                      alignItems: "center",
                      justifyContent: "space-around",
                      width: "100%",
                    },
                ]}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={style.promoImgContain}>
                    <Image source={couponImg} style={style.promoImg} />
                  </View>
                  <View
                    style={[
                      style.promoDesc,
                      Platform.OS === "web" &&
                        !phoneOrTablets && {
                          flexDirection: "row",
                          justifyContent: "space-around",
                          width: "70%",
                          marginLeft: 55,
                          alignItems: "center",
                        },
                    ]}
                  >
                    <Text
                      style={[
                        { fontWeight: "700", paddingRight: 5, width: 180 },
                        Platform.OS === "web" &&
                          !phoneOrTablets && { width: 400 },
                      ]}
                    >
                      Get 25% OFF up to ₹100 on your first buy
                    </Text>
                    <View
                      style={[
                        style.promocode,
                        Platform.OS === "web" &&
                          !phoneOrTablets && {
                            marginTop: 0,
                            marginLeft: 24,
                            padding: 10,
                          },
                      ]}
                    >
                      <Text
                        style={[
                          {
                            fontSize: 12,
                            color: medColor,
                            letterSpacing: 2,
                            textTransform: "uppercase",
                          },
                        ]}
                      >
                        FIRSTTIME
                      </Text>
                    </View>
                  </View>
                </View>
                {Platform.OS === "web" && !phoneOrTablets && (
                  <View>
                    <Pressable
                      android_ripple={{
                        color: secondaryColor,
                        borderless: true,
                      }}
                    >
                      <Text
                        style={{
                          color: primaryColor,
                          fontWeight: "bold",
                          textTransform: "uppercase",
                          paddingRight: 10,
                          fontSize: 18,
                        }}
                      >
                        Apply
                      </Text>
                    </Pressable>
                  </View>
                )}
              </View>
              {phoneOrTablets && (
                <View style={[style.applySection]}>
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
              )}
              {Platform.OS !== "web" && (
                <View style={[style.applySection]}>
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
              )}
            </View>

            <View style={[utilStyle.card, style.promoItem]}>
              <View
                style={[
                  {
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  },
                  Platform.OS === "web" &&
                    !phoneOrTablets && {
                      alignItems: "center",
                      justifyContent: "space-around",
                      width: "100%",
                    },
                ]}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={style.promoImgContain}>
                    <Image source={couponImg} style={style.promoImg} />
                  </View>
                  <View
                    style={[
                      style.promoDesc,
                      Platform.OS === "web" &&
                        !phoneOrTablets && {
                          flexDirection: "row",
                          justifyContent: "space-around",
                          width: "70%",
                          marginLeft: 55,
                          alignItems: "center",
                        },
                    ]}
                  >
                    <Text
                      style={[
                        { fontWeight: "700", paddingRight: 5, width: 180 },
                        Platform.OS === "web" &&
                          !phoneOrTablets && { width: 400 },
                      ]}
                    >
                      Get 50% OFF up to ₹200 on exotic meat
                    </Text>
                    <View
                      style={[
                        style.promocode,
                        Platform.OS === "web" &&
                          !phoneOrTablets && {
                            marginTop: 0,
                            marginLeft: 24,
                            padding: 10,
                          },
                      ]}
                    >
                      <Text
                        style={[
                          {
                            fontSize: 12,
                            color: medColor,
                            letterSpacing: 2,
                            textTransform: "uppercase",
                          },
                        ]}
                      >
                        EXOTIC
                      </Text>
                    </View>
                  </View>
                </View>
                {Platform.OS === "web" && !phoneOrTablets && (
                  <View>
                    <Pressable
                      android_ripple={{
                        color: secondaryColor,
                        borderless: true,
                      }}
                    >
                      <Text
                        style={{
                          color: primaryColor,
                          fontWeight: "bold",
                          textTransform: "uppercase",
                          paddingRight: 10,
                          fontSize: 18,
                        }}
                      >
                        Apply
                      </Text>
                    </Pressable>
                  </View>
                )}
              </View>
              {phoneOrTablets && (
                <View style={[style.applySection]}>
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
              )}
              {Platform.OS !== "web" && (
                <View style={[style.applySection]}>
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
              )}
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
