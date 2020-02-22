import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from '../../actions/transaction_actions';
import { Link } from 'react-router-dom';

export const TransactionIndex = () => {
    const dispatch = useDispatch();
    const transactions = useSelector(state => Object.values(state.entities.transactions) );

    useEffect(() => {
        dispatch(fetchTransactions())
    }, [])
    
   return(
    <div className="stock-index">
        <h2 className="transaction-title">Transactions</h2>
        <ul className="tickers transactions">
        {transactions.map((transaction, idx) => (
            <li key={idx} className="ticker">
                <p>{transaction.buy ? "Buy" : "Sell"} ({transaction.ticker.symbol}) - {transaction.shares} @ {transaction.price}</p>
            </li>
            ))}
        </ul>
    </div>
    )
}