import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  StatusBar,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

import { RootStackParamList } from "../../App";

import utilStyle from "../../styles/utilStyle";
import {
  darkColor,
  lightColor,
  medColor,
  primaryColor,
  secondaryColor,
} from "../../styles/_variables";

import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import testAvatar from "../../img/test_avatar.jpg";
import google from "../../img/google.png";
import facebook from "../../img/facebook.png";
import messaging from "../../img/message.png";
import linkImg from "../../img/link.png";

type ReferScreenNavProp = StackNavigationProp<RootStackParamList, "Refer">;

type Props = {
  navigation: ReferScreenNavProp;
};

const Refer = ({ navigation }: Props) => {
  return (
    <ScrollView>
      <View style={utilStyle.container}>
        <View style={style.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" color={darkColor} size={30} />
          </Pressable>
        </View>
        <View style={style.section}>
          <View style={style.referHeader}>
            <Text style={[utilStyle.head, { paddingBottom: 0 }]}>
              Refer and earn
            </Text>
            <Pressable style={style.fredPoints}>
              <FontAwesome5
                name="coins"
                color={primaryColor}
                size={15}
                style={{ marginRight: 10 }}
              />
              <Text style={style.pointsTxt}>200</Text>
            </Pressable>
          </View>
          <View style={style.referSection}>
            <View style={style.outerCircle}>
              <View style={style.innerCircle}>
                <Image source={testAvatar} style={style.profilePic} />
              </View>
            </View>
            <View style={style.referContent}>
              <Text style={style.username}>joypashina007</Text>
              <Text style={style.desc}>
                Share this referal code with your friends to earn exciting
                fredpoints
              </Text>
            </View>
          </View>
          <View style={style.referFooter}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>Share</Text>
            <View style={style.shareOptions}>
              <Pressable style={style.shareItem}>
                <Image source={google} style={style.shareImg} />
              </Pressable>
              <Pressable style={style.shareItem}>
                <Image source={facebook} style={style.shareImg} />
              </Pressable>
              <Pressable style={style.shareItem}>
                <Image source={messaging} style={style.shareImg} />
              </Pressable>
              <Pressable style={style.shareItem}>
                <Image source={linkImg} style={style.shareImg} />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  header: {
    marginTop: StatusBar.currentHeight,
    paddingVertical: 15,
  },
  section: {
    marginTop: 10,
  },
  pointsTxt: {
    color: primaryColor,
    fontWeight: "bold",
    fontSize: 18,
  },
  referHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fredPoints: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  referSection: {
    marginTop: 40,
    display: "flex",
    alignItems: "center",
    paddingBottom: 55,
    borderBottomColor: secondaryColor,
    borderBottomWidth: 1,
  },
  outerCircle: {
    height: 150,
    width: 150,
    borderRadius: 100 / 1,
    // elevation: 10,
    // shadowColor: primaryColor,
    // shadowOpacity: 0.5,
    // shadowOffset: {
    //   height: 0,
    //   width: 0,
    // },
    // shadowRadius: 90,
    borderWidth: 1,
    borderColor: secondaryColor,
    // backgroundColor: lightColor,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    height: 100,
    width: 100,
    elevation: 5,
    shadowColor: primaryColor,
    shadowOpacity: 0.8,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    shadowRadius: 5,
    backgroundColor: lightColor,
    borderRadius: 100 / 2,
  },
  profilePic: {
    height: 80,
    width: 80,
    borderRadius: 100 / 2,
  },
  referContent: {
    marginTop: 20,
  },
  username: {
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
    paddingBottom: 10,
  },
  desc: {
    fontSize: 15,
    textAlign: "center",
    color: medColor,
    paddingHorizontal: 5,
    lineHeight: 25,
  },
  referFooter: {
    marginTop: 15,
  },
  shareOptions: {
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  shareItem: {
    backgroundColor: lightColor,
    padding: 15,
    borderRadius: 8,
  },
  shareImg: {
    height: 30,
    width: 30,
  },
});

export default Refer;
