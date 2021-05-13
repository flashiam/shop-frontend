import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  StatusBar,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

import { RootStackParamList } from "../../App";

import { MaterialIcons } from "@expo/vector-icons";
import utilStyle from "../../styles/utilStyle";
import { darkColor } from "../../styles/_variables";

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
        <View style={style.section}></View>
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
});

export default Promo;
