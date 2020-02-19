import React, { useEffect, useState } from 'react';
import { fetchTickers } from '../../util/ticker_util';
import { useHistory } from "react-router-dom";

export const StockIndex = () => {
    const [tickers, setTickers] = useState([])
    const history = useHistory();

    useEffect(() => {
        fetchTickers()
        .then(response => {
            setTickers(response)
            history.push("/stocks");
        } )
        }, [])

   return(
    <div>
        <ul className="tickers">
        {tickers.map((ticker, idx) => (
            <li key={idx} className="ticker">
                <h2>Ticker Symbol: {ticker.symbol}</h2>
                <h4>Number of Shares: {ticker.shares}</h4>
                <p>Value: {ticker.value}</p>
            </li>
            ))}
        </ul>
    </div>
    )
}