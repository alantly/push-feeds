class FeedsController < ApplicationController

  def index
    @feeds = get_current_user.feeds
    render json: @feeds
  end

  def create
    @feed = Feed.new(feed_params)
    @feed.secret = Digest::SHA256.hexdigest "#{@feed.url}:#{Time.now.to_s}"
    begin
      ActiveRecord::Base.transaction do
        @feed.save!
        @feed.subscribe_to_superfeedr
        get_current_user.feeds << @feed
      end
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
      get_current_user.feeds << @feed unless get_current_user.feeds.include? @feed
      render json: @feed
    else
      create
    end
  end

  def destroy
    @feed = Feed.find_by_id(params[:id])
    get_current_user.feeds.delete @feed
    begin
      if @feed.subscriptions.empty?
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

  private

  def get_current_user
    unless current_user
      current_user = Client.find_by_id client_params
    end
  end

  def client_params
    params.require(:id)
  end

  def feed_params
    params.require(:feed).permit(:url)
  end

end
