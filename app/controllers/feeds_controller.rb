class FeedsController < ApplicationController

  Rack::Superfeedr.host = "d1da9092.ngrok.io"

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
    rescue Exception => e
      error_msg = @feed.errors.messages
      error_msg[:error] = e.message
      render json: error_msg, status: :unprocessable_entity
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
    @feed = Feed.find(params[:id])
    @feed.destroy
    head :no_content
  end

  private

  def feed_params
    params.require(:feed).permit(:url)
  end

end
