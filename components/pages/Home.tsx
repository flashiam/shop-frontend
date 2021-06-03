import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Platform } from "react-native";
import HomeWeb from "../web/HomeWeb";
import HomeMobo from "../mobo/HomeMobo";

import { fetchUserCredentials } from "../../actions/userActions";

type Props = {
  navigation: any;
  fetchUserCredentials: Function;
};

const Home = ({ navigation, fetchUserCredentials }: Props) => {
  useEffect(() => {
    fetchUserCredentials();
  }, []);

  // return <HomeMobo navigation={navigation} />;
  return Platform.OS === "web" ? (
    <HomeWeb navigation={navigation} />
  ) : (
    <HomeMobo navigation={navigation} />
  );
};

export default connect(null, { fetchUserCredentials })(Home);
