import { useRoute } from "@react-navigation/core";
import React from "react";
import { ActivityIndicator, Button, Platform, Text, View } from "react-native";
import { ActionType, NewsState, AppContext } from "../context/AppContext";
import { ArticleList } from "./ArticleList";
import { AntDesign } from "@expo/vector-icons";
import { Error } from "./Error";

export const NewsList = () => {
  const { state } = React.useContext(AppContext);
  const route = useRoute();
  return (
    <View>
      {state.isLoading ? (
        <ActivityIndicator
          color="#999999"
          size={Platform.OS === "ios" ? "large" : 45}
          style={{ margin: 45 }}
        />
      ) : (
        <ArticleList />
      )}
      {route.name === "Search" &&
        !state.isLoading &&
        !state.newsResponse &&
        !state.errorMessage && (
          <Text
            style={{
              margin: 15,
              fontSize: 20,
              textAlign: "center",
              color: "dimgray",
            }}
          >
            <AntDesign name="arrowup" size={24} color="dimgray" /> Start
            searching for any news topic.
          </Text>
        )}

      {state.errorMessage && <Error />}
    </View>
  );
};
