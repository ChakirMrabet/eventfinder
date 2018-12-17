import * as actionTypes from "../common";

export const selectRange = range => {
  return dispatch => {
    dispatch({
      type: actionTypes.SELECT_RANGE,
      payload: range
    });
  };
};
