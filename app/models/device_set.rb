class DeviceSet < ActiveRecord::Base
  has_many :clients, dependent: :destroy
  has_many :subscriptions, dependent: :destroy
  has_many :feeds, through: :subscriptions
  belongs_to :user
end
