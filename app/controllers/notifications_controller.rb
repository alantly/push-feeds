class NotificationsController < ApplicationController
  skip_before_filter :authenticate_user!, :only => :recent

  def recent
    response = { title: "Push-Feeds Notification", message: "No New Updates!", \
      url: "https://"+ENV['hostname'] }
    client = Client.find_by_subscription_id(client_params)
    if client and not client.notifications.empty?
      @top_notification = client.notifications.first
      response = { title: "New Push-Feeds Notification!", message: @top_notification.title, \
        url: @top_notification.url }
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
        feed.clients.each do |client|
          Notification.create site_id: item["id"], \
            title: item["title"], url: item["permalinkUrl"], client: client
        end
        feed.push_feed_to_users
      end
    end
  end

  private

  def client_params
    params.permit(:sub_id).require(:sub_id)
  end

end
