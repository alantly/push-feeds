class NotificationsController < ApplicationController

  def recent
    resp = { title: "Push-Feeds Notification", message: "No New Updates!", url: "https://"+ENV['hostname']}
    if current_user
      top_notification = current_user.notifications.first
      response = { title: "New Push-Feeds Notification!", message: top_notification.title, url: top_notification.url }
      top_notification.destroy!
    end
    render json: response
  end

  def self.create_notification feed_id, body
    puts feed_id, body
    feed = Feed.find_by_id(feed_id)
    superfeedr_update = JSON.parse(body)
    superfeedr_update["items"].each do |item|
      feed.users.each do |user|
        # TODO: Need to check if created and dont do anything if added. Due to superfeedr timeout
        # TODO: Create one notification table and have it all linked instead
        notification = Notification.create site_id: item["id"], title: item["title"], url: item["permalinkUrl"], feed: feed
        user.notifications << notification
      end
    end
    feed.push_feed_to_users
  end

end
