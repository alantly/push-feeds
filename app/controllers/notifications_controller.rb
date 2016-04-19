class NotificationsController < ApplicationController

  def self.create_notification feed_id, body
    feed = Feed.find_by_id(feed_id)
    superfeedr_update = JSON.parse(body)
    superfeedr_update["items"].each do |item|
      notification = {
        id: item['id'],
        title: "New Push-Feeds Notification!",
        message: item['title'],
        url: item['permalinkUrl']
      }
      feed.clients.each do |client|
        client.push notification
      end
    end
  end

end
