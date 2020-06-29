import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import Settings from "../screens/Settings";
import AddProduct from "../screens/AddProduct";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Home";

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      tabBarOptions={{
        activeTintColor: "#08805B",
      }}
    >
      <BottomTab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          title: "Your List",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name='md-cart' />
          ),
        }}
      />
      <BottomTab.Screen
        name='Settings'
        component={Settings}
        options={{
          title: "Settings",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name='md-cog' />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case "Home":
      return "smartGroceries";
    case "AddProduct":
      return "AddProduct";
    case "Settings":
      return "Settings";
  }
}
