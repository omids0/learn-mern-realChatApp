import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleWare from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { authReducer } from "./reducer/authReducer";
import { messengerReducer } from "./reducer/messengerReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  messenger: messengerReducer,
});

const composeEnhancer = composeWithDevTools({});

const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunkMiddleWare))
);

export default store;
