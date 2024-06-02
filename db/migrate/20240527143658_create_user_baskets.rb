class CreateUserBaskets < ActiveRecord::Migration[7.1]
  def change
    create_table :user_baskets do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :item, null: false, foreign_key: true

      t.timestamps
    end
  end
end
