class AddPriceColumnToTickers < ActiveRecord::Migration[5.2]
  def change
    add_column :tickers, :value, :float, null: false
    add_column :transactions, :buy, :boolean, null: false
    add_column :transactions, :price, :float, null: false
  end
end
