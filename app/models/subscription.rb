class Subscription < ActiveRecord::Base
  belongs_to :device_set
  belongs_to :feed
end
