import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

import Home from "./components/pages/Home";
import FoodDesc from "./components/pages/FoodDesc";
import Categories from "./components/pages/Categories";
import Orders from "./components/pages/Orders";
import Wishlist from "./components/pages/Wishlist";
import Support from "./components/pages/Support";
import Refer from "./components/pages/Refer";
import OrderLoading from "./components/pages/OrderLoading";
import Receipt from "./components/pages/Receipt";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

export type RootStackParamList = {
  Home: undefined;
  Food: { foodid: number };
  Categories: { catid: number };
  Orders: undefined;
  Wishlist: undefined;
  Support: undefined;
  Refer: undefined;
  OrderLoading: undefined;
  Receipt: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        {/* <Navigation colorScheme={colorScheme} /> */}
        <StatusBar backgroundColor="#E2E2E2" />
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Food" component={FoodDesc} />
            <Stack.Screen name="Categories" component={Categories} />
            <Stack.Screen name="Orders" component={Orders} />
            <Stack.Screen name="Wishlist" component={Wishlist} />
            <Stack.Screen name="Support" component={Support} />
            <Stack.Screen name="Refer" component={Refer} />
            <Stack.Screen name="OrderLoading" component={OrderLoading} />
            <Stack.Screen name="Receipt" component={Receipt} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}
