import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { StackNavigationProp } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

import { fetchUserCredentials } from "../../actions/userActions";
import { RootStackParamList } from "../../App";

import { WebView } from "react-native-webview";

type AuthLoadScreenNavProp = StackNavigationProp<
  RootStackParamList,
  "AuthLoading"
>;

type Props = {
  navigation: AuthLoadScreenNavProp;
  user: {
    userRegistered: boolean;
    user: any;
  };
  fetchUserCredentials: Function;
};

const AuthLoading = ({ navigation }: Props) => {
  const isFocused = useIsFocused();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* <WebView 
        source={{html: }}
      /> */}
    </View>
  );
};

const mapStateToProps = (state: any) => ({
  user: state.user,
});

export default connect(mapStateToProps, { fetchUserCredentials })(AuthLoading);
