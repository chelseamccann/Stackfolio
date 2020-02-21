import React, { useEffect, useState } from 'react';
import { fetchPrice } from '../../util/ticker_price_util';
import { fetchBP } from '../../actions/session_actions';
import { fetchTickers, createTicker, updateTicker } from '../../actions/ticker_actions';
import { useDispatch, useSelector } from "react-redux";

export const Stock = () => {
    const tickers = useSelector(state => Object.values(state.entities.tickers))
    const buyingPower = useSelector(state => state.entities.users[state.session.id].buying_power)
    const error = useSelector(state => state.errors.session.error)
    const dispatch = useDispatch();

    const [symbol, setSymbol] = useState('')
    const [shares, setShares] = useState('')

    const handleBuy = e => {
        e.preventDefault()
        fetchPrice(symbol)
        .then(price => {
            let ticker = {symbol, shares, value: price*shares}
            tickers.some(ticker=>ticker['symbol']===symbol) ? dispatch(updateTicker(ticker)).then(() => dispatch(fetchBP())) : dispatch(createTicker(ticker)).then(() => dispatch(fetchBP()))
        })
    }

    useEffect(() => {
        dispatch(fetchTickers())
    }, [])

    // const handleSell = e => {
    // }

   return(
    <div className="stock-form">
        <div>Cash - ${buyingPower}</div>
        <div>{ error ? error : null }</div>
        <form onSubmit={handleBuy}>
            <br />
            <br />
            <input
                type="text"
                value={symbol}
                onChange={e => setSymbol(e.target.value)}
                placeholder={" Ticker"}
                required
            />
            <br />
            <input
                type="number"
                min="0" 
                step="1"
                value={shares}
                onChange={e => setShares(e.target.value)}
                placeholder={" Qty"}
                required
            />
            <br />
            <button type="submit">Buy</button>
            <button type="submit">Sell</button>
        </form>
    </div>
    )
}