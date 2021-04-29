import axios, { CancelToken } from "axios";
import React from "react";
import { NewsResponse } from "../models/NewsResponse";
import { Action, ActionType } from "../context/AppContext";

const PAGE_SIZE = 100;
export const fetchData = async ({
  endPoint,
  queryParams,
  cancelToken,
  dispatch,
}: {
  endPoint?: string;
  queryParams?: string;
  cancelToken?: CancelToken;
  dispatch: React.Dispatch<Action>;
}) => {
  try {
    dispatch({ type: ActionType.LOADING });
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

    dispatch({ type: ActionType.SUCCESS, payload: { result: data } });
  } catch (err: any) {
    console.log("fetch request error occured", err);
    if (!axios.isCancel(err)) {
      dispatch({
        type: ActionType.ERROR,
        payload: { errorMessage: err.toString() },
      });
    }
  }
};
