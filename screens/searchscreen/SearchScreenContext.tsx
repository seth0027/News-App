import axios, { CancelToken } from "axios";
import React from "react";
import { NewsResponse } from "../../models/NewsResponse";
import { news } from "../../news";
import { fetchData } from "../../utils/api";
import { newsCategories } from "../headlinescreen/HeadlineScreen";

export type NewsState = {
  isLoading?: boolean;
  errorMessage?: string;
  newsResponse?: NewsResponse;
  searchQuery?: string;
  categoryIndex?: number;
};

const initialState: NewsState = {};

export const SearchScreenContext = React.createContext<{
  state: NewsState;
  dispatch?: (action: Action) => void;
}>({ state: initialState });

export type Action = {
  type: ActionType;
  payload?: {
    result?: NewsResponse;
    errorMessage?: string;
    searchQuery?: string;
    token?: CancelToken;
    categoryIndex?: number;
  };
};

export enum ActionType {
  SUCCESS,
  LOADING,
  ERROR,
  FETCH_DATA_SEARCH,
  FETCH_DATA_HEADLINE,
  SEARCH_CHANGE,
  CATEGORY_INDEX_CHANGE,
}

export const reducer = (state: NewsState, action: Action): NewsState => {
  switch (action.type) {
    case ActionType.LOADING:
      return { ...state, isLoading: true, errorMessage: undefined };

    case ActionType.ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload?.errorMessage,
      };
    case ActionType.SUCCESS:
      return {
        ...state,
        isLoading: false,
        errorMessage: undefined,
        newsResponse: action.payload?.result,
      };
    case ActionType.SEARCH_CHANGE:
      return {
        ...state,
        searchQuery: action.payload?.searchQuery,
      };
    case ActionType.CATEGORY_INDEX_CHANGE:
      return {
        ...state,
        categoryIndex: action.payload?.categoryIndex,
      };
    default:
      return state;
  }
};

type SearchProviderProps = {
  children: React.ReactNode;
};
const PAGE_SIZE = 10;
export const SearchScreenProvider = ({ children }: SearchProviderProps) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const customDispatch = React.useCallback(async (action: Action) => {
    switch (action.type) {
      case ActionType.FETCH_DATA_SEARCH: {
        fetchData({
          endPoint: "everything",
          queryParams: `?q=${action.payload?.searchQuery}`,
          cancelToken: action.payload?.token,
          dispatch,
        });
        break;
      }
      case ActionType.FETCH_DATA_HEADLINE: {
        fetchData({
          endPoint: "top-headlines",
          queryParams: `?country=us&category=${
            newsCategories[action.payload?.categoryIndex ?? 0]
          }`,
          cancelToken: action.payload?.token,
          dispatch,
        });
        break;
      }

      default:
        dispatch(action);
    }
  }, []);

  return (
    <SearchScreenContext.Provider value={{ state, dispatch: customDispatch }}>
      {children}
    </SearchScreenContext.Provider>
  );
};
