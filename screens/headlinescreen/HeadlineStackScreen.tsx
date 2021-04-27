import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HeadlineScreen from "./HeadlineScreen";
import { AppProvider } from "../../context/AppContext";
import { HeadlineText } from "../../components/HeadlineText";
import { Details } from "../../components/Details";

export type HeadlineStackParamList = {
  Headline: undefined;
  Details: { url?: string };
};

const HeadlineStack = createStackNavigator<HeadlineStackParamList>();

const HeadlineStackScreen = () => (
  <AppProvider>
    <HeadlineStack.Navigator>
      <HeadlineStack.Screen
        name="Headline"
        component={HeadlineScreen}
        options={({ route, navigation }) => ({
          headerTitle: (props) => <HeadlineText title="Headlines Screen" />,
        })}
      />
      <HeadlineStack.Screen
        name="Details"
        component={Details}
        options={({ route, navigation }) => ({
          headerTitle: (props) => <HeadlineText title="Details Screen" />,
        })}
        initialParams={{ url: undefined }}
      />
    </HeadlineStack.Navigator>
  </AppProvider>
);

export default HeadlineStackScreen;
