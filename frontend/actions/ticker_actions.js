import * as API from "../util/ticker_util";

export const RECEIVE_TICKERS = "RECEIVE_TICKERS";

export const receiveTickers = tickers => ({
  type: RECEIVE_TICKERS,
  tickers
})

export const fetchTickers = () => dispatch => API.fetchTickers()
    .then(tickers => (dispatch(receiveTickers(tickers))))
  