import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, Image, Text, TouchableHighlight, Share } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Article } from "../models/NewsResponse";
import { AntDesign } from "@expo/vector-icons";

type ArticleRowProps = {
  item: Article;
};
export const ArticleRow = ({ item }: ArticleRowProps) => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: item.url ?? "",
        url: item.url ?? "",
        title: item.title,
      });
    } catch (err) {
      alert(err?.message);
    }
  };
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
                url: item.url,
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
            <TouchableOpacity onPress={onShare}>
              <AntDesign
                name="sharealt"
                size={22}
                color="dimgray"
                style={{ alignSelf: "center" }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
