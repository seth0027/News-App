import { Share } from "react-native";
import { Article } from "../models/NewsResponse";

export const onShare = async (item: Article) => {
  try {
    const result = await Share.share({
      message: item.url ?? "",
      url: item.url ?? "",
      title: item.title,
    });
  } catch (err) {
    alert(err?.message);
  }
};
