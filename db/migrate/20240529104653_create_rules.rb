class CreateRules < ActiveRecord::Migration[7.1]
  def change
    create_table :rules do |t|
      t.string :name, null: false, limit: 50
      t.text :description
      t.boolean :is_active, null: false
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
