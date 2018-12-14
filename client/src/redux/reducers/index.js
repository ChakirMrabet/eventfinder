import { combineReducers } from "redux";

import site from "./site";
import users from "./users";
import events from "./events";
import categories from "./categories";
import times from "./times";
import distances from "./distances";
import map from "./map";

export default combineReducers({
  map,
  events,
  times,
  distances,
  categories,
  site,
  users
});
