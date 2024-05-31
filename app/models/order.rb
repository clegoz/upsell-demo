class Order < ApplicationRecord
  validates :user, :order_items, presence: true

  belongs_to :user
  has_many :order_items
end
