import React from "react";
import { StyleProp, Text, TextStyle } from "react-native";
export const HeadlineText = ({
  title,
  style,
}: {
  title: string;
  style?: StyleProp<TextStyle>;
}) => (
  <Text
    style={[
      {
        fontSize: 30,
        fontWeight: "bold",
        fontStyle: "italic",
        color: "grey",
      },
      style,
    ]}
  >
    {title}
  </Text>
);
