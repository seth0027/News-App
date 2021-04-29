import axios, { CancelToken } from "axios";
import React from "react";
import { apiCountries } from "../data/api_countries";
import { NewsResponse } from "../models/NewsResponse";
import { news } from "../news";
import { fetchData } from "../utils/api";

export type NewsState = {
  isLoading?: boolean;
  errorMessage?: string;
  newsResponse?: NewsResponse;
  searchQuery?: string;
  categoryIndex?: number;
  sortByIndex?: number;
  countryIndex?: number;
};

export const newsCategories = [
  "general",
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

export const sortBy = ["relevancy", "popularity", "publishedAt"];

export enum DropdownType {
  SORT_BY,
  COUNTRY,
}
const initialState: NewsState = { sortByIndex: 2, countryIndex: 51 };

export const AppContext = React.createContext<{
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
    routeName?: string;
    dropdownType?: DropdownType;
    dropDownIndex?: number;
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
  REFRESH,
  DROP_DOWN_SELECTED,
  DROP_DOWN_COUNTRY_CHANGE,
  DROP_DOWN_SORT_CHANGE,
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

    case ActionType.DROP_DOWN_COUNTRY_CHANGE:
      return {
        ...state,
        countryIndex: action.payload?.dropDownIndex,
      };

    case ActionType.DROP_DOWN_SORT_CHANGE: {
      return {
        ...state,
        sortByIndex: action.payload?.dropDownIndex,
      };
    }
    default:
      return state;
  }
};

type AppProviderProps = {
  children: React.ReactNode;
};
const PAGE_SIZE = 10;
export const AppProvider = ({ children }: AppProviderProps) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const customDispatch = React.useCallback(async (action: Action) => {
    switch (action.type) {
      case ActionType.FETCH_DATA_SEARCH: {
        if (action.payload?.searchQuery === undefined) {
          break;
        }
        fetchData({
          endPoint: "everything",
          queryParams: `?q=${action.payload?.searchQuery}&sortBy=${
            sortBy[action.payload?.dropDownIndex ?? 2]
          }`,
          cancelToken: action.payload?.token,
          dispatch,
        });
        break;
      }
      case ActionType.FETCH_DATA_HEADLINE: {
        fetchData({
          endPoint: "top-headlines",
          queryParams: `?country=${
            apiCountries[action.payload?.dropDownIndex ?? 51].code
          }&category=${newsCategories[action.payload?.categoryIndex ?? 0]}`,
          cancelToken: action.payload?.token,
          dispatch,
        });
        break;
      }
      case ActionType.REFRESH: {
        const route = action.payload?.routeName;
        switch (route) {
          case "Search":
          case "Headline": {
            customDispatch({
              type:
                route === "Search"
                  ? ActionType.FETCH_DATA_SEARCH
                  : ActionType.FETCH_DATA_HEADLINE,

              payload: {
                searchQuery: action.payload?.searchQuery,
                categoryIndex: action.payload?.categoryIndex,
                dropDownIndex: action.payload?.dropDownIndex,
              },
            });
          }
        }
        break;
      }

      case ActionType.DROP_DOWN_SELECTED: {
        const dType = action.payload?.dropdownType;
        const ddIndex = action.payload?.dropDownIndex;
        if (dType === undefined) {
          break;
        }
        dispatch({
          type:
            dType === DropdownType.COUNTRY
              ? ActionType.DROP_DOWN_COUNTRY_CHANGE
              : ActionType.DROP_DOWN_SORT_CHANGE,
          payload: {
            dropDownIndex: ddIndex,
          },
        });

        customDispatch({
          type:
            dType === DropdownType.COUNTRY
              ? ActionType.FETCH_DATA_HEADLINE
              : ActionType.FETCH_DATA_SEARCH,
          payload: {
            searchQuery: action.payload?.searchQuery,
            categoryIndex: action.payload?.categoryIndex,
            dropDownIndex: ddIndex,
          },
        });

        break;
      }

      default:
        dispatch(action);
    }
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch: customDispatch }}>
      {children}
    </AppContext.Provider>
  );
};
