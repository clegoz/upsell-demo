class CreateRuleActions < ActiveRecord::Migration[7.1]
  def change
    create_table :rule_actions do |t|
      t.belongs_to :rule, null: false, foreign_key: true
      t.string :method, null: false, limit: 50
      t.text :message, null: false
      t.references :item_to_added, null: false, foreign_key: { to_table: :items }

      t.timestamps
    end
  end
end
