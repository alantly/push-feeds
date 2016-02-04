class CreateFeedsUsers < ActiveRecord::Migration
  def change
    create_table :feeds_users do |t|
      t.belongs_to :feed, index: true
      t.belongs_to :user, index: true
    end
  end
end
