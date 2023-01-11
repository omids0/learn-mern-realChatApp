import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import thunkMiddleWare from "redux-thunk";

const rootReducer = combineReducers({});

const middleware = [thunkMiddleWare];

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(
      ...middleware
      // window.__REDUX_DEVTOOLS_EXTENTION__ &&
      //   window.__REDUX_DEVTOOLS_EXTENTION__()
    )
  )
);

export default store;
