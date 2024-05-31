class OrderItem < ApplicationRecord
  validates :order, :item, presence: true

  belongs_to :order
  belongs_to :item
end
