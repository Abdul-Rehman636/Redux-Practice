import { createStore } from "redux";
import todoReducer from "./Reducers/input";

const store = createStore(todoReducer);

export default store;
