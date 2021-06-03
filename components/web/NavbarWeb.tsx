import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
} from "react-native";
import { connect } from "react-redux";

import {
  AntDesign,
  Ionicons,
  FontAwesome,
  EvilIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import appLogo from "../../img/app-logo-min 1.png";
import utilStyle from "../../styles/utilStyle";
import { lightColor, primaryColor, bgColor } from "../../styles/_variables";

import { getCartNo, openLocation } from "../../actions/foodActions";

type Props = {
  drawer: any;
  food?: { cartItems: any; cartNum: any };
  getCartNo: Function;
  openLocation: Function;
  navigation?: any;
  openLocationModal: any;
};

const NavbarWeb = ({
  drawer,
  food: { cartItems, cartNum },
  getCartNo,
  navigation,
  openLocationModal,
  openLocation,
}: Props) => {
  const [cartItemNum, setItemNum] = useState<number>(0);
  const [city, setCity] = useState<string>("");
  // State for the search keyword
  const [search, setSearch] = useState<string>("");

  const fetchAddress = async () => {
    try {
      const savedAddress = await AsyncStorage.getItem("user-address");
      if (savedAddress) setCity(JSON.parse(savedAddress).components.city);
    } catch (err) {
      console.log(err);
    }
  };

  // Function to search for the product
  const searchTheProduct = (keyword: string) => {
    setSearch(keyword);
    // Redirect to the search page
    if (search !== "") {
      navigation.navigate("ProductSearch", { keyword: search });
    }
    // Clear the search
    setSearch("");
  };

  useEffect(() => {
    // getCartNo();
    fetchAddress();
  }, []);

  return (
    <View style={style.navbar}>
      <Pressable
        style={style.logoContain}
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <Image source={appLogo} style={style.logo} />
      </Pressable>

      <View style={[utilStyle.card, style.searchBar]}>
        <AntDesign name="search1" size={24} color={primaryColor} />
        <TextInput
          style={style.searchInput}
          value={search}
          onChange={e => setSearch(e.nativeEvent.text)}
          onSubmitEditing={() => searchTheProduct(search)}
          placeholder="Search for products"
        />
      </View>

      <Pressable
        style={[utilStyle.card, style.location]}
        onPress={() => openLocation()}
      >
        <Ionicons
          name="location-outline"
          size={24}
          color={primaryColor}
          style={style.locateIcon}
        />
        <Text style={style.locationCity}>Home</Text>
        <FontAwesome
          name="sort-down"
          style={{ marginLeft: 10 }}
          color={primaryColor}
          size={15}
        />
      </Pressable>

      <Pressable
        onPress={() => drawer.current.openDrawer()}
        style={{ position: "relative" }}
      >
        <EvilIcons name="navicon" size={35} color={primaryColor} />
        {cartNum > 0 && (
          <View style={style.cartNotification}>
            <Text style={{ color: lightColor, fontSize: 10 }}>{cartNum}</Text>
          </View>
        )}
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
  cartNotification: {
    position: "absolute",
    padding: 8,
    height: 13,
    width: 13,
    borderWidth: 3,
    borderColor: bgColor,
    borderRadius: 100 / 2,
    backgroundColor: primaryColor,
    justifyContent: "center",
    alignItems: "center",
    top: -2,
  },
});

// Function to map states to props
const mapStateToProps = (state: any) => ({
  food: state.food,
});

export default connect(mapStateToProps, { getCartNo, openLocation })(NavbarWeb);
