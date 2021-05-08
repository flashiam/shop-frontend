import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Pressable,
  StatusBar,
  TextInput,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

import { RootStackParamList } from "../../App";

import { MaterialIcons, Entypo, Ionicons } from "@expo/vector-icons";

import utilStyle from "../../styles/utilStyle";
import {
  darkColor,
  lightColor,
  primaryColor,
  secondaryColor,
} from "../../styles/_variables";

import RadioButton from "../layout/RadioButton";

interface Option {
  value: string;
  label: string;
}

type SupportScreenNavProp = StackNavigationProp<RootStackParamList, "Support">;

type Props = {
  navigation: SupportScreenNavProp;
};

const options: Option[] = [
  {
    label: "I want a refund",
    value: "refund",
  },
  {
    label: "Talk to our executive",
    value: "executive",
  },
  {
    label: "I am unable to track my order",
    value: "order",
  },
];

const Support = ({ navigation }: Props) => {
  return (
    <View style={{ position: "relative", display: "flex", flex: 1 }}>
      <View style={utilStyle.container}>
        <View style={style.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" color={darkColor} size={30} />
          </Pressable>
        </View>
        <View style={style.section}>
          <Text style={utilStyle.head}>Support</Text>
          <ScrollView style={style.msgSection}>
            <View style={[utilStyle.card, style.msg]}>
              <Text style={style.time}>12:34</Text>
              <View style={style.msgContent}>
                <Text style={{ fontWeight: "bold" }}>How can we help you?</Text>
                <View style={style.option}>
                  <RadioButton options={options} />
                </View>
              </View>
            </View>
            <View style={[utilStyle.card, style.msg, style.right]}>
              <Text style={style.time}>12:36</Text>
              <View style={style.msgContent}>
                <Text>I want a refund</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
      <View style={[utilStyle.card, style.msgFooter]}>
        <TextInput style={style.msgInput} />
        <View style={style.btnContain}>
          <Pressable style={{ marginRight: 20 }}>
            <Entypo name="attachment" size={20} color={secondaryColor} />
          </Pressable>
          <Pressable style={style.sendBtn}>
            <Ionicons name="md-send-outline" size={20} color={lightColor} />
          </Pressable>
        </View>
      </View>
    </View>
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
  wishHead: {
    fontWeight: "bold",
  },
  wishlistContain: {
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
  msgFooter: {
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 0,
  },
  msg: {
    position: "relative",
    marginTop: 15,
    marginHorizontal: 5,
    borderRadius: 10,
    width: "85%",
    padding: 18,
  },
  time: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  btnContain: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  msgInput: {
    width: "60%",
  },
  sendBtn: {
    backgroundColor: primaryColor,
    padding: 8,
    borderRadius: 100 / 2,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  right: {
    transform: [{ translateX: 40 }],
  },
});

export default Support;
