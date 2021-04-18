import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Button, View } from "react-native";
import { HeadlineStackParamList } from "./HeadlineStackScreen";

type HeadlineProps = {
  navigation: StackNavigationProp<HeadlineStackParamList, "Headline">;
};

const HeadlineScreen = ({ navigation }: HeadlineProps) => {
  return (
    <View style={{ flex: 1, alignContent: "center", justifyContent: "center" }}>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};
export default HeadlineScreen;
