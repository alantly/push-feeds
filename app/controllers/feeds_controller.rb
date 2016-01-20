class FeedsController < ApplicationController

  def index
    @feeds = current_user.feeds
  end

  def create
    @feed = Feed.new(feed_params)
    if @feed.save
      current_user.feeds << @feed
      render json: @feed
    else
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
    params.require(:feed).permit(:source)
  end

end
