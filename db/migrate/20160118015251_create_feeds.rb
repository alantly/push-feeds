class CreateFeeds < ActiveRecord::Migration
  def change
    create_table :feeds do |t|
      t.string :url
      t.string :secret

      t.timestamps
    end
    add_reference :feeds, :user, index: true
  end
end
