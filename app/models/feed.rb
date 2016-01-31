class Feed < ActiveRecord::Base
  has_and_belongs_to_many :users
  validates :url_valid_uri, :url, presence: true
  before_save :normalize_url

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
    self.url = add_backslash_to self.url
    self.url = add_default_protocol_to self.url
  end

  def add_backslash_to url
    url[-1] != '/' ? url + "/" : url
  end

  def add_default_protocol_to url
    /https?:\/\// =~ url ? url : "http://" + url
  end
end
