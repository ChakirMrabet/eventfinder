import axios from "axios";
import * as actionTypes from "../common";

export const fetchCategories = () => {
  return async dispatch => {
    const response = await axios.get(`/categories`);
    if (response.data.success) {
      dispatch({
        type: actionTypes.FETCH_CATEGORIES,
        payload: response.data.data
      });
    } else {
      dispatch({
        type: actionTypes.ERROR_FETCHING,
        payload:
          "There was a problem when retrieving data from the server. Please try again later. "
      });
    }
  };
};

export const selectCategory = categoryId => {
  return dispatch => {
    dispatch({
      type: actionTypes.SELECT_CATEGORY,
      payload: categoryId
    });
  };
};
