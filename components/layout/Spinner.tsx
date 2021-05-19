import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

import { primaryColor } from "../../styles/_variables";

const Spinner = () => {
  return (
    <View style={style.spinnerContain}>
      <ActivityIndicator color={primaryColor} size="large" />
    </View>
  );
};

const style = StyleSheet.create({
  spinnerContain: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Spinner;
