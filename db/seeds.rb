# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

def create_a_user(email, password)
	User.create({:email => email, :password => password})
end

def create_a_client(endpoint, device_set)
  Client.create({ endpoint: endpoint, device_set: device_set })
end

user = create_a_user('a@b.c', 'user1234')

client1 = create_a_client('endpoint/somefunkyhash', user.device_set)
client2 = create_a_client('endpoint/hashhashhash', user.device_set)

feed = Feed.create({ url: 'www.google.com' })
subscription = Subscription.create({ device_set: user.device_set, feed: feed})
