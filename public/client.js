'use strict';

//connect
var socket = io.connect();

//USER VARIABLES
var username = "DefaultUser";

//start user login modal
$('#nameModal').modal();

//FORM SUBMITS
$('#nameForm').submit(function(){
	var send = {};
	username = $('#nameInput').val();
	send.room = $('#roomInput').val();
	send.name = $('#nameInput').val();
	$('#roomHeader').text(send.room);
	socket.emit('join room', send);
	socket.emit('user joined', send);
	$('#nameModal').modal('hide');
	return false;
});

$('#startRoomForm').submit(function(){
	socket.emit('room start', $('#roomHeader').text());
	return false;
});

//SOCKET FUNCTIONS
socket.on('user joined', function(data){
    $('#namesList').append($('<li>').text(data));
});

socket.on('user left', function(data){
    $("li").filter(":contains('" + data + "')").first().remove();
});

socket.on('room roster', function(data){
	for(var i = 0; i < data.length; i ++){
    	$('#namesList').append($('<li>').text(data[i].name));
	}
});

socket.on('room start', function(data){
	$('#waitingRoom').css('display','none');
	socket.emit('show score', $('#roomHeader').text());
});

socket.on('show score', function(data){
	$('#scoreboard').css('display','block');
	for(var i = 0; i < data.length; i ++){
    	$('#scoreList').append($('<li>').text(data[i].name + " : " + data[i].points));
	}
});