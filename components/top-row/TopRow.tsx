import React from "react";
import { ScrollView, View, Text, Touchable, Pressable } from "react-native";
import {
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { newsCategories } from "../../screens/headlinescreen/HeadlineScreen";
import { capitalize } from "../../utils/strings";
import { Row } from "./Row";

export const TopRow = ({
  index,
  setIndex,
}: {
  index: number;
  setIndex: (index: number) => void;
}) => {
  const ref = React.useRef<FlatList<any>>(null);

  React.useEffect(() => {
    console.log(index, "changed");
    ref.current?.scrollToIndex({ animated: true, index });
  }, [index]);
  return (
    <View style={{ margin: 20, marginBottom: 10 }}>
      <FlatList
        ref={(ref) => ref}
        horizontal
        data={newsCategories}
        renderItem={({
          item,
          index: position,
        }: {
          item: string;
          index: number;
        }) => (
          <Row
            index={index}
            position={position}
            setIndex={setIndex}
            item={item}
          />
        )}
        keyExtractor={(_item, index) => index.toString()}
      />
    </View>
  );
};
