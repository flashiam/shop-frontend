import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Animated,
  ScrollView,
  SafeAreaView,
  Image,
  StatusBar,
  Pressable,
  Platform,
} from "react-native";
import "@expo/match-media";
import { useMediaQuery } from "react-responsive";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";

import {
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
  Entypo,
  FontAwesome,
} from "@expo/vector-icons";

import orderImg1 from "../../img/orderImg1.png";
import orderImg2 from "../../img/orderImg2.png";
import orderImg3 from "../../img/orderImg3.png";
import {
  darkColor,
  lightColor,
  medColor,
  primaryColor,
  secondaryColor,
} from "../../styles/_variables";
import utilStyle from "../../styles/utilStyle";

interface DeliveryStat {
  id: number;
  title: string;
  desc: string;
  img: string;
}

type OrderLoadScreenNavProp = StackNavigationProp<
  RootStackParamList,
  "OrderLoading"
>;

type Props = {
  navigation: OrderLoadScreenNavProp;
};

const OrderLoading = ({ navigation }: Props) => {
  const { width: windowWidth } = useWindowDimensions();
  const { height: windowHeight } = useWindowDimensions();
  const anim = useRef<any>(new Animated.Value(0)).current;
  // Media query
  const phoneOrTablets = useMediaQuery({ maxDeviceWidth: 768 });

  // State for the delivery status
  const [delivery, setDelivery] = useState<number>(1);
  const [status] = useState<DeliveryStat[]>([
    {
      id: 1,
      title: `“Your order has been accepted”`,
      desc: "We are preparing it for you! Sit back and relax you will get notified once it goes for delivery.",
      img: orderImg1,
    },
    {
      id: 2,
      title: `“Your order is out for delivery”`,
      desc: "Our delivery agent is on its way to deliver you order at your doors.",
      img: orderImg2,
    },
    {
      id: 3,
      title: `“Your order has been delivered”`,
      desc: "Please rate the order, your feedbacks really matter to us!",
      img: orderImg3,
    },
  ]);

  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    Animated.timing(anim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [anim]);

  // Component for the order loading screen

  const scroll = useRef(null);
  return (
    // <ScrollView>
    <View style={[style.scrollContainer, { height: windowHeight }]}>
      <ScrollView
        ref={scroll}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={1}
      >
        {status &&
          status
            .filter(stat => stat.id === delivery)
            .map(stat => (
              <View
                key={stat.id}
                style={[
                  style.loadingScreen,
                  { width: windowWidth, height: "100%" },
                  Platform.OS === "web"
                    ? phoneOrTablets
                      ? { flexDirection: "column" }
                      : {
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }
                    : { flexDirection: "column" },
                ]}
              >
                <View style={style.imgContain}>
                  <Image
                    source={stat.img}
                    style={[
                      style.orderImg,
                      Platform.OS === "web"
                        ? phoneOrTablets
                          ? { height: 188, width: "70%" }
                          : { height: 500, width: 650 }
                        : { height: 188, width: "70%" },
                    ]}
                  />
                </View>
                <View>
                  <View style={style.orderContent}>
                    <Text style={style.headMsg}>{stat.title}</Text>
                    <Text style={style.orderMsg}>{stat.desc}</Text>
                  </View>
                  <View
                    style={[
                      style.orderStateContain,
                      Platform.OS === "web"
                        ? phoneOrTablets
                          ? {
                              position: "absolute",
                              bottom: -150,
                              justifyContent: "space-between",
                            }
                          : {
                              position: "relative",
                              width: "100%",
                              alignItems: "center",
                              justifyContent: "center",
                              bottom: 0,
                            }
                        : {
                            position: "absolute",
                            bottom: -150,
                            justifyContent: "space-between",
                          },
                    ]}
                  >
                    <View
                      style={
                        Platform.OS === "web" &&
                        !phoneOrTablets && { marginHorizontal: 20 }
                      }
                    >
                      <View style={style.timingContain}>
                        <Feather name="clock" color={primaryColor} size={15} />
                        <Text style={style.timeTaking}>09:30</Text>
                      </View>
                      <View style={[style.stateItem, style.activeState]}>
                        <MaterialCommunityIcons
                          name="package"
                          color={lightColor}
                          size={25}
                        />
                      </View>
                    </View>
                    <View style={style.progressBar}></View>
                    <View
                      style={
                        Platform.OS === "web" &&
                        !phoneOrTablets && { marginHorizontal: 20 }
                      }
                    >
                      <View style={[style.timingContain, { opacity: 0 }]}>
                        <Feather name="clock" color={primaryColor} size={15} />
                        <Text style={style.timeTaking}>09:30</Text>
                      </View>
                      <View style={[style.stateItem]}>
                        <MaterialIcons
                          name="delivery-dining"
                          color={secondaryColor}
                          size={25}
                        />
                      </View>
                    </View>
                    <View style={style.progressBar}></View>
                    <View
                      style={
                        Platform.OS === "web" &&
                        !phoneOrTablets && { marginHorizontal: 20 }
                      }
                    >
                      <View style={[style.timingContain, { opacity: 0 }]}>
                        <Feather name="clock" color={primaryColor} size={15} />
                        <Text style={style.timeTaking}>09:30</Text>
                      </View>
                      <View style={style.stateItem}>
                        <FontAwesome
                          name="shopping-basket"
                          color={secondaryColor}
                          size={25}
                        />
                      </View>
                    </View>
                  </View>
                  {Platform.OS === "web" && !phoneOrTablets && (
                    <View
                      style={{
                        marginTop: 150,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Pressable onPress={() => navigation.navigate("Receipt")}>
                        <Text
                          style={[
                            style.recieptTxt,
                            { fontSize: 18, marginBottom: 15 },
                          ]}
                        >
                          View receipt
                        </Text>
                      </Pressable>
                      <Pressable
                        style={[style.homeBtn]}
                        onPress={() => navigation.navigate("Home")}
                      >
                        <Entypo name="home" color={lightColor} size={20} />
                        <Text style={style.btnLabel}>Go to home</Text>
                      </Pressable>
                    </View>
                  )}
                </View>
              </View>
            ))}
      </ScrollView>
      {Platform.OS === "web" ? (
        phoneOrTablets ? (
          <View style={[utilStyle.card, style.loadingFooter]}>
            <Pressable onPress={() => navigation.navigate("Receipt")}>
              <Text style={style.recieptTxt}>View receipt</Text>
            </Pressable>
            <Pressable
              style={style.homeBtn}
              onPress={() => navigation.navigate("Home")}
            >
              <Entypo name="home" color={lightColor} size={20} />
              <Text style={style.btnLabel}>Go to home</Text>
            </Pressable>
          </View>
        ) : null
      ) : (
        <View style={[utilStyle.card, style.loadingFooter]}>
          <Pressable onPress={() => navigation.navigate("Receipt")}>
            <Text style={style.recieptTxt}>View receipt</Text>
          </Pressable>
          <Pressable
            style={style.homeBtn}
            onPress={() => navigation.navigate("Home")}
          >
            <Entypo name="home" color={lightColor} size={20} />
            <Text style={style.btnLabel}>Go to home</Text>
          </Pressable>
        </View>
      )}
    </View>
    // </ScrollView>
  );
};

const style = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    paddingVertical: 25,
    position: "relative",
  },
  card: {
    padding: 15,
    backgroundColor: "purple",
    marginRight: 10,
  },
  loadingScreen: {
    paddingHorizontal: 20,
  },
  orderImg: {
    height: 188,
    width: "70%",
  },
  headMsg: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  orderMsg: {
    fontSize: 16,
    color: medColor,
    textAlign: "center",
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  orderContent: {
    marginTop: 15,
  },
  imgContain: {
    marginTop: 30,
    padding: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  orderStateContain: {
    position: "absolute",
    alignSelf: "center",
    bottom: 150,
    display: "flex",
    width: "100%",
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    marginTop: 20,
  },
  timingContain: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
  },
  stateItem: {
    backgroundColor: lightColor,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 13,
    borderRadius: 8,
    marginTop: 10,
  },
  activeState: {
    backgroundColor: primaryColor,
    transform: [{ scale: 1.2 }],
  },
  timeTaking: {
    paddingLeft: 5,
    color: secondaryColor,
  },
  loadingFooter: {
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "100%",
    // display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 0,
    paddingHorizontal: 20,
  },
  recieptTxt: {
    color: darkColor,
    textDecorationColor: darkColor,
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  homeBtn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: primaryColor,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  btnLabel: {
    color: lightColor,
    fontWeight: "bold",
    fontSize: 18,
    paddingLeft: 10,
  },
  progressBar: {
    width: 50,
    height: 2,
    borderStyle: "dashed",
    borderTopWidth: 1,
    borderTopColor: secondaryColor,
    transform: [{ translateY: 22 }],
  },
  activeProgress: {
    borderTopColor: primaryColor,
  },
});

export default OrderLoading;
