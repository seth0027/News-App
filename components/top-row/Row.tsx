import React from "react";
import { TouchableOpacity, Text } from "react-native";
import {
  ActionType,
  AppContext,
} from "../../context/AppContext";
import { capitalize } from "../../utils/strings";

export const Row = ({ position, item }: { position: number; item: string }) => {
  const { state, dispatch } = React.useContext(AppContext);
  const bool = state.categoryIndex == position;
  return (
    <TouchableOpacity
      key={position}
      onPress={() => {
        dispatch?.({
          type: ActionType.CATEGORY_INDEX_CHANGE,
          payload: { categoryIndex: position },
        });
      }}
      style={{
        backgroundColor: bool ? "white" : "transparent",
        marginEnd: 4,
        borderRadius: 4,
        elevation: bool ? 4 : 0,
      }}
    >
      <Text style={{ fontSize: 20, margin: 8 }}>{capitalize(item)}</Text>
    </TouchableOpacity>
  );
};
