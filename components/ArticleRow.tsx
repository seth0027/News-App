import React from "react";
import { View, Image, Text } from "react-native";
import { Article } from "../models/NewsResponse";

type ArticleRowProps = {
  item: Article;
};
export const ArticleRow = ({ item }: ArticleRowProps) => (
  <View
    style={{
      width: "80%",
      marginVertical: 15,
      alignSelf: "center",
      borderRadius: 10,
      elevation: 5,
      backgroundColor: "white",
    }}
  >
    <Image
      source={{ uri: item.urlToImage }}
      style={{
        width: "100%",
        // aspectRatio: 1.8,
        height: 200,
        resizeMode: "cover",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      }}
    />
    <Text style={{ fontSize: 20 }}>{item.title}</Text>
    <Text>{item.description}</Text>
    <Text>{item.author}</Text>
  </View>
);
