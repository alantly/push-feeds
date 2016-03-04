class NotificationsController < ApplicationController

  def recent
    response = { title: "Push-Feeds Notification", message: "No New Updates!", \
      url: "https://"+ENV['hostname'], new_updates: false, notify: cookies[:notify] }
    cookies[:notify] = false if cookies[:notify]
    if current_user and not current_user.notifications.empty?
      @top_notification = current_user.notifications.first
      response = { title: "New Push-Feeds Notification!", message: @top_notification.title, \
        url: @top_notification.url, new_updates: true }
      @top_notification.destroy
    end
    render json: response
  end

  def self.create_notification feed_id, body
    feed = Feed.find_by_id(feed_id)
    superfeedr_update = JSON.parse(body)
    superfeedr_update["items"].each do |item|
      notification = Notification.find_by_site_id item["id"]
      if notification.nil?
        feed.subscriptions.each do |subscription|
          Notification.create site_id: item["id"], \
            title: item["title"], url: item["permalinkUrl"], subscription: subscription
        end
        feed.push_feed_to_users
      end
    end
  end

end
