import React from "react";
import { Text } from "react-native";
export const HeadlineText = ({ title }: { title: string }) => (
  <Text
    style={{
      fontSize: 30,
      fontWeight: "bold",
      fontStyle: "italic",
      color: "grey",
    }}
  >
    {title}
  </Text>
);
