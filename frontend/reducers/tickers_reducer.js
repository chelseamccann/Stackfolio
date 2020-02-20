import { RECEIVE_TICKERS } from '../actions/ticker_actions';

export default (state = {}, action) => {
    Object.freeze(state);
    switch(action.type){
        // case RECEIVE_TRANSACTION:
        //     return Object.assign({}, state, {[action.transaction.id]: action.transaction})
        case RECEIVE_TICKERS:
            return action.tickers
        default:
            return state;
    }
}