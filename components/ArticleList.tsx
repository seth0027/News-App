import React from "react";
import { FlatList, ListRenderItem } from "react-native";
import { Article } from "../models/NewsResponse";
import { ArticleRow } from "./ArticleRow";

const renderArticle: ListRenderItem<Article> = ({ item }) => (
  <ArticleRow item={item} />
);

type ArticleListProps = {
  articles?: Article[];
};



 export const ArticleList = ({ articles }: ArticleListProps) => (
  <FlatList
    data={articles}
    renderItem={renderArticle}
    keyExtractor={(_item, index) => index.toString()}
  />
);
