import { useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { FlatList, ListRenderItem, RefreshControl, View } from "react-native";
import { Article } from "../models/NewsResponse";
import { newsCategories } from "../screens/headlinescreen/HeadlineScreen";
import { HeadlineStackParamList } from "../screens/headlinescreen/HeadlineStackScreen";
import {
  ActionType,
  SearchScreenContext,
} from "../screens/searchscreen/SearchScreenContext";
import { SearchStackParamList } from "../screens/searchscreen/SearchStackScreen";
import { capitalize } from "../utils/strings";
import { ArticleRow } from "./ArticleRow";
import { HeadlineText } from "./HeadlineText";

const renderArticle: ListRenderItem<Article> = ({ item }) => (
  <ArticleRow item={item} />
);

export const ArticleList = () => {
  const route = useRoute();
  const { state, dispatch } = React.useContext(SearchScreenContext);
  return (
    <View>
      <FlatList
        ListHeaderComponent={
          route.name === "Headline" ? (
            <HeadlineText
              title={capitalize(newsCategories[state.categoryIndex ?? 0])}
              style={{
                fontWeight: "300",
                color: "black",
                textAlign: "auto",
                width: "80%",
                alignSelf: "center",
              }}
            />
          ) : null
        }
        data={state.newsResponse?.articles}
        renderItem={renderArticle}
        keyExtractor={(_item, index) => index.toString()}
        refreshControl={
          <RefreshControl
            refreshing={state.isLoading ?? false}
            onRefresh={() => {
              dispatch?.({
                type: ActionType.REFRESH,
                payload: {
                  routeName: route.name,
                  searchQuery: state.searchQuery,
                  categoryIndex: state.categoryIndex,
                },
              });
            }}
          />
        }
      />
    </View>
  );
};
