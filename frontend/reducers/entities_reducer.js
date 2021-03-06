import { combineReducers } from "redux";
import usersReducer from "./users_reducer";
import tickersReducer from "./tickers_reducer";
import transactionsReducer from "./transactions_reducer";

const entitiesReducer = combineReducers({
  users: usersReducer,
  tickers: tickersReducer,
  transactions: transactionsReducer
});

export default entitiesReducer;