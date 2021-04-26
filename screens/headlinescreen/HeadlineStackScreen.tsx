import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HeadlineScreen from "./HeadlineScreen";
import { SearchScreenProvider } from "../searchscreen/SearchScreenContext";
import { HeadlineText } from "../../components/HeadlineText";

export type HeadlineStackParamList = {
  Headline: undefined;
};

const HeadlineStack = createStackNavigator<HeadlineStackParamList>();

const HeadlineStackScreen = () => (
  <SearchScreenProvider>
    <HeadlineStack.Navigator>
      <HeadlineStack.Screen
        name="Headline"
        component={HeadlineScreen}
        options={({ route, navigation }) => ({
          headerTitle: (props) => <HeadlineText title="Headlines Screen" />,
        })}
      />
    </HeadlineStack.Navigator>
  </SearchScreenProvider>
);

export default HeadlineStackScreen;
