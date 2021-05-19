import React, { useState, useRef, useEffect } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
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
import Spinner from "../layout/Spinner";

interface Option {
  value: string;
  label: string;
}

interface Message {
  id: number;
  msg: string;
  time: string;
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

  const [messages, setMessage] = useState<Message[]>([]);

  const [value, setValue] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(true);

  // Function to save the messages
  const saveMessage = async (msg: Message) => {
    try {
      // Checking wether there is a message or not
      const existingData = await AsyncStorage.getItem("message");
      let messages;

      if (existingData) {
        messages = JSON.parse(existingData);
      } else {
        messages = [];
      }

      // Save the new message
      messages.push(msg);
      await AsyncStorage.setItem("message", JSON.stringify(messages));
    } catch (err) {
      console.log(err);
    }
  };

  // Function to get the saved messages
  const fetchMessages = async () => {
    try {
      const savedMsg = await AsyncStorage.getItem("message");

      if (savedMsg) {
        // Store it into the state
        setMessage(JSON.parse(savedMsg));
      }

      // Disable loading
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  // Function to delete message
  const deleteMessage = async (id: number) => {
    try {
      // Deleting from the state first
      const filteredMsg = messages?.filter(msg => msg.id !== id);
      // Delete from storage too
      const savedMsg = await AsyncStorage.getItem("message");

      if (savedMsg) {
        const newStoredMsg = JSON.parse(savedMsg).filter(
          (msg: Message) => msg.id !== id
        );
        await AsyncStorage.setItem("message", JSON.stringify(newStoredMsg));
      }

      setMessage(filteredMsg);
    } catch (err) {
      console.log(err);
    }
  };

  // Function to set the text value
  const inputChange = (val: string) => {
    setValue(val);
  };

  // Function to generate current time
  const genTime = (): string => {
    const d = new Date();
    let hours: string | number = d.getHours();
    let minutes: string | number = d.getMinutes();

    if (hours < 10) {
      hours = `0${hours}`;
    }

    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    return `${hours}:${minutes}`;
  };

  // Function to send message
  const sendMessage = () => {
    if (value) {
      // Creating a message
      const newMsg = {
        id: Math.floor(Math.random() * 100) + 1,
        msg: value,
        time: genTime(),
      };

      setMessage([...messages, newMsg]);

      // Save the message also
      saveMessage(newMsg);

      setValue("");
      inputRef.current.blur();
      messageRef.current.scrollTo({
        x: 0,
        y: Dimensions.get("window").height + 3000,
        animated: true,
      });
    }
  };

  useEffect(() => {
    // Fetch the messages as soon as component loads
    fetchMessages();
  }, []);

  if (loading) {
    return <Spinner />;
  } else {
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
                <View style={[utilStyle.card, style.msg, style.left]}>
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
                    <Pressable
                      key={message.id}
                      style={[utilStyle.card, style.msg, style.right]}
                      onPress={() => deleteMessage(message.id)}
                    >
                      <Text style={style.time}>{message.time}</Text>
                      <View style={{ marginRight: 30 }}>
                        <Text>{message.msg}</Text>
                      </View>
                    </Pressable>
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
            placeholder="Type something..."
            placeholderTextColor={secondaryColor}
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
  }
};

const style = StyleSheet.create({
  header: {
    marginTop: StatusBar.currentHeight,
    paddingVertical: 15,
  },
  section: {
    position: "relative",
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
    alignSelf: "flex-end",
    position: "relative",
    marginTop: 15,
    marginHorizontal: 5,
    borderRadius: 10,
    padding: 18,
    backgroundColor: lightColor,
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
    fontSize: 18,
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
  left: {
    alignSelf: "flex-start",
  },
  right: {
    alignSelf: "flex-end",
  },
});

export default Support;
