import React, { useEffect, useState } from 'react';
import {fetchPrice} from '../../util/ticker_price_util';
import { createTicker } from '../../util/ticker_util';

export const Stock = ({ currentUser }) => {
    const [symbol, setSymbol] = useState('')
    const [shares, setShares] = useState('')
    const [price, setPrice] = useState()

    const handleSubmit = e => {
        e.preventDefault()
        fetchPrice(symbol)
        .then(price => {
            setPrice(price) 
            let ticker = {symbol, shares, value: price*shares}
            createTicker(ticker)
        })
    }

   return(
    <div>

        {price}

        <form onSubmit={handleSubmit}>
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
        </form>
    </div>
    )
}