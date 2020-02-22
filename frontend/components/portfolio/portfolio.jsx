import React, { useState } from 'react';
import { fetchPrice } from '../../util/ticker_price_util';
import { fetchBP } from '../../actions/session_actions';
import { createTicker, updateTicker } from '../../actions/ticker_actions';
import { useDispatch, useSelector } from "react-redux";
import { Tabs } from './tabs';
import Search from '../search/search';

export const Portfolio = ({tickers, formatMoney}) => {
    const buyingPower = useSelector(state => state.entities.users[state.session.id].buying_power)
    const error = useSelector(state => state.errors.session.error)
    const dispatch = useDispatch();

    const [symbol, setSymbol] = useState('')
    const [shares, setShares] = useState('')
    const [apiError, setApiError] = useState('')

    // fetch current price for given symbol and create ticker if new, update if already held
    const handleBuy = e => {
        e.preventDefault()
        fetchPrice(symbol)
        .then(price => {
                let ticker = {symbol, shares, value: price*shares}
                tickers.some(ticker=>ticker['symbol']===symbol) ? dispatch(updateTicker(ticker)).then(() => dispatch(fetchBP())) : dispatch(createTicker(ticker)).then(() => dispatch(fetchBP()))
        },
            (error) => {
                if (error.status == 404){
                    setApiError(`Ticker ${symbol} does not exist.`)
                } else {
                    setApiError(error.responseText)
                }
            }
        )
    }

    // fetch current price and update ticker accordingly as sell
    const handleSell = e => {
        e.preventDefault()
        fetchPrice(symbol)
        .then(price => {
                let ticker = {symbol, shares: shares*-1, value: (price*shares)*-1}
                if (tickers.some(ticker=>ticker['symbol']===symbol)) {
                    dispatch(updateTicker(ticker)).then(() => dispatch(fetchBP()))
                }
        },
            (error) => {
                if (error.status == 404){
                    setApiError(`Ticker ${symbol} does not exist.`)
                } else {
                    setApiError(error.responseText)
                }
            }
        )
    }

   return(
    <div className="stock-form">
        <div className="cash">Available Cash: ${formatMoney(buyingPower)}</div>
        <Tabs tabStuff={[ 
            {title:`Buy`, content: 
                <form onSubmit={handleBuy}>
                    <input
                        className="inputs tk"
                        type="text"
                        value={symbol}
                        onChange={e => setSymbol(e.target.value)}
                        placeholder={" Ticker"}
                        required />

                    <input
                        className="inputs"
                        type="number"
                        min="0" 
                        step="1"
                        value={shares}
                        onChange={e => setShares(e.target.value)}
                        placeholder={" Qty"}
                        required />
                    <button className="buy-sell submit-buttons" type="submit">Buy</button>
                </form>
            },
            
            {title:`Sell`, content: 
                <form onSubmit={handleSell}>
                    <input
                        className="inputs tk"
                        type="text"
                        value={symbol}
                        onChange={e => setSymbol(e.target.value)}
                        placeholder={" Ticker"}
                        required />
                    <input
                        className="inputs"
                        type="number"
                        min="0" 
                        step="1"
                        value={shares}
                        onChange={e => setShares(e.target.value)}
                        placeholder={" Qty"}
                        required />
                    <button className="buy-sell submit-buttons" type="submit">Sell</button>
                </form>
            }
        ]} />
        <div>
            {apiError}
            { error ? error : null }
        </div>

        <div className="search-bar">
            <p>View historical prices before executing a transaction!</p> 
            <p>Search any ticker here:</p>
            <Search />
        </div>
    </div>
    )
}