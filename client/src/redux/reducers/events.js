import * as actionTypes from "../common";

const defaultState = {
  total: 0,
  loading: false,
  items: [],
  selected: null
};

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case actionTypes.FETCHING_EVENTS:
      return { ...state, selected: null, loading: true };
    case actionTypes.FETCH_EVENTS:
      return {
        ...state,
        total: payload.data.total,
        items: payload.data.items,
        loading: false,
        selected: null
      };
    case actionTypes.SELECT_EVENT:
      return { ...state, selected: payload };
    default:
      return state;
  }
};
