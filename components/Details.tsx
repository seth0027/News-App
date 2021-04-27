import { RouteProp, useRoute } from "@react-navigation/core";
import React from "react";
import WebView from "react-native-webview";
import { HeadlineStackParamList } from "../screens/headlinescreen/HeadlineStackScreen";
import { SearchStackParamList } from "../screens/searchscreen/SearchStackScreen";

export const Details = () => {
  const route = useRoute<
    RouteProp<HeadlineStackParamList | SearchStackParamList, "Details">
  >();

  const uri = route.params?.url ?? "https://google.com";
  return (
    <WebView
      scrollEnabled
      source={{ uri }}
      containerStyle={{ flex: 1 }}
    />
  );
};
