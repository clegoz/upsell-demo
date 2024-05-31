class CreateRuleActionItemsToRemoveds < ActiveRecord::Migration[7.1]
  def change
    create_table :rule_action_items_to_removeds do |t|
      t.belongs_to :rule_action, null: false, foreign_key: true
      t.belongs_to :item, null: false, foreign_key: true

      t.timestamps
    end
  end
end
