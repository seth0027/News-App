import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Button, View, Platform, Text } from "react-native";

import {
  ActionType,
  NewsState,
  reducer,
  AppContext,
  newsCategories,
} from "../../context/AppContext";
import { HeadlineStackParamList } from "./HeadlineStackScreen";
import PagerView from "react-native-pager-view";
import { HeadlineView } from "../../components/HeadlineView";
import { capitalize } from "../../utils/strings";
import { ScrollView } from "react-native-gesture-handler";
import { TopRow } from "../../components/top-row/TopRow";
import axios from "axios";
import { useNavigation } from "@react-navigation/core";

type HeadlineProps = {
  navigation: StackNavigationProp<HeadlineStackParamList, "Headline">;
};

const HeadlineScreen = ({}: HeadlineProps) => {
  const { state, dispatch } = React.useContext(AppContext);
  const navigation = useNavigation<
    StackNavigationProp<HeadlineStackParamList, "Headline">
  >();

  React.useEffect(() => {
    const { cancel, token } = axios.CancelToken.source();
    dispatch?.({
      type: ActionType.FETCH_DATA_HEADLINE,
      payload: {
        dropDownIndex: state.countryIndex,
        categoryIndex: state.categoryIndex,
        token,
      },
    });
    return () => {
      cancel();
    };
  }, [state.categoryIndex]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => navigation.navigate("Country")}
          title="Country"
        />
      ),
    });
  }, [navigation]);

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
