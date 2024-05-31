class RuleAction < ApplicationRecord
  validates :rule, :method, :message, :rule_action_items_to_removeds, :item_to_added, presence: true

  belongs_to :rule
  belongs_to :item_to_added, class_name: :Item
  has_many :rule_action_items_to_removeds
end
