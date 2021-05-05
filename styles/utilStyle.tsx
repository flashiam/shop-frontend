import { StyleSheet, Platform } from "react-native";
import { lightColor, primaryColor, darkColor } from "../styles/_variables";

const utilStyle = StyleSheet.create({
  container: {
    width: Platform.OS === "web" ? "50%" : "90%",
    marginLeft: "auto",
    marginRight: "auto",
    paddingBottom: 100,
  },
  card: {
    elevation: 3,
    backgroundColor: lightColor,
    marginBottom: 5,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowRadius: 20,
    shadowColor: primaryColor,
    shadowOpacity: 0.1,
    padding: 15,
  },
  head: {
    color: darkColor,
    fontWeight: "700",
    paddingBottom: 10,
    fontSize: 20,
    // fontFamily: "poppins",
  },
  mt1: {
    marginTop: 40,
  },
  myFont: {
    fontFamily: "Poppins-Regular",
  },
});

export default utilStyle;
