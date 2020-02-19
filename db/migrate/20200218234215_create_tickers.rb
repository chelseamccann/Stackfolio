class CreateTickers < ActiveRecord::Migration[5.2]
  def change
    create_table :tickers do |t|
      t.string :symbol
      t.integer :shares

      t.timestamps
    end
  end
end
