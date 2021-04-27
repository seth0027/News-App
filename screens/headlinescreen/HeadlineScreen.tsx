import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Button, View, Platform, Text } from "react-native";

import {
  ActionType,
  NewsState,
  reducer,
  AppContext,
} from "../../context/AppContext";
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
  const { state, dispatch } = React.useContext(AppContext);

  React.useEffect(() => {
    const { cancel, token } = axios.CancelToken.source();
    dispatch?.({
      type: ActionType.FETCH_DATA_HEADLINE,
      payload: {
        categoryIndex: state.categoryIndex,
        token,
      },
    });
    return () => {
      cancel();
    };
  }, [state.categoryIndex]);

  return (
    <View style={{ flex: 1, justifyContent: "flex-end" }}>
      <TopRow />
      <PagerView
        initialPage={state.categoryIndex}
        style={{ flex: 1 }}
        onPageSelected={(event) => {
          dispatch?.({
            type: ActionType.CATEGORY_INDEX_CHANGE,
            payload: { categoryIndex: event.nativeEvent.position },
          });
        }}
      >
        {newsCategories.map((_category, position) => (
          <View key={position}>
            <HeadlineView
              category={capitalize(newsCategories[state.categoryIndex ?? 0])}
            />
          </View>
        ))}
      </PagerView>
    </View>
  );
};

export default HeadlineScreen;
