import React, { useEffect, useState } from 'react';
import { fetchPrices } from '../../util/ticker_price_util';


export const PortfolioItem = ({ticker}) => {
    const [color, setColor] = useState('');

    // fetch opening price and compare to find color to assign
    useEffect(() => {
        fetchPrices(ticker.symbol)
        .then(price => {
          if (price[0].close < price[0].open) {
            setColor("red")
          } else if (price[0].close == price[0].open) {
            setColor("grey")
          } else{
            setColor("green") 
          }
        })
    }, [])

   return(
       <div>
           <p className={`item ${color}`}>{ticker.shares} Share {ticker.symbol} valued @ ${ticker.value} </p>
       </div>
   )
}