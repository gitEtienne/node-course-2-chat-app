
var socket = io();

socket.on('connect', function() {
    console.log('connected to the server')

    // socket.emit('createEmail', {
    //     to: 'jen@example.com',
    //     text: 'Hey, this is Steven.'
    // })
});

socket.on('newMessage', function(message) {
    console.log(message);
})

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});


function createMessage(vContent){
    socket.emit('createMessage', {
        from: vContent.from,
        text: vContent.text
    });
}