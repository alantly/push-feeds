class Notification < ActiveRecord::Base
  has_and_belongs_to_many :users
  belongs_to :feed
end
