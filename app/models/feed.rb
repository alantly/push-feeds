class Feed < ActiveRecord::Base
  has_and_belongs_to_many :users
  validates :url_valid_uri, :url, presence: true
  before_save :normalize_url
  after_save :create_secret

  private

  def url_valid_uri
    begin
      URI.parse(url)
    rescue URI::BadURIError
      errors.add :url, "is a bad URI."
    rescue URI::InvalidURIError
      errors.add :url, "is an invalid URI."
    end
  end

  def normalize_url
    resource = /^(?:https?:\/\/)?(.+)\/$/.match(self.url)
    unless resource.nil?
      self.url = resource[1]
    else
      self.url = /^(?:https?:\/\/)?(.+)$/.match(self.url)[1]
    end
  end

  def create_secret
    if self.secret.nil?
      self.secret = Digest::SHA256.hexdigest self.created_at.to_s
      self.save!
    end
  end
end
