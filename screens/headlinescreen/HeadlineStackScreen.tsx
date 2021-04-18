import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HeadlineScreen from "./HeadlineScreen";

export type HeadlineStackParamList = {
  Headline: undefined;
};

const HeadlineStack = createStackNavigator<HeadlineStackParamList>();

const HeadlineStackScreen = () => (
  <HeadlineStack.Navigator>
    <HeadlineStack.Screen name="Headline" component={HeadlineScreen} />
  </HeadlineStack.Navigator>
);

export default HeadlineStackScreen;
