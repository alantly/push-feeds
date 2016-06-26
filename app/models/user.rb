class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_one :group
  has_many :clients, through: :device_set
  has_many :subscriptions, through: :device_set
  has_many :feeds, through: :subscriptions
end
