import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchTickers } from '../../actions/ticker_actions';

export const StockIndex = () => {
    const dispatch = useDispatch();
    const tickers = useSelector(state => Object.values(state.entities.tickers) );
    const tickersSum = tickers.reduce((a, b) => a + (b["value"] || 0), 0).toFixed(2)

    useEffect(() => {
        dispatch(fetchTickers())
    }, [])

   return(
    <div className="stock-index">
        <h2>Portfolio (${tickersSum})</h2>
        <ul className="tickers">
        {tickers.map((ticker, idx) => (
            <li key={idx} className="ticker">
                <p>{ticker.symbol} - {ticker.shares}</p>
                <p>${ticker.value}</p>
            </li>
            ))}
        </ul>
    </div>
    )
}