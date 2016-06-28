class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_one :device_set, dependent: :destroy
  has_many :clients, through: :device_set
  has_many :feeds, through: :device_set

  def add_device client
    self.device_set.clients << client
  end

end
