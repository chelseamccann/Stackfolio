import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from '../../actions/transaction_actions';

export const TransactionIndex = () => {
    const dispatch = useDispatch();
    const transactions = useSelector(state => Object.values(state.entities.transactions) );

    useEffect(() => {
        dispatch(fetchTransactions())
    }, [])
    
   return(
    <div>
        <h2>Transactions</h2>
        <ul className="tickers">
        {transactions.map((transaction, idx) => (
            <li key={idx} className="ticker">
                <h2>Buy</h2>
                <h2>Ticker: {transaction.ticker.symbol}</h2>
                <h4>Number of Shares: {transaction.ticker.shares} @ {transaction.price}</h4>
            </li>
            ))}
        </ul>
    </div>
    )
}