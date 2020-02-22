import React from 'react';
import {PortfolioItem} from './portfolio_item';

export const PortfolioIndex = ({tickers, formatMoney}) => {
    // calculate sum of tickers for portfolio
    const tickersSum = tickers.reduce((a, b) => a + (b["value"] || 0), 0).toFixed(2)

   return(
    <div className="stock-index">
        <h2>Portfolio (${formatMoney(tickersSum)})</h2>
        <ul className="tickers">
        {tickers.map((ticker, idx) => {
            if (ticker.shares > 0){

                return (<li key={idx} className="ticker">
                    <PortfolioItem ticker={ticker} formatMoney={formatMoney} />
                </li>)
            }})}

        </ul>
    </div>
    )
}