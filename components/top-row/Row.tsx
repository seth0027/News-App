import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { capitalize } from "../../utils/strings";

export const Row = ({
  position,
  item,
  index,
  setIndex,
}: {
  position: number;
  item: string;
  index: number;
  setIndex: (index: number) => void;
}) => (
  <TouchableOpacity
    key={position}
    onPress={() => {
      setIndex(position);
    }}
    style={{
      backgroundColor: index == position ? "white" : "transparent",
      marginEnd: 4,
      borderRadius: 4,
    }}
  >
    <Text style={{ fontSize: 20, margin: 8 }}>{capitalize(item)}</Text>
  </TouchableOpacity>
);
