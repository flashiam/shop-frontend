import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  StatusBar,
  TextInput,
} from "react-native";
import { connect } from "react-redux";
import { Ionicons, EvilIcons, AntDesign } from "@expo/vector-icons";

import { openLocation } from "../../actions/foodActions";

import { secondaryColor, primaryColor } from "../../styles/_variables";
import utilStyle from "../../styles/utilStyle";

type Props = {
  drawer: any;
  openLocation: Function;
};

const NavbarMobo = ({ drawer, openLocation }: Props) => {
  return (
    <View>
      <View style={style.nav}>
        {/* Access location */}
        <Pressable onPress={() => openLocation()}>
          <View style={style.leftContent}>
            <Ionicons
              name="location-outline"
              size={30}
              color={primaryColor}
              style={style.locateIcon}
            />
            <View>
              <Text
                style={[
                  style.locationTxt,
                  { fontWeight: "bold", fontSize: 18 },
                ]}
              >
                Home
              </Text>
              {/* <Text style={style.locationTxt}>
                10 no. market near arera colony...
              </Text> */}
            </View>
          </View>
        </Pressable>
        {/* Navbar btn */}
        <Pressable
          onPress={() => drawer?.current.openDrawer()}
          // android_ripple={{
          //   color: secondaryColor,
          //   borderless: true,
          // }}
        >
          <EvilIcons name="navicon" size={35} color="red" />
        </Pressable>
      </View>
      <View style={[utilStyle.card, style.searchBar]}>
        <AntDesign name="search1" size={24} color={primaryColor} />
        <TextInput
          style={style.searchInput}
          placeholder="Search for products"
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  nav: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: StatusBar.currentHeight,
    paddingTop: 10,
    paddingBottom: 5,
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
  searchBar: {
    marginTop: 20,
    position: "relative",
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
  },
  searchInput: {
    marginLeft: 20,
  },
});

export default connect(null, { openLocation })(NavbarMobo);
