$(document).ready(function() {

  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()

  //Put your ajax calls here to the Sinatra server
  // var addContact = function(contact) {
  //   //need to define this
  // }

  var $contacts = $('#contacts');
  var $firstname = $('#firstname');
  var $lastname = $('#lastname');
  var $email = $('#email');

  var contactTemplate = $('#contact-template').html();

  function addContact(contact) {
    $contacts.append(Mustache.render(contactTemplate, contact));
  }

  $.ajax({
    method: 'GET',
    dataType: 'json',
    url: '/api/contacts',
    success: function(contacts) {
      $.each(contacts, function(i, contact) {
        addContact(contact);
      });
    }
  });

  $('#add-contact').on('click',function() {
    var contact = {
      firstname: $firstname.val(),
      lastname: $lastname.val(),
      email: $email.val(),
    };
  
    $.ajax({
      method: 'POST',
      dataType: 'json',
      data: contact,
      url: 'api/contacts',
      success: function(newContact) {
        addContact(newContact);
      }
    });
  });

  $contacts.on('click','.remove',function() {
    var contact = {
      firstname: $firstname.val(),
      lastname: $lastname.val(),
      email: $email.val(),
    };

    var $li = $(this).closest('li');
  
    $.ajax({
      method: 'DELETE',
      dataType: 'json',
      data: contact,
      url: 'api/contacts/'+ $(this).attr('contact-id'),
      success: function() {
        $li.fadeOut(300, function() {
          $(this).remove();
        });
      }
    });
  });

  $contacts.on('click','.editContact',function() {

    var $li = $(this).closest('li');

    $li.find('input.firstname').val($li.find('span.firstname').html() );
    $li.find('input.lastname').val($li.find('span.lastname').html() );
    $li.find('input.email').val($li.find('span.email').html() );
    $li.addClass('edit');  
  });

  $contacts.on('click','.cancelEdit',function() {
    $(this).closest('li').removeClass('edit');
  });

 $contacts.on('click','.saveEdit',function() {
    var $li = $(this).closest('li');

    var contact = {
      firstname: $li.find('input.firstname').val(),
      lastname: $li.find('input.lastname').val(),
      email: $li.find('input.email').val()
    }

    $.ajax({
      method: 'PUT',
      dataType: 'json',
      data: contact,
      url: 'api/contacts/'+ $li.attr('data-id'),
      success: function(contact) {
        $li.find('span.firstname').html(contact.firstname);
        $li.find('span.lastname').html(contact.lastname);
        $li.find('span.email').html(contact.email);
      }
    });
  });





  // $.ajax({
  //   method: 'GET',
  //   dataType: 'json',
  //   url: '/api/contacts'

  // }).done(function(contacts){//success
  //   console.log("Success");
  //   contacts.forEach(function(contact){
  //     addContact(contact);
  //   });

  // }).fail(function(jqXHR,textStatus){
  //   console.log("Failed because:"+ jqXHR.textStatus);
  // }).always(function() {
  //   console.log("Always");
});
