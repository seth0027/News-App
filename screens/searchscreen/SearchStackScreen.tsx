import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "./SearchScreen";
import { SearchScreenProvider } from "./SearchScreenContext";

export type SearchStackParamList = {
  Search: undefined;
};
const SearchStack = createStackNavigator<SearchStackParamList>();

const SearchStackScreen = () => (
  <SearchScreenProvider>
    <SearchStack.Navigator>
      <SearchStack.Screen name="Search" component={SearchScreen} />
    </SearchStack.Navigator>
  </SearchScreenProvider>
);

export default SearchStackScreen;
