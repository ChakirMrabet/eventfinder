import { combineReducers } from "redux";

import events from "./events";
import categories from "./categories";
import times from "./times";
import ranges from "./ranges";
import map from "./map";

export default combineReducers({
  map,
  events,
  times,
  ranges,
  categories
});
