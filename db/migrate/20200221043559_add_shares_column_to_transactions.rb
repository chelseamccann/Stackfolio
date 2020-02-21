class AddSharesColumnToTransactions < ActiveRecord::Migration[5.2]
  def change
    add_column :transactions, :shares, :integer, null: false
  end
end
