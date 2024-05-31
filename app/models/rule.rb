class Rule < ApplicationRecord
  validates :name, :user, presence: true

  belongs_to :user
  has_many :rule_expressions
  has_one :rule_action
end
