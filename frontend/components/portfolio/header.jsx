import React from 'react';

// Build tabs and toggle the active class based on which is clicked
export const Header = ({tabStuff, changeTab, indexTab}) => {

    const idxTab = indexTab;
    const headers = tabStuff.map((el, indx) => {
        const title = el.title;
        const toggleActive = indx === idxTab ? 'active' : '';
        return (
            <li 
                key = {indx}
                className = {`${toggleActive}`}
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