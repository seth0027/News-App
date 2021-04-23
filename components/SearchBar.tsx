import axios, { CancelToken } from "axios";
import React, { useEffect } from "react";
import { StyleProp, TextInput, View, ViewStyle } from "react-native";
import { NewsResponse } from "../models/NewsResponse";
import {
  Action,
  ActionType,
} from "../screens/searchscreen/SearchScreenContext";
import { Ionicons } from "@expo/vector-icons";
import { useFetch } from "./useFetch";

export const SearchBar = ({
  style,
  dispatch,
}: {
  style?: StyleProp<ViewStyle>;
  dispatch?: React.Dispatch<Action>;
}) => {
  const [text, setText] = React.useState("");

  useFetch({
    text,
    dispatch,
    endPoint: "everything",
    queryParams: `?q=${text}`,
  });

  return (
    <View style={[{ flexDirection: "row", margin: 20 }, style]}>
      <Ionicons
        name="search"
        size={20}
        style={{ marginEnd: 10, alignSelf: "center", marginStart: -20 }}
      />
      <TextInput
        style={{
          backgroundColor: "white",
          padding: 10,
          borderWidth: 0,

          elevation: 5,
          width: "95%",
          fontSize: 15,
          borderRadius: 5,
        }}
        autoFocus
        value={text}
        numberOfLines={2}
        onChangeText={(text) => setText(text)}
        placeholder="Search News..."
      />
    </View>
  );
};
