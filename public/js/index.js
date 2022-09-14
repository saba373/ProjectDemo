

var socket = io();

socket.on('connect', function () {
    console.log('connected to server')

    // socket.emit('createMessage', {
    //     from: 'chohan@gmail.com',
    //     text: 'hello from chohan'
    // })
})

socket.on('disconnect', function () {
    console.log('disconnected from server');

})

socket.on('newMessage', function (message) {
    console.log('new message', message);
    var li = jQuery('<li> </li>')
    li.text(`${message.from}: ${message.mytext}`)

    jQuery('#messages').append(li);
})


// socket.emit('createMessage', {

//     from: 'andrew chohan',
//     mytext: 'hi from chicago'
// }, () => {
// })


socket.on('newLocationMessage', function (message) {
    var li = jQuery('<li></li>')
    var a = jQuery('<a target="_blank"> my current address </a>')

    li.text(`${message.from}`)
    a.attr('href', message.url)
    li.append(a);
    jQuery('#messages').append(li)

})


jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

var messageTextbox =  jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        mytext: messageTextbox.val()
    }, function () {
        messageTextbox.val('')
    })
})


var locationBtn = jQuery('#send-location');
locationBtn.on('click', function () {
    if (!navigator.geolocation) {
        return alert(' not supported yet')
    }

    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        })

        console.log(position)
    }, function () {
        alert('not reachable')
    })
})