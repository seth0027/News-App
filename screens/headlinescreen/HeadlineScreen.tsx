import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Button, View, Platform } from "react-native";

import { NewsList } from "../../components/NewsList";
import { useFetch } from "../../components/useFetch";

import { NewsState, reducer } from "../searchscreen/SearchScreenContext";
import { HeadlineStackParamList } from "./HeadlineStackScreen";
import PagerView from "react-native-pager-view";
import { HeadlineView } from "../../components/HeadlineView";
import { capitalize } from "../../utils/strings";

type HeadlineProps = {
  navigation: StackNavigationProp<HeadlineStackParamList, "Headline">;
};

const newsCategories = [
  "general",
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

const HeadlineScreen = ({ navigation }: HeadlineProps) => {
  const [state, dispatch] = React.useReducer(reducer, {});
  const [index, setIndex] = React.useState(0);

  useFetch({
    dispatch,
    endPoint: "top-headlines",
    queryParams: `?country=us&category=${newsCategories[index]}`,
    pageIndex: index,
  });

  return (
    <View style={{ flex: 1, justifyContent: "flex-end" }}>
      <PagerView
        initialPage={index}
        style={{ flex: 1 }}
        onPageSelected={(event) => {
          setIndex(event.nativeEvent.position);
        }}
      >
        {newsCategories.map((category, index) => (
          <View key={index}>
            <HeadlineView state={state} category={capitalize(category)} />
          </View>
        ))}
      </PagerView>
    </View>
  );
};

export default HeadlineScreen;
