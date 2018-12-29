import * as actionTypes from "../common";

const defaultState = {
  total: 0,
  loading: false,
  items: [],
  infoBarOpen: false,
  infoBarLoading: false,
  selected: null
};

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case actionTypes.FETCH_EVENTS_STARTED:
      return { ...state, infoBarOpen: false, selected: null, loading: true };
    case actionTypes.FETCH_EVENTS_ENDED:
      return { ...state, loading: false };
    case actionTypes.FETCH_EVENTS:
      return {
        ...state,
        total: payload.data.total,
        items: payload.data.items
      };
    case actionTypes.SELECT_EVENT_STARTED:
      return { ...state, infoBarOpen: true, infoBarLoading: true };
    case actionTypes.SELECT_EVENT_ENDED:
      return { ...state, infoBarLoading: false, selected: payload };
    default:
      return state;
  }
};
