import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "./SearchScreen";
import { AppProvider } from "../../context/AppContext";
import { HeadlineText } from "../../components/HeadlineText";
import { Details } from "../../components/Details";

export type SearchStackParamList = {
  Search: undefined;
  Details: { url?: string };
};
const SearchStack = createStackNavigator<SearchStackParamList>();

const SearchStackScreen = () => (
  <AppProvider>
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="Search"
        component={SearchScreen}
        options={({ route, navigation }) => ({
          headerTitle: (props) => <HeadlineText title="Search Screen" />,
        })}
      />
      <SearchStack.Screen
        name="Details"
        component={Details}
        options={({ route, navigation }) => ({
          headerTitle: (props) => <HeadlineText title="Details Screen" />,
        })}
        initialParams={{ url: undefined }}
      />
    </SearchStack.Navigator>
  </AppProvider>
);

export default SearchStackScreen;
