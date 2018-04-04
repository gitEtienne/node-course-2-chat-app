
var socket = io();
$=jQuery;

socket.on('connect', function() {
    console.log('connected to the server')


});

socket.on('newMessage', function(message) {
    console.log(message);
    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    $('#messages').append(li);

})

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});


$(document).ready(function(){
    $('#message-form').on('submit', function(e){
        console.log('hello world');
        e.preventDefault();
        var message = $('[name=message]').val();
        if(message.length > 0){
            socket.emit('createMessage', {
                from:'User',
                text: message
            }, function(){
        
            });
            $('[name=message]').val('');
        }
    });
});
