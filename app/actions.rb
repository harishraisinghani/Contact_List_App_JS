# Homepage (Root path)

get '/' do
  erb :index
end

get '/api/contacts' do
  Contact.all.to_json
end

get '/api/contacts/:id' do
  Contact.find(params[:id])
end

post '/api/contacts' do
  contact = Contact.new(params)
  if contact.save
    contact.to_json
  end
end

put '/api/contacts/:id' do
  contact = Contact.find(params[:id])
  contact.firstname = params[:firstname]
  contact.lastname = params[:lastname]
  contact.email = params[:email]
  contact.saveN
  contact.to_json
end

delete '/api/contacts/:id' do
  contact = Contact.find(params[:id])
  contact.destroy
  contact.to_json
end


