
@transactions.each do |transaction|
    json.(transaction, :buy, :price)
        json.ticker do
            json.extract! transactions.ticker, :symbol, :shares
        end
end