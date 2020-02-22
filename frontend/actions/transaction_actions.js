import * as API from "../util/transaction_util";

export const RECEIVE_TRANSACTIONS = "RECEIVE_TRANSACTIONS";


export const receiveTransactions = transactions => ({
  type: RECEIVE_TRANSACTIONS,
  transactions
})


export const fetchTransactions = () => dispatch => API.fetchTransactions()
  .then(transactions => (dispatch(receiveTransactions(transactions))))
