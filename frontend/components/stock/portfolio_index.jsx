import React from 'react';
import {PortfolioItem} from './portfolio_item';

export const PortfolioIndex = ({tickers}) => {
    const tickersSum = tickers.reduce((a, b) => a + (b["value"] || 0), 0).toFixed(2)

   return(
    <div className="stock-index">
        <h2>Portfolio (${tickersSum})</h2>
        <ul className="tickers">
        {tickers.map((ticker, idx) => {
            debugger
            if (ticker.shares > 0){

                return (<li key={idx} className="ticker">
                    <PortfolioItem ticker={ticker} />
                </li>)
            }})}

        </ul>
    </div>
    )
}