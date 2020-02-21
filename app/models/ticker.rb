class Ticker < ApplicationRecord

    validates :symbol, :shares, presence: true

    has_many :transactions
    has_many :users, -> { distinct }, :through => :transactions

end