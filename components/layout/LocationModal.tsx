import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Platform } from "react-native";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { MaterialIcons, AntDesign, Entypo } from "@expo/vector-icons";
import { connect } from "react-redux";
import axios from "axios";

import "@expo/match-media";
import { useMediaQuery } from "react-responsive";

// import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

import { closeLocation } from "../../actions/foodActions";

import {
  primaryColor,
  medColor,
  bgColor,
  lightColor,
  darkColor,
  secondaryColor,
} from "../../styles/_variables";

type Props = {
  food: {
    locationOpened: boolean;
  };
  closeLocation: Function;
};

const LocationModal = ({ food: { locationOpened }, closeLocation }: Props) => {
  const phoneOrTablets = useMediaQuery({ maxWidth: 768 });
  // State for location modal
  const [openLocation, setLocationModal] = useState<boolean>(false);
  // State for the loader in location
  const [locationLoading, setLocationLoading] = useState<boolean>(false);

  // State for the location
  const [address, setAddress] = useState<any>(null);
  //   State for city
  const [city, setCity] = useState<string>("");

  useEffect(() => {
    fetchAddress();
  }, []);

  // Function to delete the address
  const deleteAddress = async () => {
    try {
      await AsyncStorage.removeItem("user-address");
      setAddress(null);
      console.log("address deleted");
    } catch (err) {
      console.log(err);
    }
  };

  // Function to save the location to localstorage
  const saveAddress = async (address: any) => {
    try {
      await AsyncStorage.setItem("user-address", JSON.stringify(address));
      console.log("address saved");
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAddress = async () => {
    try {
      const savedAddress = await AsyncStorage.getItem("user-address");
      if (savedAddress) {
        setAddress(JSON.parse(savedAddress).formatted);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Function to fetch the current location
  const getCurrentLocation = async () => {
    try {
      setLocationLoading(true);
      // Close the modal after location is fetched
      setLocationModal(false);

      let { status } = await Location.requestForegroundPermissionsAsync();

      // Checking permission status
      if (status !== "granted") {
        console.log("Permission denied");
      } else {
        const isServicesEnabled = await Location.hasServicesEnabledAsync();
        if (!isServicesEnabled)
          return console.log("Please enable the location");

        // If permission granted then fetch the location
        const currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        const currentAddress = await axios.get(
          `https://api.opencagedata.com/geocode/v1/json?q=${currentLocation.coords.latitude}+${currentLocation.coords.longitude}&key=1513936b4e0f4c90868c219c88d0598e`
        );

        console.log(currentAddress);
        // Set the current address
        setAddress(currentAddress.data.results[0].formatted);

        // Save the address also
        saveAddress(currentAddress.data.results[0]);

        // Disable loading
        setLocationLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal
      onBackdropPress={() => closeLocation()}
      onSwipeComplete={() => closeLocation()}
      style={{
        position: "relative",
        padding: 0,
        margin: 0,
      }}
      isVisible={locationOpened}
      swipeDirection="down"
    >
      <View
        style={[
          style.locationContain,
          {
            paddingHorizontal:
              Platform.OS === "web" ? (phoneOrTablets ? 15 : 50) : 50,
          },
        ]}
      >
        <View style={style.locationHeader}>
          <Text style={{ fontSize: 18 }}>Select Location</Text>
          <Pressable onPress={() => closeLocation()}>
            <AntDesign name="close" color={medColor} size={18} />
          </Pressable>
        </View>
        <View style={style.locationSection}>
          <Pressable
            style={style.currentLocationBtn}
            onPress={() => getCurrentLocation()}
          >
            <MaterialIcons name="my-location" color={primaryColor} size={18} />
            <Text style={{ color: primaryColor, marginLeft: 15, fontSize: 15 }}>
              Use current location
            </Text>
          </Pressable>
          <View style={style.savedAddressContain}>
            <Text style={{ fontSize: 16, paddingBottom: 10 }}>
              Saved Address
            </Text>
            {Platform.OS === "web" ? (
              phoneOrTablets ? (
                address ? (
                  <View style={style.addressItem}>
                    <View style={style.addressLeftContent}>
                      <Entypo name="home" color={darkColor} size={18} />
                      <Text style={{ marginLeft: 15, width: 200 }}>
                        {address}
                      </Text>
                    </View>
                    <Pressable onPress={() => deleteAddress()}>
                      <MaterialIcons
                        name="delete-outline"
                        color={primaryColor}
                        size={20}
                      />
                    </Pressable>
                  </View>
                ) : (
                  <View>
                    <Text
                      style={{
                        paddingTop: 10,
                        fontSize: 18,
                        color: secondaryColor,
                      }}
                    >
                      No Address Saved
                    </Text>
                  </View>
                )
              ) : address ? (
                <View style={style.addressItem}>
                  <View style={style.addressLeftContent}>
                    <Entypo name="home" color={darkColor} size={18} />
                    <Text style={{ marginLeft: 15 }}>{address}</Text>
                  </View>
                  {Platform.OS === "web" ? (
                    <Pressable
                      style={{ flexDirection: "row", alignItems: "center" }}
                      onPress={() => deleteAddress()}
                    >
                      <MaterialIcons
                        name="delete-outline"
                        color={primaryColor}
                        size={20}
                      />
                      <Text
                        style={{
                          color: primaryColor,
                          fontSize: 16,
                          paddingLeft: 1.5,
                        }}
                      >
                        Delete Address
                      </Text>
                    </Pressable>
                  ) : (
                    <Pressable onPress={() => deleteAddress()}>
                      <MaterialIcons
                        name="delete-outline"
                        color={primaryColor}
                        size={20}
                      />
                    </Pressable>
                  )}
                </View>
              ) : (
                <View>
                  <Text
                    style={{
                      paddingTop: 10,
                      fontSize: 18,
                      color: secondaryColor,
                    }}
                  >
                    No Address Saved
                  </Text>
                </View>
              )
            ) : (
              address &&
              address[0] && (
                <View style={style.addressItem}>
                  <View style={style.addressLeftContent}>
                    <Entypo name="home" color={darkColor} size={18} />
                    <Text style={{ marginLeft: 15 }}>{address[0].city}</Text>
                  </View>
                  <Pressable onPress={() => deleteAddress()}>
                    <MaterialIcons
                      name="delete-outline"
                      color={primaryColor}
                      size={20}
                    />
                  </Pressable>
                </View>
              )
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const style = StyleSheet.create({
  locationContain: {
    backgroundColor: lightColor,
    // paddingHorizontal: 15,
    paddingVertical: 20,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "50%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: Platform.OS === "web" ? 50 : 15,
  },
  locationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationSection: {
    marginTop: 50,
  },
  currentLocationBtn: {
    flexDirection: "row",
    alignItems: "center",
  },
  savedAddressContain: {
    marginTop: 25,
  },
  addressLeftContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  addressItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: bgColor,
  },
});

const mapStateToProps = (state: any) => ({
  food: state.food,
});

export default connect(mapStateToProps, { closeLocation })(LocationModal);
