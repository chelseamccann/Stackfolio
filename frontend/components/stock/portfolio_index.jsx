import React from 'react';
import {PortfolioItem} from './portfolio_item';

export const PortfolioIndex = ({tickers}) => {
    const tickersSum = tickers.reduce((a, b) => a + (b["value"] || 0), 0).toFixed(2)

   return(
    <div className="stock-index">
        <h2>Portfolio (${tickersSum})</h2>
        <ul className="tickers">
        {tickers.map((ticker, idx) => (
            <li key={idx} className="ticker">
                <PortfolioItem ticker={ticker} />
                {/* <p>{ticker.symbol} - {ticker.shares}</p>
                <p>${ticker.value}</p> */}
            </li>
            ))}
        </ul>
    </div>
    )
}