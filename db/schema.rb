# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160626185535) do

  create_table "clients", force: :cascade do |t|
    t.string   "endpoint"
    t.string   "auth"
    t.string   "p256dh"
    t.integer  "device_set_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "clients", ["device_set_id"], name: "index_clients_on_device_set_id"

  create_table "device_sets", force: :cascade do |t|
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "device_sets", ["user_id"], name: "index_device_sets_on_user_id"

  create_table "feeds", force: :cascade do |t|
    t.string   "name",       default: ""
    t.string   "url"
    t.string   "secret"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "feeds", ["url"], name: "index_feeds_on_url"

  create_table "subscriptions", force: :cascade do |t|
    t.string   "filter"
    t.integer  "feed_id"
    t.integer  "device_set_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "subscriptions", ["device_set_id"], name: "index_subscriptions_on_device_set_id"
  add_index "subscriptions", ["feed_id"], name: "index_subscriptions_on_feed_id"

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true

end
