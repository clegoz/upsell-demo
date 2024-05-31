# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_05_29_200407) do
  create_table "items", force: :cascade do |t|
    t.string "name", limit: 50, null: false
    t.text "description"
    t.decimal "price", null: false
    t.boolean "is_listed", null: false
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_items_on_user_id"
  end

  create_table "order_items", force: :cascade do |t|
    t.decimal "price", null: false
    t.integer "order_id", null: false
    t.integer "item_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["item_id"], name: "index_order_items_on_item_id"
    t.index ["order_id"], name: "index_order_items_on_order_id"
  end

  create_table "orders", force: :cascade do |t|
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_orders_on_user_id"
  end

  create_table "rule_action_items_to_removeds", force: :cascade do |t|
    t.integer "rule_action_id", null: false
    t.integer "item_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["item_id"], name: "index_rule_action_items_to_removeds_on_item_id"
    t.index ["rule_action_id"], name: "index_rule_action_items_to_removeds_on_rule_action_id"
  end

  create_table "rule_actions", force: :cascade do |t|
    t.integer "rule_id", null: false
    t.string "method", limit: 50, null: false
    t.text "message", null: false
    t.integer "item_to_added_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["item_to_added_id"], name: "index_rule_actions_on_item_to_added_id"
    t.index ["rule_id"], name: "index_rule_actions_on_rule_id"
  end

  create_table "rule_expressions", force: :cascade do |t|
    t.integer "rule_id", null: false
    t.integer "node_type", null: false
    t.integer "op"
    t.string "left_parameter", limit: 50
    t.integer "right_item_id"
    t.string "right_event_name", limit: 50
    t.integer "parent_id"
    t.integer "lft", null: false
    t.integer "rgt", null: false
    t.integer "depth", default: 0, null: false
    t.integer "children_count", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["lft"], name: "index_rule_expressions_on_lft"
    t.index ["parent_id"], name: "index_rule_expressions_on_parent_id"
    t.index ["rgt"], name: "index_rule_expressions_on_rgt"
    t.index ["right_item_id"], name: "index_rule_expressions_on_right_item_id"
    t.index ["rule_id"], name: "index_rule_expressions_on_rule_id"
  end

  create_table "rules", force: :cascade do |t|
    t.string "name", limit: 50, null: false
    t.text "description"
    t.boolean "is_active", null: false
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_rules_on_user_id"
  end

  create_table "user_baskets", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "item_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["item_id"], name: "index_user_baskets_on_item_id"
    t.index ["user_id"], name: "index_user_baskets_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username", limit: 50, null: false
    t.string "password_digest", null: false
    t.string "name", limit: 250, null: false
    t.text "bio"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "items", "users"
  add_foreign_key "order_items", "items"
  add_foreign_key "order_items", "orders"
  add_foreign_key "orders", "users"
  add_foreign_key "rule_action_items_to_removeds", "items"
  add_foreign_key "rule_action_items_to_removeds", "rule_actions"
  add_foreign_key "rule_actions", "items", column: "item_to_added_id"
  add_foreign_key "rule_actions", "rules"
  add_foreign_key "rule_expressions", "items", column: "right_item_id"
  add_foreign_key "rule_expressions", "rules"
  add_foreign_key "rules", "users"
  add_foreign_key "user_baskets", "items"
  add_foreign_key "user_baskets", "users"
end
