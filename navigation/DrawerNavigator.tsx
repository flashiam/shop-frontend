import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { DrawerParamList } from "../types";
import { RootStackParamList } from "../App";

import Home from "../components/pages/Home";
import Orders from "../components/pages/Orders";
import Wishlist from "../components/pages/Wishlist";
import Support from "../components/pages/Support";
import Refer from "../components/pages/Refer";
import FoodDesc from "../components/pages/FoodDesc";
import Categories from "../components/pages/Categories";
// import Food from "../components/foodComponents/Food";
import OrderLoading from "../components/pages/OrderLoading";
import Receipt from "../components/pages/Receipt";
import Promo from "../components/pages/Promo";

const Drawer = createDrawerNavigator<DrawerParamList>();
const Stack = createStackNavigator<RootStackParamList>();

const HiddenScreen1 = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

const HiddenScreen2 = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Food" component={FoodDesc} />
    </Stack.Navigator>
  );
};
const HiddenScreen3 = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Categories" component={Categories} />
    </Stack.Navigator>
  );
};
const HiddenScreen4 = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="OrderLoading" component={OrderLoading} />
    </Stack.Navigator>
  );
};
const HiddenScreen5 = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Receipt" component={Receipt} />
    </Stack.Navigator>
  );
};
const HiddenScreen6 = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Promo" component={Promo} />
    </Stack.Navigator>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => {
        const filteredProps = {
          ...props,
          state: {
            ...props.state,
            routeNames: props.state.routeNames.filter(routeName => {
              routeName !== "HiddenScreen1" &&
                routeName !== "HiddenScreen2" &&
                routeName !== "HiddenScreen3" &&
                routeName !== "HiddenScreen4" &&
                routeName !== "HiddenScreen5" &&
                routeName !== "HiddenScreen6";
            }),
            route: props.state.routes.filter(route => {
              route.name !== "HiddenScreen1" &&
                route.name !== "HiddenScreen2" &&
                route.name !== "HiddenScreen3" &&
                route.name !== "HiddenScreen4" &&
                route.name !== "HiddenScreen5" &&
                route.name !== "HiddenScreen6";
            }),
          },
        };
        return (
          <DrawerContentScrollView {...filteredProps}>
            <DrawerItemList {...filteredProps} />
          </DrawerContentScrollView>
        );
      }}
    >
      {/* <Drawer.Screen name="HiddenScreen1" component={HiddenScreen1} />
      <Drawer.Screen name="HiddenScreen2" component={HiddenScreen2} />
      <Drawer.Screen name="HiddenScreen3" component={HiddenScreen3} />
      <Drawer.Screen name="HiddenScreen4" component={HiddenScreen4} />
      <Drawer.Screen name="HiddenScreen5" component={HiddenScreen5} />
      <Drawer.Screen name="HiddenScreen6" component={HiddenScreen6} /> */}
      <Drawer.Screen name="Orders" component={Orders} />
      <Drawer.Screen name="Wishlist" component={Wishlist} />
      <Drawer.Screen name="Support" component={Support} />
      <Drawer.Screen name="Refer" component={Refer} />
      <Drawer.Screen
        name="Food"
        component={FoodDesc}
        options={{
          drawerLabel: () => null,
          title: "",
          drawerIcon: () => null,
        }}
      />
      <Drawer.Screen
        name="Categories"
        component={Categories}
        options={{
          drawerLabel: () => null,
          title: "",
          drawerIcon: () => null,
        }}
      />
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerLabel: () => null,
          title: "",
          drawerIcon: () => null,
        }}
      />
      <Drawer.Screen
        name="Receipt"
        component={Receipt}
        options={{
          drawerLabel: () => null,
          title: "",
          drawerIcon: () => null,
        }}
      />
      <Drawer.Screen
        name="Promo"
        component={Promo}
        options={{
          drawerLabel: () => null,
          title: "",
          drawerIcon: () => null,
        }}
      />
      <Drawer.Screen
        name="OrderLoading"
        component={OrderLoading}
        options={{
          drawerLabel: () => null,
          title: "",
          drawerIcon: () => null,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
