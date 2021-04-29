import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Button, View } from "react-native";
import { SearchStackParamList } from "./SearchStackScreen";

import { AppContext } from "../../context/AppContext";

import { NewsList } from "../../components/NewsList";
import { SearchBar } from "../../components/SearchBar";
import { useNavigation } from "@react-navigation/core";

type SearchProps = {
  navigation: StackNavigationProp<SearchStackParamList, "Search">;
};

const SearchScreen = ({}: SearchProps) => {
  const navigation = useNavigation<
    StackNavigationProp<SearchStackParamList, "Search">
  >();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => navigation.navigate("SortBy")} title="Sort By" />
      ),
    });
  }, [navigation]);
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
