import * as actionTypes from "../common";
import config from "../../config";

const defaultState = {
  currentZoom: 10,
  currentLocation: config.defaultLocation,
  currentAddress: config.currentAddress
};

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case actionTypes.MAP_ZOOM_CHANGED:
      return { ...state, currentZoom: payload };
    case actionTypes.MAP_CENTER_CHANGED:
      return { ...state, currentLocation: payload };
    default:
      return state;
  }
};
