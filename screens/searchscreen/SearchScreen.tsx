import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  ListRenderItem,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SearchStackParamList } from "./SearchStackScreen";
import { Ionicons } from "@expo/vector-icons";
import { ActionType, SearchScreenContext } from "./SearchScreenContext";
import { FlatList } from "react-native-gesture-handler";

import axios from "axios";
import { Article, NewsResponse } from "../../models/Article";

type SearchProps = {
  navigation: StackNavigationProp<SearchStackParamList, "Search">;
};

const PAGE_SIZE = 5;

const SearchScreen = ({ navigation }: SearchProps) => {
  const { state, dispatch } = React.useContext(SearchScreenContext);

  // React.useEffect(() => {
  //   console.log(state.newsResponse?.articles);
  // }, [state.newsResponse?.articles]);

  const renderArticle: ListRenderItem<Article> = ({ item }) => (
    <ArticleRow item={item} />
  );

  return (
    <View
      style={{ flex: 1, alignContent: "center", justifyContent: "flex-start" }}
    >
      <SearchBar />
      <ActivityIndicator
        size="large"
        style={{ opacity: state.isLoading ? 1 : 0 }}
      />

      <FlatList
        data={state.newsResponse?.articles}
        renderItem={renderArticle}
        keyExtractor={(item, index) => index.toString()}
      />

      {state.errorMessage && (
        <Text style={{ color: "red", margin: 20, alignSelf: "center" }}>
          {state.errorMessage}
        </Text>
      )}
    </View>
  );
};

type ArticleRowProps = {
  item: Article;
};

const ArticleRow = ({ item }: ArticleRowProps) => (
  <View style={{ margin: 20, borderRadius: 10, backgroundColor: "white" }}>
    <Image source={{ uri: item.urlToImage }} />
    <Text style={{ fontSize: 20 }}>{item.title}</Text>
    <Text>{item.description}</Text>
    <Text>{item.author}</Text>
  </View>
);

const SearchBar = () => {
  const [text, setText] = React.useState("");
  const { dispatch } = React.useContext(SearchScreenContext);

  const fetchNews = async () => {
    try {
      dispatch?.({ type: ActionType.LOADING });

      const { data } = await axios.get<NewsResponse>(
        "https://newsapi.org/v2/everything",
        {
          params: {
            q: text,
            apiKey: "1563e2534ead4d60a0b768507db99f49",
            pageSize: PAGE_SIZE,
          },
        }
      );

      console.log(data);
      dispatch?.({ type: ActionType.SUCCESS, payload: { result: data } });
    } catch (err: any) {
      dispatch?.({
        type: ActionType.ERROR,
        payload: { errorMessage: err.toString() },
      });
    }
  };

  return (
    <View style={{ flexDirection: "row", margin: 20 }}>
      <Ionicons
        name="search"
        size={20}
        style={{ marginEnd: 10, alignSelf: "center" }}
      />
      <TextInput
        style={{
          backgroundColor: "white",
          padding: 10,
          borderWidth: 0.1,
          width: "75%",
          fontSize: 20,
        }}
        autoFocus
        value={text}
        numberOfLines={2}
        onChangeText={(text) => setText(text)}
        placeholder="Search News..."
      />
      <Button title="Search" onPress={fetchNews} />
    </View>
  );
};
export default SearchScreen;
