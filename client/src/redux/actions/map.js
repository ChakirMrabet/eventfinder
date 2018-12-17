import * as actionTypes from "../common";

export const mapSetCenter = ({ lat, lng }) => {
  return async dispatch => {
    dispatch({
      type: actionTypes.MAP_CENTER_CHANGED,
      payload: { lat, lng }
    });
  };
};

export const setZoom = zoom => {
  return dispatch => {
    dispatch({
      type: actionTypes.MAP_ZOOM_CHANGED,
      payload: zoom
    });
  };
};
