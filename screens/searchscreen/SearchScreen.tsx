import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Button, Platform, View } from "react-native";
import { SearchStackParamList } from "./SearchStackScreen";

import { AppContext, DropdownType } from "../../context/AppContext";

import { NewsList } from "../../components/NewsList";
import { SearchBar } from "../../components/SearchBar";
import { useNavigation } from "@react-navigation/core";
import { Dropdown } from "../../components/Dropdown";

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
        <View style={{ marginEnd: 10 }}>
          {Platform.OS === "ios" ? (
            <Button
              onPress={() => navigation.navigate("SortBy")}
              title="Sort By"
            />
          ) : (
            <Dropdown
              type={DropdownType.SORT_BY}
              style={{ height: 100, width: 155 }}
            />
          )}
        </View>
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
