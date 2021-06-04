import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import DrawerNavigator from "./navigation/DrawerNavigator";

import Home from "./components/pages/Home";
import FoodDesc from "./components/pages/FoodDesc";
import Categories from "./components/pages/Categories";
import Orders from "./components/pages/Orders";
import Wishlist from "./components/pages/Wishlist";
import Support from "./components/pages/Support";
import Refer from "./components/pages/Refer";
import OrderLoading from "./components/pages/OrderLoading";
import Receipt from "./components/pages/Receipt";
import Promo from "./components/pages/Promo";
import CartWeb from "./components/web/CartWeb";
import NavbarWeb from "./components/web/NavbarWeb";
import ProductSearch from "./components/pages/ProductSearch";
import Login from "./components/pages/Login";
import AuthLoading from "./components/pages/AuthLoading";
import SpecialFoodDesc from "./components/pages/SpecialFoodDesc";

import LocationModal from "./components/layout/LocationModal";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import store from "./store";

export interface FoodType {
  id: number;
  title: string;
  subtitle?: string;
  price: number;
  desc: string;
  img: string;
  rating: number;
  stars: number;
  reviews: number;
  tags?: string[];
  isSpecial?: boolean;
}

export type RootStackParamList = {
  AuthLoading: undefined;
  Home: undefined;
  Food: { food: FoodType };
  NavbarWeb: undefined;
  Categories: { catid: number };
  Orders: undefined;
  Wishlist: undefined;
  Support: undefined;
  Refer: undefined;
  OrderLoading: undefined;
  Receipt: undefined;
  Promo: undefined;
  CartWeb?: { cartid: number };
  ProductSearch: { keyword: string };
  SpecialFoodDesc: { food: FoodType };
  Login: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  const [isRegistered, setStatus] = useState<boolean>(false);
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          {/* <Navigation colorScheme={colorScheme} /> */}
          <StatusBar backgroundColor="#E2E2E2" />
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="AuthLoading" component={AuthLoading} />
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Food" component={FoodDesc} />
              <Stack.Screen name="Categories" component={Categories} />
              <Stack.Screen name="Orders" component={Orders} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Wishlist" component={Wishlist} />
              <Stack.Screen name="Support" component={Support} />
              <Stack.Screen name="Refer" component={Refer} />
              <Stack.Screen name="OrderLoading" component={OrderLoading} />
              <Stack.Screen name="Receipt" component={Receipt} />
              <Stack.Screen name="Promo" component={Promo} />
              <Stack.Screen name="CartWeb" component={CartWeb} />
              <Stack.Screen name="NavbarWeb" component={NavbarWeb} />
              <Stack.Screen name="ProductSearch" component={ProductSearch} />
              <Stack.Screen
                name="SpecialFoodDesc"
                component={SpecialFoodDesc}
              />
            </Stack.Navigator>
            <LocationModal />
          </NavigationContainer>
        </SafeAreaProvider>
      </Provider>
    );
  }
};

export default App;
