
export const fetchPrice = (ticker) => {
    return $.ajax({
        method: "GET", 
        // url: `https://cloud.iexapis.com/stable/stock/${ticker}/price?token=pk_b6f890a95fb24dbfb1a85f362fe5687f`,
        url: `https://sandbox.iexapis.com/stable/stock/${ticker}/price?token=Tpk_4ca09027bbda4ce1a28d8e1702fafdaa`,
    })
}