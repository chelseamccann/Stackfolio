import React, { useEffect, useState } from 'react';
import { fetchOpenClose } from '../../util/ticker_price_util';


export const PortfolioItem = ({ticker, formatMoney}) => {
    const [color, setColor] = useState('');

    // fetch opening price and compare to find color to assign
    useEffect(() => {
      fetchOpenClose(ticker.symbol)
        .then(price => {
          let open = price.open
          let close = price.latestPrice
          if (close < open) {
            setColor("red")
          } else if (close > open) {
            setColor("green")
          } else{
            setColor("grey") 
          }
        })
    }, [])

   return(
       <div>
           <p className={`item ${color}`}>{ticker.shares} Share {ticker.symbol} valued @ {formatMoney(ticker.value)} </p>
       </div>
   )
}