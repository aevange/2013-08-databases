var obj = {};
obj.username = prompt("What is your name?");
var friendHash = {};

var setLink = function(){
    return "http://127.0.0.1:8080";
};

var Message = Backbone.Model.extend({});

var MessageView = Backbone.View.extend({
  render: function(){
    var name = $('<span/>').text(this.model.get("username")).addClass('name');
    var txt = $('<span/>').text(": " +this.model.get("text"));
    this.$el.append(name).append(txt);

    if(friendHash[this.model.get("username")]) {
      this.$el.addClass("friend");
    }
    return this.$el;
  }
});

var addPost = function(){
  $.ajax(setLink(), {
    contentType: 'application/json',
    type: 'POST',
    data: JSON.stringify(obj),
    success: function(result) {
      console.log('result: ',result);
    }
  });
};

$(document).ready(function(){
  $('#container').on('click', '.name', function(){
    friendHash[this.innerHTML] = true;
    console.log(friendHash);
  });

    //create chatroom
  $('#createChatRoom').on('click', function(e){
    e.preventDefault();
    obj.roomname = prompt("Enter a chat room name.");
    $('#enterChatRoom').append('<option>'+ obj.roomname +'</option>');
  });

  //enter a chatroom
  $('#enterChatRoom').change( function(){
      obj.roomname = $(this).find('option:selected').val();
  });

  $('#submit').on('click', function(){
    obj.text = $('#inputBox').val();

    addPost();
    $('#inputBox').val('');
  }); //end #submit

  setInterval(function(){
    $.ajax(setLink(), {
      contentType: 'application/json',
      success: function(response){
        response = JSON.parse(response);
        $('#container').html('');
        var input;
        var messages = $.map(response, function(messageData){
          return new Message(messageData);
        });

        var messageViews = $.map(messages, function(message){
          return new MessageView({model: message});
        });

        $.map(messageViews, function(messageView){
          $('#container').append(messageView.render());
        });
      },
      error: function(response) {
        console.log('Ajax request failed');
      }
    }); //end ajax
  }, 2000);
}); //end document.ready