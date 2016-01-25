class CreateFeeds < ActiveRecord::Migration
  def change
    create_table :feeds do |t|
      t.string :url
      t.string :secret

      t.timestamps
    end
  end
end
