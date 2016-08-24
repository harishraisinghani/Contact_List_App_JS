# Homepage (Root path)

get '/' do
  erb :index
end

get '/api/contacts' do
  Contact.all.to_json
end

post '/api/contacts' do
  contact = Contact.new(params)
  if contact.save
    contact.to_json
  end
end

delete '/api/contacts' do
  contact = Contact.find_by(params)
  contact.destroy
  contact.to_json
end


