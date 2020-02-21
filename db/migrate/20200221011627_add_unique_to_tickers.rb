class AddUniqueToTickers < ActiveRecord::Migration[5.2]
  def change
    add_index :tickers, :symbol, unique: true
  end
end
