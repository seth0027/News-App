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
  dispatch?: React.Dispatch<Action>;
}>({ state: initialState });

export type Action = {
  type: ActionType;
  payload?: { result?: NewsResponse; errorMessage?: string };
};

export enum ActionType {
  SUCCESS,
  LOADING,
  ERROR,
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
  }
};

type SearchProviderProps = {
  children: React.ReactNode;
};
export const SearchScreenProvider = ({ children }: SearchProviderProps) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <SearchScreenContext.Provider value={{ state, dispatch }}>
      {children}
    </SearchScreenContext.Provider>
  );
};
