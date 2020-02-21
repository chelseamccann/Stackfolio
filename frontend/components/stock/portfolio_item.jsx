import React, { useEffect, useState } from 'react';
import { fetchOpenPrice, fetchPrices } from '../../util/ticker_price_util';

export const PortfolioItem = ({ticker}) => {
    const [open, setOpen] = useState();
    const [color, setColor] = useState('');

    // useEffect(() => {
    //     return fetchPrices(ticker.symbol).then(price => {
    //         let open = price[0].open;
    //         let close = price[0].close;
    //         let color;

    //         setOpen(open)

    //         if (close < open){
    //             color = "red"
    //         } else if (close == open){
    //             color = "grey"
    //         } else {
    //             color = "green"
    //         }

    //         setColor(color)
    //     }) 
    // }, [])

   return(
       <div>
           <p className={`${color}`}>{ticker.symbol} - {ticker.shares}</p>
           <p className={`${color}`}>${ticker.value}</p>
       </div>
   )
}