import React from "react";
import { Platform } from "react-native";
import HomeWeb from "../web/HomeWeb";
import HomeMobo from "../mobo/HomeMobo";

const Home = ({ navigation }: { navigation: any }) => {
  // return <HomeMobo navigation={navigation} />;
  return Platform.OS === "web" ? (
    <HomeWeb navigation={navigation} />
  ) : (
    <HomeMobo navigation={navigation} />
  );
};

export default Home;
