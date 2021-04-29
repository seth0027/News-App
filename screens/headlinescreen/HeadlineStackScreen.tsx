import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HeadlineScreen from "./HeadlineScreen";
import { AppProvider, DropdownType } from "../../context/AppContext";
import { HeadlineText } from "../../components/HeadlineText";
import { Details } from "../../components/Details";
import { Dropdown } from "../../components/Dropdown";

export type HeadlineStackParamList = {
  Headline: undefined;
  Details: { url?: string };
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
        initialParams={{ url: undefined }}
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

const Country = () => <Dropdown type={DropdownType.COUNTRY} />;
export default HeadlineStackScreen;
