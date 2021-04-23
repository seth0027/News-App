import axios, { CancelToken } from "axios";
import React, { useEffect } from "react";
import { NewsResponse } from "../models/NewsResponse";
import {
  Action,
  ActionType,
} from "../screens/searchscreen/SearchScreenContext";
const PAGE_SIZE = 10;

export const useFetch = ({
  text,
  dispatch,
  queryParams,
  pageIndex,
  endPoint,
}: {
  text?: string;
  dispatch?: React.Dispatch<Action>;
  queryParams?: string;
  pageIndex?: number;
  endPoint: string;
}) => {
  useEffect(() => {
    const { cancel, token } = axios.CancelToken.source();

    const timeOut =
      text && text.length > 0
        ? setTimeout(() => fetchNews(token), 1000)
        : undefined;

    if (text === undefined) {
      fetchNews(token);
    }

    return () => {
      cancel();
      timeOut ? clearTimeout(timeOut) : undefined;
    };
  }, [text, pageIndex]);

  const fetchNews = async (cancelToken?: CancelToken) => {
    try {
      dispatch?.({ type: ActionType.LOADING });
      let url = `https://newsapi.org/v2/${endPoint}`;
      if (queryParams) {
        url += queryParams;
      }
      console.log("making a fetch request with url:", url);
      const { data } = await axios.get<NewsResponse>(url, {
        params: {
          apiKey: "1563e2534ead4d60a0b768507db99f49",
          pageSize: PAGE_SIZE,
        },
        cancelToken,
      });

      dispatch?.({ type: ActionType.SUCCESS, payload: { result: data } });
    } catch (err: any) {
      console.log("fetch request error occured", err);
      if (!axios.isCancel(err)) {
        dispatch?.({
          type: ActionType.ERROR,
          payload: { errorMessage: err.toString() },
        });
      }
    }
  };
};
