import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
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
} from "../../styles/_variables";

import { MaterialIcons } from "@expo/vector-icons";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

type ReceiptScreenNavProp = StackNavigationProp<RootStackParamList, "Receipt">;

type Props = {
  navigation: ReceiptScreenNavProp;
};

const Receipt = ({ navigation }: Props) => {
  const [rating, setRating] = useState<any>(1);

  const mappedEmoji: any = {
    "1": "😭",
    "2": "😬",
    "3": "🙂",
    "4": "🤩",
    "5": "🤯",
  };

  return (
    <ScrollView>
      <View style={utilStyle.container}>
        <View style={style.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" color={darkColor} size={30} />
          </Pressable>
        </View>
        <View style={style.section}>
          <Text style={utilStyle.head}>Order Summary</Text>
          <View style={[utilStyle.card, style.billCard]}>
            <Text style={style.subhead}>Items</Text>
            <Text style={style.lead}>Chicken kadaknath (whole) 500 gm</Text>
            <View>
              <View style={style.stat}>
                <Text style={style.lead}>
                  <Text style={style.highlight}> 1 </Text> X ₹ 169.00
                </Text>
                <Text style={style.lead}>₹ 169.00</Text>
              </View>
              <View style={style.stat}>
                <Text style={style.lead}>Promo applied</Text>
                <Text style={style.highlight}>- ₹ 50.00</Text>
              </View>
              <View style={style.stat}>
                <Text style={style.lead}>Taxes & delivery</Text>
                <Text style={style.lead}>₹ 05.00</Text>
              </View>
              <View style={style.stat}>
                <Text style={style.subhead}>Total amount</Text>
                <Text style={style.lead}>₹ 105.00</Text>
              </View>
            </View>
          </View>
          <View style={utilStyle.mt1}>
            <View style={style.ratingHead}>
              <Text style={style.subhead}>Rate</Text>
              <View style={[utilStyle.card, style.currentRate]}>
                <Text style={style.rateNum}>{rating}</Text>
                <Text style={style.rateEmoji}>{mappedEmoji[rating]}</Text>
              </View>
            </View>
            <View>
              <View style={style.slider}>
                <MultiSlider
                  sliderLength={300}
                  min={1}
                  max={5}
                  onValuesChange={value => setRating(value)}
                  step={1}
                  trackStyle={{ padding: 5, borderRadius: 8 }}
                  selectedStyle={{ backgroundColor: primaryColor }}
                  markerStyle={{
                    backgroundColor: lightColor,
                    height: 25,
                    width: 25,
                    padding: 5,
                    marginTop: 7,
                    elevation: 2,
                  }}
                />
              </View>
              <View style={style.sliderLabel}>
                <View style={style.label}>
                  <Text style={{ color: medColor, fontSize: 16 }}>1</Text>
                  <Text style={style.emojiMarker}>😭</Text>
                </View>
                <View style={style.label}>
                  <Text style={{ color: medColor, fontSize: 16 }}>2</Text>
                  <Text style={style.emojiMarker}>😬</Text>
                </View>
                <View style={style.label}>
                  <Text style={{ color: medColor, fontSize: 16 }}>3</Text>
                  <Text style={style.emojiMarker}>🙂</Text>
                </View>
                <View style={style.label}>
                  <Text style={{ color: medColor, fontSize: 16 }}>4</Text>
                  <Text style={style.emojiMarker}>🤩</Text>
                </View>
                <View style={style.label}>
                  <Text style={{ color: medColor, fontSize: 16 }}>5</Text>
                  <Text style={style.emojiMarker}>🤯</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={[utilStyle.card, utilStyle.mt1, style.billCard]}>
            <View style={style.detail}>
              <Text style={style.subhead}>Order number</Text>
              <Text style={[style.lead, style.orderNo]}>001512104956564</Text>
            </View>
            <View style={style.detail}>
              <Text style={style.subhead}>Date</Text>
              <Text style={style.lead}>21 Aug 2020 at 20:04</Text>
            </View>
            <View style={style.detail}>
              <Text style={style.subhead}>Phone number</Text>
              <Text style={style.lead}>0758954XXX</Text>
            </View>
            <View style={style.detail}>
              <Text style={style.subhead}>Payment</Text>
              <Text style={style.lead}>Cash On Delivery</Text>
            </View>
            <View style={style.detail}>
              <Text style={style.subhead}>Deliver to</Text>
              <Text style={style.lead}>
                123, B3 208 sfs colony, yelahanka new town, ground floor, self
                financed socity, Pune 560064
              </Text>
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
  subhead: {
    fontWeight: "bold",
    fontSize: 16,
    paddingBottom: 5,
    color: darkColor,
  },
  lead: {
    color: medColor,
    paddingBottom: 15,
  },
  billCard: {
    borderRadius: 10,
  },
  stat: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  highlight: {
    color: medColor,
    backgroundColor: "#FFE7E7",
    padding: 2,
    borderRadius: 5,
    borderColor: primaryColor,
    borderWidth: 0.5,
  },
  ratingHead: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sliderLabel: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  currentRate: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
  },
  rateNum: {
    fontSize: 18,
    paddingRight: 10,
  },
  rateEmoji: {
    fontSize: 18,
  },
  label: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  slider: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  detail: {
    marginBottom: 10,
  },
  orderNo: {
    fontSize: 28,
    letterSpacing: 6,
  },
  emojiMarker: {
    fontSize: 18,
  },
});

export default Receipt;
