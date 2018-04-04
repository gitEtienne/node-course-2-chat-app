
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


// $(document).ready(function(){

    socket.on('newLocationMessage', function(message){
        var li = $('<li></li>');
        var a = $('<a target="_blank" >Ma position actuel</a>');

        li.text(`${mesage.from}: `);
        a.attr('href', message.url);
        li.append(a);
        $('#message').append(li);
    });

    $('#message-form').on('submit', function(e){
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
    
    var locationButton = $('#send-location');
    function test(position){
        socket.emit('createLocationMessage', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
    }
    function error(err){
        console.log(err);
        alert('Impossible de déterminé la géolocalisation! ')
    }
    options = {
        enableHighAccuracy: false,
        timeout: 3000,
        maximumAge: 60000000
      };
    locationButton.on('click', function(){
        if(!navigator.geolocation){
            return alert('Geolocalisation non supportée par votre fureteur');
        }
        //navigator.geolocation.watchPosition(test, error, options);

        navigator.geolocation.getCurrentPosition(test
            // function(position){
            // socket.emit('createLocationMessage', {
            //     latitude: position.coords.latitude,
            //     longitude: position.coords.longitude
            // });
        //}
        , error,options);
    });
// });
