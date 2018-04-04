
var socket = io();
$=jQuery;

socket.on('connect', function() {
    console.log('connected to the server')


});

socket.on('newMessage', function(message) {
    var formattedTime = moment(message.createAt).format('HH:mm');
    var template = $('#message-template').html();
    var html = Mustache.render(template,{
        text: message.text,
        from: message.from,
        createAt: formattedTime
    });

    $('#messages').append(html);

})

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});


 $(document).ready(function(){

    socket.on('newLocationMessage', function(message){
        var formattedTime = moment(message.createAt).format('HH:mm');
        var template = $('#location-message-template').html();
        var html = Mustache.render(template,{
            url: message.url,
            from: message.from,
            createAt: formattedTime
        });
        $('#messages').append(html);
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
