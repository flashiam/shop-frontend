import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  DrawerLayoutAndroid,
  Button,
} from "react-native";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import { secondaryColor } from "../../styles/_variables";

const Navbar = () => {
  // Drawer ref
  const drawer = useRef<any>(null);

  // State to control side nav
  const [navOpened, setNav] = useState<Boolean>(false);

  // Navigation view
  const navigationView = () => {
    return (
      <View>
        <Text>Hello Drawer</Text>
      </View>
    );
  };

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition="right"
      renderNavigationView={navigationView}
    >
      <View style={style.nav}>
        {/* Access location */}
        <Pressable onPress={() => console.log("location")}>
          <View style={style.leftContent}>
            <Ionicons
              name="location-outline"
              size={30}
              color={secondaryColor}
              style={style.locateIcon}
            />
            <View>
              <Text
                style={[
                  style.locationTxt,
                  { fontWeight: "bold", fontSize: 18 },
                ]}
              >
                Bhopal
              </Text>
              <Text style={style.locationTxt}>
                10 no. market near arera colony...
              </Text>
            </View>
          </View>
        </Pressable>
        {/* Navbar btn */}
        <Button
          onPress={() => {
            drawer.current.openDrawer();
          }}
          android_ripple={{
            color: secondaryColor,
            borderless: true,
          }}
        >
          <EvilIcons name="navicon" size={35} color="red" />
        </Button>
      </View>
    </DrawerLayoutAndroid>
  );
};

const style = StyleSheet.create({
  nav: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 50,
  },
  leftContent: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  locationTxt: {
    color: secondaryColor,
    paddingLeft: 10,
  },
  locateIcon: {
    fontSize: 30,
  },
});

export default Navbar;
