class User < ApplicationRecord
  validates :username, presence: true, uniqueness: true
  validates :name, presence: true

  has_secure_password
  has_many :items
  has_many :user_baskets
  has_many :basket_items, through: :user_baskets, source: :item
  has_many :orders
  has_many :rules
end
