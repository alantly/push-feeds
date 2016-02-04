class CreateFeeds < ActiveRecord::Migration
  def change
    create_table :feeds do |t|
      t.string :url, :unique => true
      t.string :secret, :unique => true

      t.timestamps
    end
  end
end
