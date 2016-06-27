class DeviceSet < ActiveRecord::Base
  has_many :clients
  has_many :subscriptions
  has_many :feeds, through: :subscriptions
  belongs_to :user
end
