Rack::Superfeedr.host = ENV['hostname']
Rack::Superfeedr.login = ENV['superfeedr_login']
Rack::Superfeedr.password = ENV['superfeedr_auth_token']
Rack::Superfeedr.port = ENV['port'] ? ENV['port'].to_i : nil
