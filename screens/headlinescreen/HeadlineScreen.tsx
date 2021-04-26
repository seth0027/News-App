import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Button, View, Platform, Text } from "react-native";

import {
  ActionType,
  NewsState,
  reducer,
  SearchScreenContext,
} from "../searchscreen/SearchScreenContext";
import { HeadlineStackParamList } from "./HeadlineStackScreen";
import PagerView from "react-native-pager-view";
import { HeadlineView } from "../../components/HeadlineView";
import { capitalize } from "../../utils/strings";
import { ScrollView } from "react-native-gesture-handler";
import { TopRow } from "../../components/top-row/TopRow";
import axios from "axios";

type HeadlineProps = {
  navigation: StackNavigationProp<HeadlineStackParamList, "Headline">;
};

export const newsCategories = [
  "general",
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

const HeadlineScreen = ({}: HeadlineProps) => {
  const { dispatch } = React.useContext(SearchScreenContext);
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const { cancel, token } = axios.CancelToken.source();
    dispatch?.({
      type: ActionType.FETCH_DATA,
      payload: {
        endPoint: "top-headlines",
        queryParams: `?country=us&category=${newsCategories[index]}`,
        token,
      },
    });
    return () => {
      cancel();
    };
  }, [index]);

  return (
    <View style={{ flex: 1, justifyContent: "flex-end" }}>
      <TopRow index={index} setIndex={(index) => setIndex(index)} />
      <PagerView
        initialPage={index}
        style={{ flex: 1 }}
        onPageSelected={(event) => {
          setIndex(event.nativeEvent.position);
        }}
      >
        {newsCategories.map((_category, position) => (
          <View key={position}>
            <HeadlineView category={capitalize(newsCategories[index])} />
          </View>
        ))}
      </PagerView>
    </View>
  );
};

export default HeadlineScreen;
