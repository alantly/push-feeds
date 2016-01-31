class FeedsController < ApplicationController

  Rack::Superfeedr.host = "8099c608.ngrok.io"

  def index
    @feeds = current_user.feeds
  end

  def create
    @feed = Feed.new(feed_params)
    @feed.secret = Digest::SHA256.hexdigest "#{@feed.url}:#{Time.now.to_s}"
    begin
      @feed.save!
      Rack::Superfeedr.subscribe(@feed.url, @feed.id, { format: "json", secret: @feed.secret }) do |body, success, response|
        unless success
          @feed.destroy!
          raise "Error with subscribing."
        end
      end
      current_user.feeds << @feed
      render json: @feed
    rescue
      render json: @feed.errors, status: :unprocessable_entity
    end
  end

  def update
    @feed = Feed.find(params[:id])
    if @feed.update(feed_params)
      render json: @feed
    else
      render json: @feed.errors, status: :unprocessable_entity
    end
  end
  
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
