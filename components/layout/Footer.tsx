import React from "react";
import { Text, View, StyleSheet, Platform } from "react-native";
import { primaryColor, lightColor } from "../../styles/_variables";

const Footer = () => {
  return (
    <View style={style.footer}>
      <Text
        style={{
          color: lightColor,
          textAlign: "center",
          fontSize: Platform.OS === "web" ? 12 : 10,
        }}
      >
        Copyright &copy; 2020 B2C Foods Pvt. Ltd. All Rights Reserved
      </Text>
    </View>
  );
};

const style = StyleSheet.create({
  footer: {
    position: "absolute",
    padding: Platform.OS === "web" ? 14 : 15,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: primaryColor,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
});

export default Footer;
