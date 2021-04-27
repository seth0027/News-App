import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HeadlineScreen from "./HeadlineScreen";
import { AppProvider } from "../../context/AppContext";
import { HeadlineText } from "../../components/HeadlineText";

export type HeadlineStackParamList = {
  Headline: undefined;
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
    </HeadlineStack.Navigator>
  </AppProvider>
);

export default HeadlineStackScreen;
