
export const fetchPrice = (ticker) => {
    return $.ajax({
        method: "GET", 
        url: `https://sandbox.iexapis.com/stable/stock/${ticker}/price?token=Tpk_4ca09027bbda4ce1a28d8e1702fafdaa`,
    })
}

export const fetchPrices = ticker => {
    return $.ajax({
        method: "GET",
        url: `https://sandbox.iexapis.com/stable/stock/${ticker}/intraday-prices?token=Tpk_4ca09027bbda4ce1a28d8e1702fafdaa`
        
    })
}