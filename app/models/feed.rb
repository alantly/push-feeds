class Feed < ActiveRecord::Base
  has_and_belongs_to_many :users
  before_save :normalize_url

  private

  def normalize_url
    self.url = /^https?:\/\/(.*)?\//.match(url)[1]
  end
end
