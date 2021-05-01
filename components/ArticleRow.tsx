import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, Image, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Article } from "../models/NewsResponse";

import { StackNavigationProp } from "@react-navigation/stack";
import { SearchStackParamList } from "../screens/searchscreen/SearchStackScreen";
import { HeadlineStackParamList } from "../screens/headlinescreen/HeadlineStackScreen";
import { onShare } from "../utils/share";
import { ShareIcon } from "./ShareIcon";

type ArticleRowProps = {
  item: Article;
};

export const ArticleRow = ({ item }: ArticleRowProps) => {
  const navigation = useNavigation<
    StackNavigationProp<
      SearchStackParamList | HeadlineStackParamList,
      "Details"
    >
  >();
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
          <TouchableOpacity
            onPress={() => {
              console.log(item.url);
              navigation.navigate("Details", {
                article: item,
              });
            }}
          >
            <Text style={{ fontSize: 22, fontWeight: "700" }}>
              {item.title}
            </Text>
            <Text style={{ fontSize: 18 }}>{item.description}</Text>
          </TouchableOpacity>
          <View
            style={{
              marginTop: 4,
              flexDirection: "row",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <Text style={{ fontSize: 16, fontStyle: "italic", color: "grey" }}>
              {item.author}
            </Text>
            <Text style={{ fontSize: 16, fontStyle: "italic", color: "grey" }}>
              {item.publishedAt && new Date(item.publishedAt).toDateString()}
            </Text>
            <ShareIcon
              onPress={() => {
                onShare(item);
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
