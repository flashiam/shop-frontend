import React from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Pressable,
  StatusBar,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

import { RootStackParamList } from "../../App";

import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

import utilStyle from "../../styles/utilStyle";
import {
  darkColor,
  medColor,
  primaryColor,
  secondaryColor,
} from "../../styles/_variables";

type OrdersScreenNavProp = StackNavigationProp<RootStackParamList, "Orders">;

type Props = {
  navigation: OrdersScreenNavProp;
};

const Orders = ({ navigation }: Props) => {
  return (
    <ScrollView>
      <View style={utilStyle.container}>
        <View style={style.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" color={darkColor} size={30} />
          </Pressable>
        </View>
        <View style={style.section}>
          <Text style={utilStyle.head}>My Orders</Text>
          <View style={[utilStyle.card, style.orderItem]}>
            <View style={style.orderDesc}>
              <Text style={style.orderHead}>Items</Text>
              <Text style={style.orderSubHead}>
                Chicken kadaknath (whole) 500 gm x 1
              </Text>
            </View>
            <View style={style.orderDesc}>
              <Text style={style.orderHead}>Ordered on</Text>
              <Text style={style.orderSubHead}>21 Aug 2020 | 2024</Text>
            </View>
            <View style={style.orderDesc}>
              <Text style={style.orderHead}>Total amount</Text>
              <Text style={style.orderSubHead}>₹ 169.00</Text>
            </View>
            <View style={style.orderFooter}>
              <Text style={style.status}>In progress</Text>
              <Pressable>
                <Text style={style.link}>Help</Text>
              </Pressable>
            </View>
          </View>
          <View style={[utilStyle.card, style.orderItem]}>
            <View style={style.orderDesc}>
              <Text style={style.orderHead}>Items</Text>
              <Text style={style.orderSubHead}>
                Chicken Drumstick (without skin) 500 gm x 1
              </Text>
            </View>
            <View style={style.orderDesc}>
              <Text style={style.orderHead}>Ordered on</Text>
              <Text style={style.orderSubHead}>10 Aug 2020 | 05:24</Text>
            </View>
            <View style={style.orderDesc}>
              <Text style={style.orderHead}>Total amount</Text>
              <Text style={style.orderSubHead}>₹ 230.34</Text>
            </View>
            <View style={style.orderFooter}>
              <Text style={style.status}>Delivered</Text>
              <Pressable
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="reload"
                  color={primaryColor}
                  style={{ paddingRight: 4 }}
                />
                <Text style={style.link}>Repeat order</Text>
              </Pressable>
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
  orderItem: {
    borderRadius: 15,
    marginTop: 15,
  },
  orderHead: {
    fontWeight: "bold",
  },
  orderSubHead: {
    color: medColor,
  },
  orderDesc: {
    marginBottom: 10,
  },
  orderFooter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: secondaryColor,
    marginTop: 5,
  },
  link: {
    color: primaryColor,
    fontWeight: "bold",
    fontSize: 15,
  },
  status: {
    fontWeight: "bold",
    color: medColor,
    fontSize: 15,
  },
});

export default Orders;
