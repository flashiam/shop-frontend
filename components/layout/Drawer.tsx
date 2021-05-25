import React from "react";
import {
  View,
  Image,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { FontAwesome5, MaterialIcons, AntDesign } from "@expo/vector-icons";

import {
  primaryColor,
  secondaryColor,
  darkColor,
  medColor,
} from "../../styles/_variables";

import testAvatar from "../../img/test_avatar.jpg";

type Props = {
  navigation: any;
  drawer: any;
};

const Drawer = ({ drawer, navigation }: Props) => {
  return (
    <View style={style.navContain}>
      <Pressable style={style.profileContain}>
        <Image source={testAvatar} style={style.profileAvatar} />
        <View style={style.profileDetails}>
          <Text style={style.userName}>Joy Pashina</Text>
          <Text style={style.userEmail}>joypashina32@gmail.com</Text>
        </View>
      </Pressable>

      <View style={style.navLinks}>
        <Pressable
          onPress={() => {
            drawer.current.closeDrawer();
            navigation.navigate("Orders");
          }}
          style={style.navLink}
          android_ripple={{ color: secondaryColor }}
        >
          <FontAwesome5 name="receipt" size={20} color={primaryColor} />
          <Text style={style.linkTxt}>My Orders</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            drawer.current.closeDrawer();
            navigation.navigate("Wishlist");
          }}
          style={style.navLink}
          android_ripple={{ color: secondaryColor }}
        >
          <FontAwesome5 name="shopping-bag" size={20} color={primaryColor} />
          <Text style={style.linkTxt}>Wishlist</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            drawer.current.closeDrawer();
            navigation.navigate("Support");
          }}
          style={style.navLink}
          android_ripple={{ color: secondaryColor }}
        >
          <MaterialIcons name="support-agent" size={20} color={primaryColor} />
          <Text style={style.linkTxt}>Support</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            drawer.current.closeDrawer();
            navigation.navigate("Refer");
          }}
          style={style.navLink}
          android_ripple={{ color: secondaryColor }}
        >
          <FontAwesome5 name="ticket-alt" size={20} color={primaryColor} />
          <Text style={style.linkTxt}>Refer and earn</Text>
        </Pressable>
      </View>

      <TouchableOpacity
        style={style.closeNavBtn}
        // android_ripple={{ color: secondaryColor, borderless: true }}
        onPress={() => drawer.current.closeDrawer()}
      >
        <AntDesign name="close" size={25} color={darkColor} />
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  navContain: {
    paddingTop: 120,
    margin: 0,
  },
  profileContain: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    marginLeft: 25,
  },
  profileAvatar: {
    height: 50,
    width: 50,
    borderRadius: 100 / 2,
  },
  profileDetails: {
    marginLeft: 15,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 25,
    paddingBottom: 3,
  },
  userEmail: {
    color: medColor,
  },
  navLinks: {
    marginTop: 50,
  },
  navLink: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 40,
    paddingVertical: 20,
  },
  linkTxt: {
    paddingLeft: 30,
    fontSize: 15,
    fontWeight: "700",
  },
  closeNavBtn: {
    position: "absolute",
    top: StatusBar.currentHeight,
    right: 30,
    paddingTop: 10,
  },
});

export default Drawer;
