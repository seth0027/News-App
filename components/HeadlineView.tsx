import React from "react";
import { View, Text } from "react-native";
import {
  NewsState,
  SearchScreenContext,
} from "../screens/searchscreen/SearchScreenContext";
import { NewsList } from "./NewsList";

export const HeadlineView = ({ category }: { category: string }) => {
  const { state } = React.useContext(SearchScreenContext);
  return (
    <View
      style={{
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <View style={{ height: "8%" }} />
      {!state.isLoading && (
        <Text style={{ margin: 20, fontSize: 35, fontStyle: "italic" }}>
          {category}
        </Text>
      )}
      <View>
        <NewsList />
      </View>
    </View>
  );
};
