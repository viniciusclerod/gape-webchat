var express = require('express'), app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/', express.static('www'));

io.on('connection', function(socket){
    console.log('Um usuario se conectou');

    socket.on('disconnect', function(){
        console.log('Um usuario se desconectou');
    });

    socket.on('chat message', function(tweet){
        console.log(tweet);
        socket.emit('chat message', tweet);
        socket.broadcast.emit('chat message', tweet);
    });
});


http.listen(3000, function(){
    console.log('Servidor rodando em http://localhost:3000');
});