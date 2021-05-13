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
} from "react-native";
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

  // State for the delivery status
  const [delivery, setDelivery] = useState<number>(1);
  const [status] = useState<DeliveryStat[]>([
    {
      id: 1,
      title: `“Your order has been accepted”`,
      desc:
        "We are preparing it for you! Sit back and relax you will get notified once it goes for delivery.",
      img: orderImg1,
    },
    {
      id: 2,
      title: `“Your order is out for delivery”`,
      desc:
        "Our delivery agent is on its way to deliver you order at your doors.",
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
    <ScrollView>
      <View style={[style.scrollContainer, { height: windowHeight - 30 }]}>
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
                  style={[style.loadingScreen, { width: windowWidth }]}
                >
                  <View style={style.imgContain}>
                    <Image source={stat.img} style={style.orderImg} />
                  </View>
                  <View style={style.orderContent}>
                    <Text style={style.headMsg}>{stat.title}</Text>
                    <Text style={style.orderMsg}>{stat.desc}</Text>
                  </View>
                  <View style={style.orderStateContain}>
                    <View>
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
                    <View>
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
                    <View>
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
                </View>
              ))}
        </ScrollView>
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
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  scrollContainer: {
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
    marginTop: 50,
  },
  imgContain: {
    marginTop: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  orderStateContain: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
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
    display: "flex",
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