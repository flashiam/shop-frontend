import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

import { RootStackParamList } from "../../App";

// type RedirectScreenNavProp = StackNavigationProp<
//   RootStackParamList,
//   "RedirectPage"
// >;

type Props = {
  navigation: any;
};

const RedirectPage = ({ navigation }: Props) => {
  // Function to redirect to login page
  const redirectToLogin = () => {
    navigation.navigate("Login");
  };

  useEffect(() => {
    redirectToLogin();
  });

  return (
    <View>
      <Text>Redirecting to login...</Text>
    </View>
  );
};

export default RedirectPage;
