import * as actionTypes from "../common";

const defaultState = {
  selected: "all",
  items: []
};

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case actionTypes.FETCH_CATEGORIES:
      return {
        ...state,
        items: payload
      };
    case actionTypes.SELECT_CATEGORY:
      return {
        ...state,
        selected: payload
      };
    default:
      return state;
  }
};
