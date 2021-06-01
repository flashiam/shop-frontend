import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  StatusBar,
  Share,
  Platform,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import "@expo/match-media";
import { useMediaQuery } from "react-responsive";
import { connect } from "react-redux";

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
  user: {
    userRegistered: boolean;
    userProfile: any;
  };
};

const Refer = ({
  navigation,
  user: { userRegistered, userProfile },
}: Props) => {
  // Media query
  const phoneOrTablets = useMediaQuery({ maxDeviceWidth: 768 });

  // Function to send referal manually
  const sendReferal = async () => {
    try {
      const res = await Share.share({
        title: "Earn Fred Points",
        message: "Invite friends to earn fred points",
        url: "https://www.fresh-fred/earn",
      });

      if (res.action === Share.sharedAction) {
        console.log("Referal send");
      } else if (res.action === Share.dismissedAction) {
        console.log("Referal dismissed");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView>
      <View style={[utilStyle.container]}>
        <View style={style.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" color={darkColor} size={30} />
          </Pressable>
        </View>
        <View style={[style.section]}>
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
          <View
            style={[
              style.referSection,
              {
                marginHorizontal:
                  Platform.OS === "web" ? (phoneOrTablets ? 0 : 400) : 0,
              },
            ]}
          >
            {/* <View
              style={[
                style.topShadow,
                {
                  height: 150,
                  width: 150,
                },
              ]}
            >
              <View
                style={[
                  style.bottomShadow,
                  {
                    height: 150,
                    width: 150,
                  },
                ]}
              >
                <View style={style.topShadow}>
                  <View style={style.bottomShadow}> */}
            <Image
              source={{ uri: userProfile.photoUrl }}
              style={style.profilePic}
            />
            {/* </View>
                </View> */}
            {/* </View> */}
            {/* </View> */}
            <View style={style.referContent}>
              <Text style={style.username}>{userProfile.email}</Text>
              <Text style={style.desc}>
                Share this referal code with your friends to earn exciting
                fredpoints
              </Text>
            </View>
          </View>
          <View
            style={[
              style.referFooter,
              {
                paddingHorizontal:
                  Platform.OS === "web" ? (phoneOrTablets ? 0 : 400) : 0,
                flexDirection:
                  Platform.OS === "web"
                    ? phoneOrTablets
                      ? "column"
                      : "row"
                    : "column",
              },
              Platform.OS === "web"
                ? phoneOrTablets
                  ? { flexDirection: "column" }
                  : {
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }
                : { flexDirection: "column" },
            ]}
          >
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>Share</Text>
            <View style={style.shareOptions}>
              <Pressable
                style={[
                  style.shareItem,
                  Platform.OS === "web" &&
                    !phoneOrTablets && { marginLeft: 20 },
                ]}
              >
                <Image source={google} style={style.shareImg} />
              </Pressable>
              <Pressable
                style={[
                  style.shareItem,
                  Platform.OS === "web" &&
                    !phoneOrTablets && { marginLeft: 20 },
                ]}
              >
                <Image source={facebook} style={style.shareImg} />
              </Pressable>
              <Pressable
                style={[
                  style.shareItem,
                  Platform.OS === "web" &&
                    !phoneOrTablets && { marginLeft: 20 },
                ]}
              >
                <Image source={messaging} style={style.shareImg} />
              </Pressable>
              <Pressable
                style={[
                  style.shareItem,
                  Platform.OS === "web" &&
                    !phoneOrTablets && { marginLeft: 20 },
                ]}
                onPress={() => sendReferal()}
              >
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
    marginTop: 90,
    display: "flex",
    alignItems: "center",
    paddingBottom: 55,
    borderBottomColor: secondaryColor,
    borderBottomWidth: 1,
    marginHorizontal: Platform.OS === "web" ? 400 : 0,
  },
  outerCircle: {
    height: 150,
    width: 150,
    borderRadius: 100 / 1,
    elevation: 3,
    shadowColor: primaryColor,
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 5,
      width: 12,
    },
    shadowRadius: 15,
    // borderWidth: 1,
    // borderColor: secondaryColor,
    backgroundColor: "transparent",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    height: 100,
    width: 100,
    elevation: 3,
    shadowColor: lightColor,
    shadowOpacity: 0.2,
    shadowOffset: {
      height: -6,
      width: -6,
    },
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    shadowRadius: 5,
    backgroundColor: "transparent",
    borderRadius: 100 / 2,
  },
  profilePic: {
    height: 120,
    width: 120,
    borderRadius: 100 / 1,
  },
  referContent: {
    marginTop: 20,

    paddingBottom: 50,
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
    paddingHorizontal: 30,
    lineHeight: 25,
  },
  referFooter: {
    marginTop: 15,
    paddingHorizontal: Platform.OS === "web" ? 400 : 0,
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
  topShadow: {
    elevation: 3,
    backgroundColor: "transparent",
    shadowOffset: {
      width: -6,
      height: -6,
    },
    shadowRadius: 5,
    shadowColor: lightColor,
    height: 100,
    width: 100,
    borderRadius: 100 / 1,
  },
  bottomShadow: {
    elevation: 3,
    backgroundColor: "transparent",
    shadowOffset: {
      width: 6,
      height: 6,
    },
    alignItems: "center",
    justifyContent: "center",
    shadowRadius: 4,
    shadowColor: primaryColor,
    shadowOpacity: 0.1,
    height: 100,
    width: 100,
    borderRadius: 100 / 1,
  },
});

const mapStateToProps = (state: any) => ({
  user: state.user,
});

export default connect(mapStateToProps, null)(Refer);
