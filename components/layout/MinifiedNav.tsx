import React, { useState, useRef } from "react";
import {
  Text,
  View,
  TouchableWithoutFeedback,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native";

import { AntDesign, MaterialIcons, EvilIcons } from "@expo/vector-icons";

import {
  darkColor,
  primaryColor,
  secondaryColor,
} from "../../styles/_variables";
import utilStyle from "../../styles/utilStyle";

type Props = {
  navigation: any;
  drawer: any;
};

const MinifiedNav = ({ navigation, drawer }: Props) => {
  const srchInput = useRef<HTMLAllCollection>(null);

  const [searchOpened, setSearch] = useState<boolean>(false);

  return (
    <Pressable style={style.nav} onPress={() => setSearch(false)}>
      {/* Back btn */}
      <TouchableWithoutFeedback
        style={style.leftContent}
        onPress={() => navigation.goBack()}
        // android_ripple={{ color: secondaryColor, borderless: true }}
      >
        <MaterialIcons name="arrow-back" size={30} color={darkColor} />
      </TouchableWithoutFeedback>
      <View style={style.rightContent}>
        {/* Search bar */}
        <Pressable
          style={[
            utilStyle.card,
            style.searchBar,
            { width: searchOpened ? 230 : "auto" },
          ]}
          onPress={() => {
            setSearch(true);
            if (srchInput.current) {
              srchInput.current.focus();
            }
          }}
        >
          <AntDesign name="search1" color={primaryColor} size={24} />
          <TextInput
            ref={srchInput}
            style={[
              style.searchInput,
              { display: searchOpened ? "flex" : "none" },
            ]}
            onBlur={() => setSearch(false)}
          />
        </Pressable>

        {/* Navbar btn */}
        <Pressable
          onPress={() => {
            drawer?.current.openDrawer();
          }}
          android_ripple={{
            color: secondaryColor,
            borderless: true,
          }}
        >
          <EvilIcons name="navicon" size={35} color={primaryColor} />
        </Pressable>
      </View>
    </Pressable>
  );
};

const style = StyleSheet.create({
  nav: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 30,
  },
  leftContent: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  rightContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  locationTxt: {
    color: secondaryColor,
    paddingLeft: 10,
  },
  searchBar: {
    position: "relative",
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    padding: 10,
    marginRight: 15,
    alignItems: "center",
    width: "auto",
    // width: 230,
  },
  searchInput: {
    height: 20,
    width: 150,
    marginLeft: 10,
  },
});

export default MinifiedNav;
