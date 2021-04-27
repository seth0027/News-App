import React from "react";
import { ScrollView, View, Text, Touchable, Pressable } from "react-native";
import {
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { newsCategories } from "../../screens/headlinescreen/HeadlineScreen";
import { AppContext } from "../../context/AppContext";
import { capitalize } from "../../utils/strings";
import { Row } from "./Row";

export const TopRow = () => {
  const ref = React.useRef<FlatList<any>>(null);
  const { state } = React.useContext(AppContext);

  React.useEffect(() => {
    ref.current?.scrollToIndex({
      animated: true,
      index: state.categoryIndex ?? 0,
    });
  }, [state.categoryIndex]);
  return (
    <View style={{ margin: 20, marginBottom: 10 }}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        ref={(ref) => ref}
        horizontal
        data={newsCategories}
        renderItem={({
          item,
          index: position,
        }: {
          item: string;
          index: number;
        }) => <Row position={position} item={item} />}
        keyExtractor={(_item, index) => index.toString()}
      />
    </View>
  );
};
