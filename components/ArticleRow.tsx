import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, Image, Text, TouchableHighlight } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Article } from "../models/NewsResponse";

type ArticleRowProps = {
  item: Article;
};
export const ArticleRow = ({ item }: ArticleRowProps) => {
  const navigation = useNavigation();
  return (
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
      <TouchableOpacity
        onPress={() => {
          console.log(item.url);
          navigation.navigate("Details", {
            url: item.url,
          });
        }}
      >
        <View>
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
            <Text style={{ fontSize: 22, fontWeight: "700" }}>
              {item.title}
            </Text>
            <Text style={{ fontSize: 18 }}>{item.description}</Text>
            <View
              style={{
                marginTop: 4,
                flexDirection: "row",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              <Text
                style={{ fontSize: 16, fontStyle: "italic", color: "grey" }}
              >
                {item.author}
              </Text>
              <Text
                style={{ fontSize: 16, fontStyle: "italic", color: "grey" }}
              >
                {item.publishedAt && new Date(item.publishedAt).toDateString()}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
