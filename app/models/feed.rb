class Feed < ActiveRecord::Base
  has_many :subscriptions
  validate :url_valid_uri
  validates :url, presence: true, uniqueness: true
  before_save :normalize_url

  def subscribe_to_superfeedr
    # TODO: Set website name on success
    Rack::Superfeedr.subscribe(self.url, self.id, { format: "json", secret: self.secret }) do |body, success, response|
      unless success
        self.destroy!
        raise IOError, "Error with subscribing to #{self.url}"
      end
    end
  end

  def unsubscribe_to_superfeedr
    Rack::Superfeedr.unsubscribe(self.url, self.id) do |body, success, response|
      unless success
        raise IOError, "Error with unsubscribing from #{self.url}"
      end
    end
  end

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
