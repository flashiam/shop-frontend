import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  StatusBar,
  ActivityIndicator,
  Platform,
} from "react-native";
import * as Google from "expo-google-app-auth";
import { StackNavigationProp } from "@react-navigation/stack";
import { connect } from "react-redux";

import "@expo/match-media";
import { useMediaQuery } from "react-responsive";

import { registerUser, fetchUserCredentials } from "../../actions/userActions";

import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import utilStyle from "../../styles/utilStyle";
import {
  primaryColor,
  darkColor,
  medColor,
  lightColor,
  secondaryColor,
} from "../../styles/_variables";

import { RootStackParamList } from "../../App";

type LoginScreenNavProp = StackNavigationProp<RootStackParamList, "Login">;

type Props = {
  navigation: LoginScreenNavProp;
  registerUser: Function;
  fetchUserCredentials: Function;
};

const Login = ({ navigation, registerUser, fetchUserCredentials }: Props) => {
  // State for the login page loading
  const [loginLoading, setLoading] = useState<boolean>(false);
  const phoneOrTablets = useMediaQuery({ maxWidth: 768 });

  const registerTheUser = () => {
    registerUser();
    navigation.navigate("Home");
  };

  //   useEffect(() => {
  //     fetchUserCredentials();
  //   }, []);

  return (
    <View
      style={{
        position: "relative",
        flex: 1,
        // marginTop: StatusBar.currentHeight,
        // paddingTop: 20,
        justifyContent: "center",
      }}
    >
      <View style={utilStyle.container}>
        <View style={style.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" color={darkColor} size={30} />
          </Pressable>
        </View>
        <View style={style.loginHeader}>
          <View style={style.testLogo}></View>
          <Text style={{ color: darkColor, fontSize: 24, fontWeight: "bold" }}>
            Sign in to <Text style={{ color: primaryColor }}>Fresh Fred</Text>
          </Text>
        </View>

        <Pressable
          style={[
            style.signInBtn,
            {
              width:
                Platform.OS === "web"
                  ? phoneOrTablets
                    ? "100%"
                    : "30%"
                  : "100%",
            },
          ]}
          onPress={() => registerTheUser()}
        >
          <AntDesign name="google" color={lightColor} size={15} />
          <Text
            style={{
              color: lightColor,
              paddingLeft: 10,
              fontSize: 15,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Sign in with google
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  header: {
    position: "absolute",
    top: -200,
    // marginTop: StatusBar.currentHeight,
    paddingVertical: 15,
  },
  loginHeader: {
    alignItems: "center",
    // marginTop: 30,
  },
  testLogo: {
    height: 60,
    width: 60,
    backgroundColor: secondaryColor,
    borderRadius: 8,
    marginBottom: 20,
  },
  signInBtn: {
    paddingVertical: 16,
    paddingHorizontal: 10,
    backgroundColor: primaryColor,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: 45,
  },
});

export default connect(null, { registerUser, fetchUserCredentials })(Login);
