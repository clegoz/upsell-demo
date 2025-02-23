class CreateItems < ActiveRecord::Migration[7.1]
  def change
    create_table :items do |t|
      t.string :name, null: false, limit: 50
      t.text :description
      t.decimal :price, null: false
      t.boolean :is_listed, null: false
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
