import React from "react";
import { View, Text } from "react-native";
import {
  NewsState,
  AppContext,
} from "../context/AppContext";
import { NewsList } from "./NewsList";

export const HeadlineView = ({ category }: { category: string }) => {
  return (
    <View
      style={{
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <View style={{ height: "4%" }} />

      <View>
        <NewsList />
      </View>
    </View>
  );
};
