import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import topicReducer from "./TopicSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  topic: topicReducer,
});

export default rootReducer;
