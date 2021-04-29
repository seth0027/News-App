import React from "react";
import { Picker } from "@react-native-picker/picker";
import {
  ActionType,
  AppContext,
  countryCodes,
  DropdownType,
  sortBy,
} from "../context/AppContext";
import { capitalize } from "../utils/strings";
import { StyleProp, TextStyle } from "react-native";

export const Dropdown = ({
  type,
  style,
}: {
  type: DropdownType;
  style?: StyleProp<TextStyle>;
}) => {
  const { state, dispatch } = React.useContext(AppContext);
  const value = (() => {
    switch (type) {
      case DropdownType.COUNTRY:
        return state.countryIndex;
      case DropdownType.SORT_BY:
        return state.sortByIndex;
    }
  })();
  const values = (() => {
    switch (type) {
      case DropdownType.COUNTRY:
        return countryCodes.map((co) => co.toUpperCase());
      case DropdownType.SORT_BY:
        return sortBy.map((val) => capitalize(val));
    }
  })();

  return (
    <Picker
      style={[style]}
      selectedValue={value}
      onValueChange={(itemValue, itemIndex) => {
        if (itemValue !== value) {
          dispatch?.({
            type: ActionType.DROP_DOWN_SELECTED,
            payload: {
              dropdownType: type,
              dropDownIndex: itemValue,
              searchQuery: state.searchQuery,
              categoryIndex: state.categoryIndex,
            },
          });
        }
      }}
    >
      {values.map((value, index) => (
        <Picker.Item key={value} label={value} value={index} />
      ))}
    </Picker>
  );
};
