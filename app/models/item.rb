class Item < ApplicationRecord
  validates :name, presence: true, length: { maximum: 50 }
  validates :price, presence: true

  belongs_to :user
  has_many :user_basket
  has_many :users, through: :user_basket
end
