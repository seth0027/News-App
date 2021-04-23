import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { NewsState } from "../screens/searchscreen/SearchScreenContext";
import { ArticleList } from "./ArticleList";

type NewsList = {
  state: NewsState;
};
export const NewsList = ({ state }: NewsList) => (
  <View>
    {state.isLoading ? (
      <ActivityIndicator size="large" />
    ) : (
      <ArticleList articles={state.newsResponse?.articles} />
    )}

    {state.errorMessage && (
      <Text style={{ color: "red", margin: 20, alignSelf: "center" }}>
        {state.errorMessage}
      </Text>
    )}
  </View>
);
