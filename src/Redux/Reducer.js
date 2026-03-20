import { SUBMIT } from "./ActionTypes";
import { TOGGLE_VALUE } from "./ActionTypes";
const initialState = {
  inputCity: "",
  Check: false,
  allCities: [],
};

export const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT:
      return {
        ...state,
        inputCity: action.payload,
      };
    case TOGGLE_VALUE:
      return {
        ...state,
        Check: action.payload,
      };
    case "SAVE_ALL_CITIES":
      return {
        ...state,
        allCities: action.payload,
      };
    default:
      return state;
  }
};
