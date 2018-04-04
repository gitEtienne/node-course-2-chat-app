
var socket = io();
$=jQuery;

socket.on('connect', function() {
    console.log('connected to the server')


});

socket.on('newMessage', function(message) {
    console.log(message);
    var formattedTime = moment(message.createAt).format('HH:mm');
    var li = $('<li></li>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`);
    $('#messages').append(li);

})

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});


 $(document).ready(function(){

    socket.on('newLocationMessage', function(message){
        var formattedTime = moment(message.createAt).format('HH:mm');

        var li = $('<li></li>');
        var a = $('<a target="_blank" >Ma position actuel</a>');

        li.text(`${mesage.from} ${formattedTime}: `);
        a.attr('href', message.url);
        li.append(a);
        $('#message').append(li);
    });

    $('#message-form').on('submit', function(e){
        e.preventDefault();
        var messageTextBox = $('[name=message]');
        if(messageTextBox.val().length > 0){
            socket.emit('createMessage', {
                from:'User',
                text: messageTextBox.val()
            }, function(){
                messageTextBox.val('');
            });
            
        }
    });
    
    var locationButton = $('#send-location');
    function test(position){
        socket.emit('createLocationMessage', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        
        locationButton.removeAttr('disabled').text('Envoyer coordonnée');   
    }
    function error(err){
        console.log(err);
        alert('Impossible de déterminé la géolocalisation! ');
        locationButton.removeAttr('disabled').text('Envoyer coordonnée');   
    }
    options = {
        enableHighAccuracy: 0,
        timeout: 1e4,
        maximumAge: 0
    };
    locationButton.on('click', function(){
        if(!navigator.geolocation){
            return alert('Geolocalisation non supportée par votre fureteur');
        }
        locationButton.attr('disabled', 'disabled').text('Géolocalisation en cours...');
        //navigator.geolocation.watchPosition(test, error, options);
        console.log(navigator.permissions);
        console.log(navigator.permissions.query({
            name: "geolocation"
        }).then(function (a){
            console.log(a);
            navigator.geolocation.getCurrentPosition(test
                // function(position){
                // socket.emit('createLocationMessage', {
                //     latitude: position.coords.latitude,
                //     longitude: position.coords.longitude
                // });
            //}
            , error,options);
            
        },function (a){
            console.log(a);
            locationButton.removeAttr('disabled').text('Envoyer coordonnée');
        }));
        
    });
 });
