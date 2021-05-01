import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "./SearchScreen";
import { AppProvider, DropdownType } from "../../context/AppContext";
import { HeadlineText } from "../../components/HeadlineText";
import { Details } from "../../components/Details";
import { Dropdown } from "../../components/Dropdown";
import { Platform } from "react-native";
import { Article } from "../../models/NewsResponse";

export type SearchStackParamList = {
  Search: undefined;
  Details: { article: Article };
  SortBy: undefined;
};
const SearchStack = createStackNavigator<SearchStackParamList>();

const SearchStackScreen = () => (
  <AppProvider>
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="Search"
        component={SearchScreen}
        options={({ route, navigation }) => ({
          headerTitle: (props) => <HeadlineText title="Search" />,
        })}
      />
      <SearchStack.Screen
        name="Details"
        component={Details}
        options={({ route, navigation }) => ({
          headerTitle: (props) => <HeadlineText title="Details" />,
        })}
      />

      <SearchStack.Screen
        name="SortBy"
        component={SortBy}
        options={({ route, navigation }) => ({
          headerTitle: (props) => <HeadlineText title="Sort By" />,
        })}
      />
    </SearchStack.Navigator>
  </AppProvider>
);

const SortBy = () => (
  <Dropdown
    type={DropdownType.SORT_BY}
    style={
      Platform.OS === "android" && {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }
    }
  />
);

export default SearchStackScreen;
