import React from "react";
import { View, Text } from "react-native";
import { NewsState } from "../screens/searchscreen/SearchScreenContext";
import { NewsList } from "./NewsList";

export const HeadlineView = ({
  state,
  category,
}: {
  state: NewsState;
  category: string;
}) => (
  <View
    style={{
      flex: 1,
      alignContent: "center",
      justifyContent: "center",
    }}
  >
    <View style={{ height: "10%" }} />
    <Text style={{ margin: 20, fontSize: 35, fontStyle: "italic" }}>
      {category}
    </Text>
    <View>
      <NewsList state={state} />
    </View>
  </View>
);
