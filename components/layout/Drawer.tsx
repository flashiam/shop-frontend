import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Image,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
} from "react-native";
import {
  FontAwesome5,
  MaterialIcons,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";

import { signOutUser, fetchUserCredentials } from "../../actions/userActions";

import {
  primaryColor,
  secondaryColor,
  darkColor,
  medColor,
  lightColor,
  bgColor,
} from "../../styles/_variables";

import testAvatar from "../../img/test_avatar.jpg";
import { DrawerRouter } from "@react-navigation/routers";

type Props = {
  navigation: any;
  drawer: any;
  food: { cartItems: Object; cartNum: number };
  user: { userRegistered: boolean; userProfile: any; authLoading: boolean };
  signOutUser: Function;
};

const Drawer = ({
  drawer,
  navigation,
  food: { cartItems, cartNum },
  user: { userRegistered, userProfile, authLoading },
  signOutUser,
}: Props) => {
  const initialMount = useRef<boolean>(true);

  // State for cart item num
  const [cartItemNum, setCartItemNum] = useState<number>(0);

  // State for user profile
  const [userData, setUserData] = useState<any>(null);

  // State for profile loading
  const [userLoading, setUserLoading] = useState<boolean>(false);

  // Function to get the total no. of cart items
  const getCartNo = async () => {
    try {
      const savedItems = await AsyncStorage.getItem("cart-items");
      if (savedItems) setCartItemNum(JSON.parse(savedItems).length);
    } catch (err) {
      console.log(err);
    }
  };

  // Function to fetch the profile data from async storage
  const fetchUserProfile = async () => {
    try {
      setUserLoading(true);

      const data = await AsyncStorage.getItem("user");

      if (data) {
        setUserData(JSON.parse(data));
      }

      setUserLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const updateCartNo = () => {
    setCartItemNum(cartNum);
  };

  useEffect(() => {
    if (initialMount.current) {
      getCartNo();
      initialMount.current = false;
    } else {
      updateCartNo();
    }

    fetchUserProfile();
  }, []);

  console.log(userData);
  return (
    <View style={style.navContain}>
      {userRegistered ? (
        <View style={{ marginLeft: 25 }}>
          <Pressable style={style.profileContain}>
            <Image
              source={{ uri: userProfile?.photoUrl }}
              style={style.profileAvatar}
            />

            <View style={style.profileDetails}>
              <Text style={style.userName}>{userProfile?.name}</Text>
              <Text style={style.userEmail}>{userProfile?.email}</Text>
            </View>
          </Pressable>
          <Pressable
            style={{
              marginTop: 5,
              borderWidth: 1,
              borderColor: bgColor,
              paddingVertical: 5,
              paddingHorizontal: 10,
              alignSelf: "flex-start",
              borderRadius: 5,
            }}
            onPress={() => {
              signOutUser();
            }}
          >
            <Text style={{ color: secondaryColor }}>Sign out</Text>
          </Pressable>
        </View>
      ) : (
        <View style={style.unauthContain}>
          <Text style={{ color: darkColor, fontWeight: "bold", fontSize: 18 }}>
            Hey, Buddy login to explore more !
          </Text>
          <Pressable
            style={style.loginBtn}
            onPress={() => {
              navigation.navigate("Login");
              drawer.current.closeDrawer();
            }}
          >
            <Text
              style={{ color: lightColor, fontSize: 16, textAlign: "center" }}
            >
              Sign in
            </Text>
          </Pressable>
        </View>
      )}

      <View style={style.navLinks}>
        {Platform.OS === "web" && (
          <Pressable
            onPress={() => {
              drawer.current.closeDrawer();
              navigation.navigate("CartWeb");
            }}
            style={style.navLink}
            android_ripple={{ color: secondaryColor }}
          >
            <MaterialCommunityIcons
              name="cart"
              size={20}
              color={primaryColor}
            />
            <View
              style={{
                width: "70%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={style.linkTxt}>Cart</Text>
              {cartNum > 0 && (
                <View style={style.cartNotification}>
                  <Text
                    style={{
                      color: lightColor,
                      fontSize: 10,
                      fontWeight: "bold",
                    }}
                  >
                    {cartNum}
                  </Text>
                </View>
              )}
            </View>
          </Pressable>
        )}
        <Pressable
          onPress={() => {
            if (userRegistered) {
              navigation.navigate("Login");
            } else {
              navigation.navigate("Orders");
            }
            drawer.current.closeDrawer();
          }}
          style={style.navLink}
          android_ripple={{ color: secondaryColor }}
        >
          <FontAwesome5 name="receipt" size={20} color={primaryColor} />
          <Text style={style.linkTxt}>My Orders</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            if (userRegistered) {
              navigation.navigate("Login");
            } else {
              navigation.navigate("Wishlist");
            }
            drawer.current.closeDrawer();
          }}
          style={style.navLink}
          android_ripple={{ color: secondaryColor }}
        >
          <FontAwesome5 name="shopping-bag" size={20} color={primaryColor} />
          <Text style={style.linkTxt}>Wishlist</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            if (userRegistered) {
              navigation.navigate("Login");
            } else {
              navigation.navigate("Support");
            }
            drawer.current.closeDrawer();
          }}
          style={style.navLink}
          android_ripple={{ color: secondaryColor }}
        >
          <MaterialIcons name="support-agent" size={20} color={primaryColor} />
          <Text style={style.linkTxt}>Support</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            if (!userRegistered) {
              navigation.navigate("Login");
            } else {
              navigation.navigate("Refer");
            }
            drawer.current.closeDrawer();
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
    // marginLeft: 25,
  },
  unauthContain: {
    // marginLeft: 25,
    paddingHorizontal: Platform.OS === "web" ? 20 : 0,
    alignItems: "center",
  },
  loginBtn: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: primaryColor,
    borderRadius: 8,
    marginTop: 15,
    width: "80%",
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
    top: Platform.OS === "web" ? 50 : StatusBar.currentHeight,
    right: 30,
    paddingTop: 10,
  },
  cartNotification: {
    backgroundColor: primaryColor,
    height: 20,
    width: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100 / 2,
    marginLeft: 10,
  },
});

// Function to map states to props
const mapStateToProps = (state: any) => ({
  food: state.food,
  user: state.user,
});

export default connect(mapStateToProps, { signOutUser })(Drawer);
