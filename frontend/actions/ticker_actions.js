import * as API from "../util/ticker_util";

export const RECEIVE_NEW_TICKER = "RECEIVE_NEW_TICKER";
export const RECEIVE_UPDATED_TICKER = "RECEIVE_UPDATED_TICKER";
export const RECEIVE_TICKERS = "RECEIVE_TICKERS";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";

export const receiveNewTicker = ticker => ({
  type: RECEIVE_NEW_TICKER,
  ticker
})

export const receiveUpdatedTicker = ticker => ({
  type: RECEIVE_UPDATED_TICKER,
  ticker
})

export const receiveTickers = tickers => ({
  type: RECEIVE_TICKERS,
  tickers
})

export const receiveErrors = errors => ({
  type: RECEIVE_ERRORS,
  errors
})

export const fetchTickers = () => dispatch => API.fetchTickers()
    .then(tickers => (dispatch(receiveTickers(tickers))),
    err => (
      dispatch(receiveErrors(err.responseJSON))
    ))
  
export const createTicker = (ticker) => dispatch => API.createTicker(ticker)
    .then(ticker => (dispatch(receiveNewTicker(ticker))),
    err => (
      dispatch(receiveErrors(err.responseJSON))
    ))

export const updateTicker = (ticker) => dispatch => API.updateTicker(ticker)
    .then(ticker => (dispatch(receiveUpdatedTicker(ticker))),
    err => (
      dispatch(receiveErrors(err.responseJSON))
    ))