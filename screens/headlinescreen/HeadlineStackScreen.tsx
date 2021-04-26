import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HeadlineScreen from "./HeadlineScreen";
import { SearchScreenProvider } from "../searchscreen/SearchScreenContext";

export type HeadlineStackParamList = {
  Headline: undefined;
};

const HeadlineStack = createStackNavigator<HeadlineStackParamList>();

const HeadlineStackScreen = () => (
  <SearchScreenProvider>
    <HeadlineStack.Navigator>
      <HeadlineStack.Screen name="Headline" component={HeadlineScreen} />
    </HeadlineStack.Navigator>
  </SearchScreenProvider>
);

export default HeadlineStackScreen;
