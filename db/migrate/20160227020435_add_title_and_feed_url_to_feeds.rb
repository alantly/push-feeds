class AddTitleAndFeedUrlToFeeds < ActiveRecord::Migration
  def change
    add_column :feeds, :latest_feed_title, :string, default: ""
    add_column :feeds, :latest_feed_url, :string, default: ""
  end
end
