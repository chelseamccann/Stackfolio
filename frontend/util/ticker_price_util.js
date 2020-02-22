
export const fetchPrice = ticker => {
    return $.ajax({
        method: "GET", 
        url: `https://cloud.iexapis.com/stable/stock/${ticker}/price?token=${window.iexAPIKey}`
    })
}

export const fetchOpenClose = ticker => {
    return $.ajax({
        method: "GET",
        url: `https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=${window.iexAPIKey}`
    })
}

export const fetchDailyPrices = ticker => {
    return $.ajax({
        method: "GET",
        url: `https://cloud.iexapis.com/stable/stock/${ticker}/intraday-prices?token=${window.iexAPIKey}`
    })
}

export const fetchPrices = (symbol, timeFrame) => {
    return $.ajax({
        method: "GET", 
        url: `https://cloud.iexapis.com/stable/stock/${symbol}/chart/${timeFrame}?chartIEXOnly=true&token=${window.iexAPIKey}`
    })
}