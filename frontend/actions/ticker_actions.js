import * as API from "../util/ticker_util";

export const RECEIVE_NEW_TICKER = "RECEIVE_NEW_TICKER";
export const RECEIVE_UPDATED_TICKER = "RECEIVE_UPDATED_TICKER";
export const RECEIVE_TICKERS = "RECEIVE_TICKERS";

export const receiveNewTicker = ticker => ({
  type: RECEIVE_NEW_TICKER,
  ticker
})

export const receiveUpdatedTicker = ticker => ({
  type: RECEIVE_UPDATED_TICKER,
  ticker
})

export const receiveTickers = tickers => {
  debugger
  return {
  type: RECEIVE_TICKERS,
  tickers
}}

export const fetchTickers = () => dispatch => API.fetchTickers()
    .then(tickers => {
      debugger
      return (dispatch(receiveTickers(tickers)))
    })
  
export const createTicker = (ticker) => dispatch => API.createTicker(ticker)
    .then(ticker => (dispatch(receiveNewTicker(ticker))))

export const updateTicker = (ticker) => dispatch => API.updateTicker(ticker)
    .then(ticker => (dispatch(receiveUpdatedTicker(ticker))))