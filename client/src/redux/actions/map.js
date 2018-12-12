import * as actionTypes from "../common";

export const mapSetCenter = ({lat, lng}) => {
  return async dispatch => {
    dispatch({
      type: actionTypes.MAP_CENTER_CHANGED,
      payload: { lat, lng }
    });
  };
};
