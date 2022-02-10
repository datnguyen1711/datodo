import { createStore } from "redux";
import rootReducer from "./reducer";

import { composeWithDevTools } from "redux-devtools-extension";

const enhancers = composeWithDevTools();

const store = createStore(rootReducer, enhancers);

export default store;
