class CreateRuleExpressions < ActiveRecord::Migration[7.1]
  def change
    create_table :rule_expressions do |t|
      t.belongs_to :rule, null: false, foreign_key: true
      t.integer :node_type, null: false
      t.integer :op
      t.string :left_parameter, limit: 50
      t.references :right_item, null: true, foreign_key: { to_table: :items }
      t.string :right_event_name, limit: 50

      t.integer :parent_id, null: true, index: true
      t.integer :lft, null: false, index: true
      t.integer :rgt, null: false, index: true

      t.integer :depth, null: false, default: 0
      t.integer :children_count, null: false, default: 0
      t.timestamps
    end
  end
end
