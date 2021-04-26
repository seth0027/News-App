import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { View } from "react-native";
import { SearchStackParamList } from "./SearchStackScreen";

import { SearchScreenContext } from "./SearchScreenContext";

import { NewsList } from "../../components/NewsList";
import { SearchBar } from "../../components/SearchBar";

type SearchProps = {
  navigation: StackNavigationProp<SearchStackParamList, "Search">;
};

const SearchScreen = ({}: SearchProps) => {
  return (
    <View
      style={{ flex: 1, alignContent: "center", justifyContent: "flex-start" }}
    >
      <SearchBar style={{ width: "80%", alignSelf: "center" }} />
      <NewsList />
    </View>
  );
};

export default SearchScreen;
