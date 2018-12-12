import * as actionTypes from "../common";

const defaultState = {
  currentLocation: {
    lat: 37.41,
    lng: -79.27
  }
};

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case actionTypes.MAP_CENTER_CHANGED:
      return { ...state, currentLocation: payload };
    default:
      return state;
  }
};
