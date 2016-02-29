class NotificationsController < ApplicationController

  def recent
    resp = { title: "Push-Feeds Notification", message: "No New Updates!", url: "https://"+ENV['hostname']}
    if current_user and not current_user.notifications.empty?
      @top_notification = current_user.notifications.first
      response = { title: "New Push-Feeds Notification!", message: @top_notification.title, url: @top_notification.url }
      current_user.notifications.delete @top_notification
      if @top_notification.users.empty?
        @top_notification.destroy
      end
    end
    render json: response
  end

  def self.create_notification feed_id, body
    puts feed_id, body
    feed = Feed.find_by_id(feed_id)
    superfeedr_update = JSON.parse(body)
    superfeedr_update["items"].each do |item|
      notification = Notification.find_by_site_id item["id"]
      if notification.nil?
        notification = Notification.create site_id: item["id"], title: item["title"], url: item["permalinkUrl"], feed: feed
      end
      feed.users.each do |user|
        user.notifications << notification
      end
    end
    feed.push_feed_to_users
  end

end
