import * as actionTypes from "../common";

const defaultState = {
  tracking: false,
  notificationText: null
};

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case actionTypes.GETTING_CURRENT_LOCATION_START:
      return { ...state, tracking: true };
    case actionTypes.GETTING_CURRENT_LOCATION_END:
      return { ...state, tracking: false };
    case actionTypes.NOTIFICATION_SET:
      return { ...state, notificationText: payload };
    case actionTypes.NOTIFICATION_REMOVE:
      return { ...state, notificationText: null };
    default:
      return state;
  }
};
