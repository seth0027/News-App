import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Button, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { NewsList } from "../../components/NewsList";
import { useFetch } from "../../components/useFetch";
import { news } from "../../news";
import {
  Action,
  ActionType,
  NewsState,
  reducer,
} from "../searchscreen/SearchScreenContext";
import { HeadlineStackParamList } from "./HeadlineStackScreen";

type HeadlineProps = {
  navigation: StackNavigationProp<HeadlineStackParamList, "Headline">;
};

const HeadlineScreen = ({ navigation }: HeadlineProps) => {
  const [state, dispatch] = React.useReducer(reducer, {});

  useFetch({
    dispatch,
    endPoint: "top-headlines",
    queryParams: "?country=us",
  });

  return (
    <View style={{ flex: 1, alignContent: "center", justifyContent: "center" }}>
      <View>
        <NewsList state={state} />
      </View>
    </View>
  );
};
export default HeadlineScreen;
