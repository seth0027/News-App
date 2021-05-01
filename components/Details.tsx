import { RouteProp, useRoute } from "@react-navigation/core";
import React from "react";
import { View } from "react-native";
import WebView from "react-native-webview";
import { HeadlineStackParamList } from "../screens/headlinescreen/HeadlineStackScreen";
import { SearchStackParamList } from "../screens/searchscreen/SearchStackScreen";
import { onShare } from "../utils/share";
import { ShareIcon } from "./ShareIcon";

export const Details = () => {
  const route = useRoute<
    RouteProp<HeadlineStackParamList | SearchStackParamList, "Details">
  >();

  const { article } = route.params;
  return (
    <View style={{ flex: 1 }}>
      <WebView
        scrollEnabled
        source={{ uri: article.url ?? "" }}
        containerStyle={{ flex: 1 }}
      />
      <ShareIcon
        size={35}
        onPress={() => {
          onShare(article);
        }}
        style={{
          position: "absolute",
          bottom: 15,
          right: 15,
          backgroundColor: "white",
          padding: 15,
          borderRadius: 50,
          elevation: 8,
        }}
      />
    </View>
  );
};
