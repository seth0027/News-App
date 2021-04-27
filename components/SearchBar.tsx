import axios, { CancelToken } from "axios";
import React, { useEffect } from "react";
import { StyleProp, TextInput, View, ViewStyle } from "react-native";
import { NewsResponse } from "../models/NewsResponse";
import {
  Action,
  ActionType,
  AppContext,
} from "../context/AppContext";
import { Ionicons } from "@expo/vector-icons";

export const SearchBar = ({ style }: { style?: StyleProp<ViewStyle> }) => {
  const { state, dispatch } = React.useContext(AppContext);

  React.useEffect(() => {
    const search = state.searchQuery;
    const { cancel, token } = axios.CancelToken.source();
    const timeOut =
      search && search?.length > 0
        ? setTimeout(() => {
            dispatch?.({
              type: ActionType.FETCH_DATA_SEARCH,
              payload: {
                searchQuery: state.searchQuery,
                token,
              },
            });
          }, 1000)
        : undefined;

    return () => {
      cancel();
      timeOut && clearTimeout(timeOut);
    };
  }, [state.searchQuery]);

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
        value={state.searchQuery}
        numberOfLines={2}
        onChangeText={(text) =>
          dispatch?.({
            type: ActionType.SEARCH_CHANGE,
            payload: { searchQuery: text },
          })
        }
        placeholder="Search News..."
      />
    </View>
  );
};
