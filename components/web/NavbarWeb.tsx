import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
} from "react-native";

import {
  AntDesign,
  Ionicons,
  FontAwesome,
  EvilIcons,
} from "@expo/vector-icons";

import appLogo from "../../img/app-logo-min 1.png";
import utilStyle from "../../styles/utilStyle";
import { primaryColor, secondaryColor } from "../../styles/_variables";

const NavbarWeb = ({ drawer }: any) => {
  return (
    <View style={style.navbar}>
      <Pressable style={style.logoContain}>
        <Image source={appLogo} style={style.logo} />
      </Pressable>

      <View style={[utilStyle.card, style.searchBar]}>
        <AntDesign name="search1" size={24} color={primaryColor} />
        <TextInput
          style={style.searchInput}
          placeholder="Search for products"
        />
      </View>

      <View style={[utilStyle.card, style.location]}>
        <Ionicons
          name="location-outline"
          size={24}
          color={primaryColor}
          style={style.locateIcon}
        />
        <Text style={style.locationCity}>Bhopal</Text>
        <FontAwesome
          name="sort-down"
          style={{ marginLeft: 10 }}
          color={primaryColor}
          size={15}
        />
      </View>

      <Pressable onPress={() => drawer.current.openDrawer()}>
        <EvilIcons name="navicon" size={35} color={primaryColor} />
      </Pressable>
    </View>
  );
};

const style = StyleSheet.create({
  navbar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  logo: {
    width: 150,
    height: 50,
  },
  searchBar: {
    position: "relative",
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    width: "60%",
  },
  searchInput: {
    marginLeft: 20,
  },
  location: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
  },
  locationCity: {
    marginLeft: 10,
  },
});

export default NavbarWeb;
