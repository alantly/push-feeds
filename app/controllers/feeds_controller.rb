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
      # TODO: Make Cookies secure
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
      redirect_to create
    end
  end

  def updated
    # TODO: pass in clientID, and use it to find user. No need to be logged in.
    resp = { message: "No Updates!"}
    current_user.feeds.each do |feed|
      if cookies[feed.id] != feed.updated_at.to_i.to_s
        if cookies[feed.id].nil?
          resp = { message: "A Feed has been updated." }
        else
          # TODO: Exit sooner when datetime mismatch found. Focus on common case.
          resp = { message: "#{feed.url} Updated!", url: "#{feed.url}" }
        end
        cookies[feed.id] = feed.updated_at.to_i
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
    feed = Feed.find_by_id(feed_id)
    feed.touch :updated_at
    feed.push_feed_to_users
  end

  private

  def feed_params
    params.require(:feed).permit(:url)
  end

end
