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
      render json: @feed
    else
      create
    end
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

  private

  def feed_params
    params.require(:feed).permit(:url)
  end

end
