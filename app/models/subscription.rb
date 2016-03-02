class Subscription < ActiveRecord::Base
  belongs_to :users
  belongs_to :feed
  has_many :notifications
end
