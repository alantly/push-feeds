class CreateFeeds < ActiveRecord::Migration
  def change
    create_table :feeds do |t|
      t.string :feed

      t.timestamps
    end
    add_reference :feeds, :user, index: true
  end
end
