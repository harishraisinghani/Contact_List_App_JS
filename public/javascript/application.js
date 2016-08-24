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

  $.ajax({
    method: 'GET',
    dataType: 'json',
    url: '/api/contacts',
    success: function(contacts) {
      $.each(contacts, function(i, contact) {
        $contacts.append('<li>'+ contact.firstname + ' ' + contact.lastname + ',' + contact.email + '</li>');
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
        $contacts.append('<li>'+ newContact.firstname + ' ' + newContact.lastname + ',' + newContact.email + '</li>');
      }
    });
  });

  $('#remove-contact').on('click',function() {
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
      url: 'api/contacts',
      success: function() {
        $li.fadeOut(1500, function() {
          $(this).remove();
        });
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
