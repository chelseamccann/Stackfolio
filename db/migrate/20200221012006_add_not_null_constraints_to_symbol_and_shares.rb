class AddNotNullConstraintsToSymbolAndShares < ActiveRecord::Migration[5.2]
  def change
    change_column_null :tickers, :symbol, false
    change_column_null :tickers, :shares, false
  end
end
