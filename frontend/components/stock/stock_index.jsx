import React, { useEffect, useState } from 'react';
// import { fetchTickers } from '../../util/ticker_util';
import { fetchTickers } from '../../actions/ticker_actions';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export const StockIndex = () => {
    const tickers = useSelector(state => { 
        debugger
        return { stocksOwned: Object.values(state.entities.tickers) }
    });
    const dispatch = useDispatch();
    // const [tickers, setTickers] = useState([])
    const history = useHistory();

    useEffect(() => {
        dispatch(fetchTickers())
        .then(() => {
            // setTickers(response)
            history.push("/stocks");
        } )
        }, [])

   return(
    <div>
        <ul className="tickers">
        {tickers.stocksOwned.map((ticker, idx) => (
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