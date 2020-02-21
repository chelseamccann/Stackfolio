import React, { useEffect, useState } from 'react';
import {fetchPrice} from '../../util/ticker_price_util';
// import { createTicker } from '../../util/ticker_util';
import { fetchTickers, createTicker, updateTicker } from '../../actions/ticker_actions';
import { useDispatch, useSelector } from "react-redux";

export const Stock = ({ currentUser }) => {
    const tickers = useSelector(state =>  Object.values(state.entities.tickers) );
    const dispatch = useDispatch();
    // const history = useHistory();

    useEffect(() => {
        dispatch(fetchTickers())
        // .then(() => { history.push("/stocks") } )
    }, [])

    const [symbol, setSymbol] = useState('')
    const [shares, setShares] = useState('')
    const [price, setPrice] = useState()

    const handleBuy = e => {
        e.preventDefault()
        fetchPrice(symbol)
        .then(price => {
            setPrice(price) 
            let ticker = {symbol, shares, value: price*shares}
            tickers.some(ticker=>ticker['symbol']===symbol) ? dispatch(updateTicker(ticker)) : dispatch(createTicker(ticker))
        })
    }

    // const handleSell = e => {

    // }

   return(
    <div>
        {price}
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