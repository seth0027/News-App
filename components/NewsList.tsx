import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import {
  NewsState,
  SearchScreenContext,
} from "../screens/searchscreen/SearchScreenContext";
import { ArticleList } from "./ArticleList";

export const NewsList = () => {
  const { state } = React.useContext(SearchScreenContext);
  return (
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
};
