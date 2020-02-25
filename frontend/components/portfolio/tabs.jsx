import React, { useState } from 'react';
import {Header} from './header';

// Show tab content for current tab
export const Tabs = ({tabStuff}) => {

    const [indexTab, setIndexTab] = useState(0)

    const changeTab = idx => setIndexTab(idx)
    const currentTab = tabStuff[indexTab];

    return (
    <div className='tabs'>
        <ul className='tab-box'>
            <Header tabStuff={tabStuff} changeTab={changeTab} indexTab={indexTab}/>
            <div className='tab-content'>    
                <article>
                    {currentTab.content}
                </article>
            </div>
        </ul>
    </div>
    )

}