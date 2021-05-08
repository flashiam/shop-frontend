import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

import { primaryColor } from "../../styles/_variables";

interface Option {
  value: string;
  label: string;
}

type Props = {
  options: Option[];
};

const RadioButton = ({ options }: Props) => {
  const [selectedValue, setValue] = useState<string>("refund");

  return (
    <View>
      {options.map((option, i) => (
        <View key={i} style={style.radio}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setValue(option.value)}
            style={style.radioContain}
          >
            <View style={style.radioCircle}>
              {selectedValue === option.value && (
                <View style={style.radioChecked}></View>
              )}
            </View>
            <Text style={style.radioLabel}>{option.label}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const style = StyleSheet.create({
  radioContain: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  radio: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
  },
  radioCircle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 15,
    width: 15,
    backgroundColor: "transparent",
    borderRadius: 100 / 2,
    borderWidth: 2,
    borderColor: primaryColor,
    padding: 5,
  },
  radioChecked: {
    height: 5,
    width: 5,
    borderRadius: 100 / 2,
    backgroundColor: primaryColor,
  },
  radioLabel: {
    paddingLeft: 10,
    fontSize: 15,
  },
});

export default RadioButton;
