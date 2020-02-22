import React, { useState } from 'react';

export const Header = ({tabStuff, changeTab, indexTab}) => {

    const idxTab = indexTab;
    const headers = tabStuff.map((el, indx) => {
        const title = el.title;
        const toggleActive = indx === idxTab ? 'active' : '';
        // const tabColor = indx === idxTab ? `${colorClass}tab` : `${colorClass}hover`
        return (
            <li 
            key = {indx}
            className = {`${toggleActive}`}
            // className = {`${tabColor}`}
            onClick = {() => changeTab(indx)}>
            {title}{' '}
            </li>
        );
    });

    return (
        <ul className={`tab-title`}>
            {headers}
        </ul>
        );
}