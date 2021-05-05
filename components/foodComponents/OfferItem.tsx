import React from "react";
import { Image, StyleSheet, Pressable } from "react-native";

const OfferItem = ({ item, index }: { item: any; index: number }) => {
  return (
    <Pressable>
      <Image key={item.id} source={item.img} style={style.offerImg} />
    </Pressable>
  );
};

const style = StyleSheet.create({
  offerImg: {
    height: 150,
    width: 300,
    borderRadius: 10,
    marginRight: 10,
  },
});

export default OfferItem;
