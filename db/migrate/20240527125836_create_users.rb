class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.string :username, null: false, limit: 50
      t.string :password_digest, null: false
      t.string :name, null: false, limit: 250
      t.text :bio

      t.timestamps
    end
  end
end
