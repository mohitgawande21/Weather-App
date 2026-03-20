import { SUBMIT, TOGGLE_VALUE, SAVE_ALL_CITIES } from "./ActionTypes";

export const onSubmit = (input) => {
  return {
    type: SUBMIT,
    payload: input,
  };
};

export const onToggle = (val) => {
  return {
    type: TOGGLE_VALUE,
    payload: val,
  };
};

export const saveAllCities = (cities) => {
  return {
    type: SAVE_ALL_CITIES,
    payload: cities,
  };
};
