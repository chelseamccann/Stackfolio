import { RECEIVE_NEW_TICKER, RECEIVE_UPDATED_TICKER, RECEIVE_TICKERS } from '../actions/ticker_actions';

export default (state = {}, action) => {
    Object.freeze(state);
    switch(action.type){
        case RECEIVE_NEW_TICKER:
            return Object.assign({}, state, {[action.ticker.id]: action.ticker})
        case RECEIVE_UPDATED_TICKER:
            let newState = Object.assign({}, state);
            let index
            Object.keys(newState).forEach(key => {
                if (newState[key]["id"] === action.ticker.id){ 
                    index = key 
                } 
            })
            newState[index] = action.ticker
            return newState
        case RECEIVE_TICKERS:
            return action.tickers
        default:
            return state;
    }
}