import React from "react";
import { View, Image, Text } from "react-native";
import { Article } from "../models/NewsResponse";

type ArticleRowProps = {
  item: Article;
};
export const ArticleRow = ({ item }: ArticleRowProps) => (
  <View
    style={{
      width: "85%",
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
        height: 200,
        resizeMode: "cover",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      }}
    />
    <View style={{ margin: 10 }}>
      <Text style={{ fontSize: 22, fontWeight: "700" }}>{item.title}</Text>
      <Text style={{ fontSize: 18 }}>{item.description}</Text>
      <View
        style={{
          marginTop: 4,
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Text style={{ fontSize: 16, fontStyle: "italic" }}>{item.author}</Text>
        <Text style={{ fontSize: 16, fontStyle: "italic" }}>
          {item.publishedAt}
        </Text>
      </View>
    </View>
  </View>
);
