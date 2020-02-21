class RemoveSymbolIndexOnTickers < ActiveRecord::Migration[5.2]
  def change
    remove_index "tickers", name: "index_tickers_on_symbol"
  end
end
