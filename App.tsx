import { StatusBar } from "expo-status-bar";
import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SearchStackScreen from "./screens/searchscreen/SearchStackScreen";
import HeadlineStackScreen from "./screens/headlinescreen/HeadlineStackScreen";

type AppTabParamList = {
  SearchStack: undefined;
  HeadlineStack: undefined;
};

const Tab = createBottomTabNavigator<AppTabParamList>();

export default () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="SearchStack"
          component={SearchStackScreen}
          options={{
            title: "Search",
            tabBarIcon: ({ focused, size, color }) => (
              <Ionicons
                name={focused ? "ios-search-sharp" : "ios-search-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="HeadlineStack"
          component={HeadlineStackScreen}
          options={{
            title: "Headlines",
            tabBarIcon: ({ focused, size, color }) => (
              <Ionicons
                name={focused ? "ios-newspaper-sharp" : "ios-newspaper"}
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
