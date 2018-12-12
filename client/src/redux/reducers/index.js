import { combineReducers } from "redux";

import site from "./site";
import users from "./users";
import events from "./events";
import map from "./map";

export default combineReducers({
  site,
  users,
  events,
  map
});
