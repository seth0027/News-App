import axios, { CancelToken } from "axios";
import React from "react";
import { NewsResponse } from "../../models/NewsResponse";
import { news } from "../../news";

export type NewsState = {
  isLoading?: boolean;
  errorMessage?: string;
  newsResponse?: NewsResponse;
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
    endPoint?: string;
    queryParams?: string;
    token?: CancelToken;
  };
};

export enum ActionType {
  SUCCESS,
  LOADING,
  ERROR,
  FETCH_DATA,
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
    const payload = action.payload;
    switch (action.type) {
      case ActionType.FETCH_DATA: {
        try {
          dispatch({ type: ActionType.LOADING });
          let url = `https://newsapi.org/v2/${payload?.endPoint}`;
          if (payload?.queryParams) {
            url += payload.queryParams;
          }
          console.log("making a fetch request with url:", url);
          const { data } = await axios.get<NewsResponse>(url, {
            params: {
              apiKey: "1563e2534ead4d60a0b768507db99f49",
              pageSize: PAGE_SIZE,
            },
            cancelToken: action.payload?.token,
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
