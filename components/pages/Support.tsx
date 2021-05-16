import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Pressable,
  StatusBar,
  TextInput,
  Dimensions,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

import { RootStackParamList } from "../../App";

import { MaterialIcons, Entypo, Ionicons } from "@expo/vector-icons";

import utilStyle from "../../styles/utilStyle";
import {
  darkColor,
  lightColor,
  primaryColor,
  secondaryColor,
} from "../../styles/_variables";

import RadioButton from "../layout/RadioButton";

interface Option {
  value: string;
  label: string;
}

interface Message {
  id: number;
  msg: string;
}

type SupportScreenNavProp = StackNavigationProp<RootStackParamList, "Support">;

type Props = {
  navigation: SupportScreenNavProp;
};

const Support = ({ navigation }: Props) => {
  const messageRef = useRef<any>(null);
  const inputRef = useRef<any>(null);

  const options: Option[] = [
    {
      label: "I want a refund",
      value: "refund",
    },
    {
      label: "Talk to our executive",
      value: "executive",
    },
    {
      label: "I am unable to track my order",
      value: "order",
    },
  ];

  const [messages, setMessage] = useState<Message[]>([
    {
      id: 1,
      msg: "I want a refund",
    },
    {
      id: 2,
      msg: "I want a refund",
    },
  ]);

  const [value, setValue] = useState<string>("");

  // Function to set the text value
  const inputChange = (val: string) => {
    setValue(val);
  };

  // Function to auto scroll the view when message is send
  // const autoScroll = () => {
  //   messageRef.current.scrollIntoView({ behaviour: "smooth" });
  // };

  // useEffect(() => {
  //   // autoScroll();
  // }, [messageRef]);

  // Function to send message
  const sendMessage = () => {
    if (value) {
      setMessage([
        ...messages,
        { id: Math.floor(Math.random() * 100) + 1, msg: value },
      ]);
      setValue("");
      inputRef.current.blur();
      messageRef.current.scrollTo({
        x: 0,
        y: Dimensions.get("window").height + 2000,
        animated: true,
      });
    } else {
      console.log("Enter some message");
    }
  };

  return (
    <View style={{ position: "relative", display: "flex", flex: 1 }}>
      <View style={utilStyle.container}>
        <View style={style.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" color={darkColor} size={30} />
          </Pressable>
        </View>
        <View style={style.section}>
          <Text style={utilStyle.head}>Support</Text>
          <ScrollView
            ref={messageRef}
            style={{
              minHeight: Dimensions.get("window").height + 100,
            }}
          >
            <View style={{ marginBottom: 500 }}>
              <View style={[utilStyle.card, style.msg]}>
                <Text style={style.time}>12:34</Text>
                <View>
                  <Text style={{ fontWeight: "bold" }}>
                    How can we help you?
                  </Text>
                  <View>
                    <RadioButton options={options} />
                  </View>
                </View>
              </View>
              {messages &&
                messages.map(message => (
                  <View
                    key={message.id}
                    style={[utilStyle.card, style.msg, style.right]}
                  >
                    <Text style={style.time}>12:36</Text>
                    <View>
                      <Text>{message.msg}</Text>
                    </View>
                  </View>
                ))}
            </View>
          </ScrollView>
        </View>
      </View>
      <View style={[utilStyle.card, style.msgFooter]}>
        <TextInput
          ref={inputRef}
          style={style.msgInput}
          value={value}
          onChange={e => inputChange(e.nativeEvent.text)}
          onSubmitEditing={e => sendMessage}
        />
        <View style={style.btnContain}>
          <Pressable style={{ marginRight: 20 }}>
            <Entypo name="attachment" size={20} color={secondaryColor} />
          </Pressable>
          <Pressable style={style.sendBtn} onPress={sendMessage}>
            <Ionicons name="md-send-outline" size={20} color={lightColor} />
          </Pressable>
        </View>
      </View>
    </View>
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
  wishHead: {
    fontWeight: "bold",
  },
  wishlistContain: {
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
  msgFooter: {
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 0,
  },
  msg: {
    position: "relative",
    marginTop: 15,
    marginHorizontal: 5,
    borderRadius: 10,
    width: "85%",
    padding: 18,
  },
  time: {
    position: "absolute",
    top: 10,
    right: 10,
    fontSize: 12,
    color: secondaryColor,
  },
  btnContain: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  msgInput: {
    width: "60%",
    marginLeft: 15,
    fontSize: 19,
  },
  sendBtn: {
    backgroundColor: primaryColor,
    padding: 13,
    borderRadius: 100 / 2,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  right: {
    transform: [{ translateX: 40 }],
  },
});

export default Support;
