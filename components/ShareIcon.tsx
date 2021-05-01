import React from "react";
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { TouchableHighlight } from "react-native-gesture-handler";

export const ShareIcon = ({
  onPress,
  style,
  size,
}: {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  size?: number;
}) => (
  <TouchableOpacity onPress={onPress} style={style}>
    <AntDesign
      name="sharealt"
      size={size ?? 22}
      color="dimgray"
      style={[{ alignSelf: "center" }]}
    />
  </TouchableOpacity>
);
