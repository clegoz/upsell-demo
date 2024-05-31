class RuleActionItemsToRemoved < ApplicationRecord
  validates :rule_action, :item, presence: true
  belongs_to :rule_action
  belongs_to :item
end
