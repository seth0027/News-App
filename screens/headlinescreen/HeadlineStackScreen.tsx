import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HeadlineScreen from "./HeadlineScreen";
import { AppProvider, DropdownType } from "../../context/AppContext";
import { HeadlineText } from "../../components/HeadlineText";
import { Details } from "../../components/Details";
import { Dropdown } from "../../components/Dropdown";
import { Platform } from "react-native";
import { Article } from "../../models/NewsResponse";

export type HeadlineStackParamList = {
  Headline: undefined;
  Details: { article: Article };
  Country: undefined;
};

const HeadlineStack = createStackNavigator<HeadlineStackParamList>();

const HeadlineStackScreen = () => (
  <AppProvider>
    <HeadlineStack.Navigator>
      <HeadlineStack.Screen
        name="Headline"
        component={HeadlineScreen}
        options={({ route, navigation }) => ({
          headerTitle: (props) => <HeadlineText title="Headlines" />,
        })}
      />
      <HeadlineStack.Screen
        name="Details"
        component={Details}
        options={({ route, navigation }) => ({
          headerTitle: (props) => <HeadlineText title="Details" />,
        })}
      />
      <HeadlineStack.Screen
        name="Country"
        component={Country}
        options={({ route, navigation }) => ({
          headerTitle: (props) => <HeadlineText title="Country" />,
        })}
      />
    </HeadlineStack.Navigator>
  </AppProvider>
);

const Country = () => (
  <Dropdown
    type={DropdownType.COUNTRY}
    style={
      Platform.OS === "android" && {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }
    }
  />
);
export default HeadlineStackScreen;
