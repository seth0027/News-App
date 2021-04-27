import React from "react";
import { View, Text, Button } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/core";
import {
  ActionType,
  AppContext,
} from "../context/AppContext";

export const Error = () => {
  const { state, dispatch } = React.useContext(AppContext);
  const route = useRoute();
  return (
    <View>
      <View>
        <Text
          style={{
            color: "red",
            margin: 20,
            alignSelf: "center",
            fontSize: 18,
          }}
        >
          {state.errorMessage}
        </Text>
        <View style={{ alignSelf: "center", margin: 5 }}>
          <Button
            title="Retry"
            onPress={() => {
              dispatch?.({
                type: ActionType.REFRESH,
                payload: {
                  routeName: route.name,
                  searchQuery: state.searchQuery,
                  categoryIndex: state.categoryIndex,
                },
              });
            }}
          />
        </View>
      </View>
    </View>
  );
};
