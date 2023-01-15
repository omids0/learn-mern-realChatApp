import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleWare from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { authReducer } from "./reducer/authReducer";

const rootReducer = combineReducers({
  auth: authReducer,
});

const composeEnhancer = composeWithDevTools({});

const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunkMiddleWare))
);

export default store;
