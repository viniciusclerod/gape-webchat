var socket = io();

var $ = function(selector) { return document.querySelector(selector); };

window.onload = function(){

    var me = 'Alguém';
    var messages = $('#tweets');
    var config = $('form.config');

    $('form.tweet').onsubmit = function(){
        var message = this.message;
        if (message.value.length != 0){
            socket.emit('chat message', {
                name: me,
                message: message.value
            });
            message.value = null;
        }
        return false;
    };

    $('input.config').onclick = function (){
        if (config.style.display != 'none' && config.style.display.length != 0) {
            config.style.display = 'none';
            this.style.background = 'transparent';
            this.value = '▲';
        } else {
            config.style.display = 'block';
            this.style.backgroundColor = 'dimgray';
            this.value = '▼';
        }
    };
    $('input[name=name]').onblur = function (){
        if (config.name.value.length != 0) {
            me = config.name.value;
        } else {
            me = 'Alguém';
        }
    };

    socket.on('chat message', function(tweet){
        console.log(tweet);
        var li = document.createElement('li');
        li.innerHTML = '<strong>' + tweet.name + '</strong> : <span></span>';
        li.querySelector('span').innerText = tweet.message;
        //li.innerText = message;
        messages.appendChild(li);
        messages.scrollTop = messages.scrollHeight;
    });
};