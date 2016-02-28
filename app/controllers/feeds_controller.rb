class FeedsController < ApplicationController

  def index
    @feeds = current_user.feeds
  end

  def create
    @feed = Feed.new(feed_params)
    @feed.secret = Digest::SHA256.hexdigest "#{@feed.url}:#{Time.now.to_s}"
    begin
      @feed.save!
      @feed.subscribe_to_superfeedr
      current_user.feeds << @feed
      cookies[@feed.id] = @feed.updated_at.to_i
      render json: @feed
    rescue IOError => e
      puts "Unable to create #{feed_params} due to: #{e.message}."
      error_msg = @feed.errors.messages
      error_msg[:error] = e.message
      render json: error_msg, status: :unprocessable_entity
    end
  end

  def subscribe
    @feed = Feed.find_by_url(feed_params[:url])
    if @feed
      current_user.feeds << @feed
      cookies[@feed.id] = @feed.updated_at.to_i
      render json: @feed
    else
      create
    end
  end

  def updated
    resp = { title: "Push-Feeds Notification", message: "No New Updates!", url: "https://"+ENV['hostname']}
    if current_user
      current_user.feeds.each do |feed|
        if cookies[feed.id] != feed.updated_at.to_i.to_s
          if cookies[feed.id].nil?
            # TODO: Be creative on the title. Could use third party service word generator
            resp = { title: "New Push-Feeds Notification", message: "A Feed has been updated!", url: "https://"+ENV['hostname']}
          else
            # TODO: Exit sooner when datetime mismatch found. Focus on common case.
            resp = { title: "New PF Notification!", message: feed.latest_feed_title, url: feed.latest_feed_url }
          end
          cookies[feed.id] = feed.updated_at.to_i
        end
      end
    end
    render json: resp
  end

  # def update
  #   @feed = Feed.find(params[:id])
  #   if @feed.update(feed_params)
  #     render json: @feed
  #   else
  #     render json: @feed.errors, status: :unprocessable_entity
  #   end
  # end

  def destroy
    @feed = Feed.find_by_id(params[:id])
    current_user.feeds.delete @feed
    cookies.delete @feed.id
    begin
      if @feed.users.empty?
        @feed.unsubscribe_to_superfeedr
        @feed.destroy
      end
      head :no_content
    rescue IOError => e
      puts "Feed #{@feed.id}: #{e.message}."
      render json: {error: e.message}, status: :unprocessable_entity
    rescue NoMethodError => e
      puts "Could not find #{@feed.id}: #{e.message}."
      render json: {error: e.message}, status: :unprocessable_entity
    end
  end

  def self.superfeedr_callback feed_id, body
    puts feed_id, body
    feed = Feed.find_by_id(feed_id)
    feed_data = JSON.parse(body)
    feed_data["items"].each do |item|
      feed.latest_feed_title = "#{feed_data["title"]}: #{item["title"]}"
      feed.latest_feed_url = item["permalinkUrl"]
    end
    feed.save!
    feed.push_feed_to_users
  end

  private

  def feed_params
    params.require(:feed).permit(:url)
  end

end
