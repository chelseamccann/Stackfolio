# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_02_21_043559) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "tickers", force: :cascade do |t|
    t.string "symbol", null: false
    t.integer "shares", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float "value", null: false
  end

  create_table "transactions", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "ticker_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "buy", null: false
    t.float "price", null: false
    t.integer "shares", null: false
    t.index ["ticker_id"], name: "index_transactions_on_ticker_id"
    t.index ["user_id"], name: "index_transactions_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name", null: false
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.float "buying_power", default: 5000.0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "last_name", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "transactions", "tickers"
  add_foreign_key "transactions", "users"
end
