class RuleExpression < ApplicationRecord
  validates :rule, presence: true

  acts_as_nested_set

  belongs_to :rule
  # belongs_to :left_expression, optional: true, class_name: :RuleExpression
  belongs_to :right_item, optional: true, class_name: :Item
end
