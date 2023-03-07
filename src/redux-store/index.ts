import { combineReducers } from "redux";
import { actions, reducers, sagas, selectors } from "./slices";
import { connectRouter } from "connected-react-router";
import { createBrowserHistory } from "history";

const createRootReducer = (history: any) =>
  combineReducers({
    router: connectRouter(history),
    ...reducers,
  });

const history = createBrowserHistory();
const rootReducer = createRootReducer(history);

export { actions, selectors, sagas, reducers };

export type RootState = ReturnType<typeof rootReducer>;
