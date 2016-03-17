
//connected to Firebase
var gameData = new Firebase ("https://alcreatesrps.firebaseio.com/");
// Global variables
var player1 = ""
var player2 = ""
var turn = ""
var player1Pick = ""
var player2Pick = ""
var result = ""

// Sets player names
var playersData = gameData.child("users");
var chatData = gameData.child("chat");

$('#start').on('click', function(){
	


	if (player1.length > 0 && player2.length > 0){

		alert("sorry... room is full");
		$("#player").val("");

	}else if(player1 == ""){
		
		player1 = $("#player").val().trim();
		
		$("#player").val("");
		gamePlays();
		
	
	}else if (player1 != ""){
		
		player2 = $("#player").val().trim();
		
		$("#player").val("");
		gamePlays2();
		
		
	}
		
	 
	


	randomTurn();

	playerSet()
	
	

});

function playerSet(){

	playersData.set({

		player1: { 
			name : player1,
			pick : player1Pick,
			turn : turn,
			result:result
			
		},
		player2: {
			name: player2,
			pick : player2Pick,
			turn : turn,
			result: result
			
		}


	});
}


function newGame() {
	player1 = ""
	player2 = ""
	turn = ""
    player1Pick = ""
    player2Pick = ""
    result = ""
	$("#player1").text("waiting for player 1 ... zzz");
	$("#player2").text("waiting for player 2 ... zzz");
	playerSet();

}
function gamePlays(){
	$("#player1").empty();
	$("#player1").append("<div class='welcome' id='player1Name'>"+ "WELCOME  " + player1 + "</div>")
	$("#player1").append("<div class='choice' id='one'>rock</div>");
	$("#player1").append("<div class='choice' id='one'>paper</div>");
	$("#player1").append("<div  class= 'choice'id ='one'>sissor</div>");

}

function gamePlays2(){
	$("#player2").empty();
	$("#player2").append("<div class='welcome' id='player2Name'>"+ "WELCOME  " + player2 + "</div>")
	$("#player2").append("<div class='choice'id='two'>rock</div>");
	$("#player2").append("<div class='choice' id='two'>paper</div>");
	$("#player2").append("<div class='choice' id ='two'>sissor</div>");


}

function playerPick(){
	if (turn == player1 && $(this).attr('id')== 'one'){
	 player1Pick = $(this).text()
	 console.log(player1Pick)
	 turn = player2
	 
	 
	}else if(turn == player2 && $(this).attr('id') == 'two'){
		player2Pick =$(this).text()
		turn = player1
		
		
	}
	else{
		alert("its not your turn")
	}
	
	playerSet();
	rpsEval();
	

}

function randomTurn(){
	if (player1.length > 0 && player2.length > 0){
	var players = [player1, player2];
	var playerturn = players[Math.floor((Math.random() * 1) + 1)];
	turn = playerturn;
	alert("you won the coin toss :" + turn);
	};

} 

function rpsEval(){


if (player1Pick.length > 0 && player2Pick.length > 0){
	
	if(player1Pick == "rock" && player2Pick == "rock"){
		console.log("tie")
		result = "tied"

	}
	else if (player1Pick == "rock" && player2Pick == "sissor"){
		result = player1 +"  wins"
		console.log("rock wins")
	}
	else if (player1Pick == "rock" && player2Pick == "paper"){
		result =  player2 +"  wins"
		console.log(result)
	}else if (player1Pick == "sissor" && player2Pick == "sissor"){
		result = "tied"
		console.log(result)
	}else if ( player1Pick == "sissor" && player2Pick == "paper"){
		result =  player2 + " wins"
		console.log(result)
	}else if ( player1Pick == "sissor" && player2Pick == "rock"){
		result = player2 + "wins"
		console.log(result)
	}else if (player1Pick == "paper" && player2Pick == "paper"){
		result = "tied"
		console.log(result)
	}else if (player1Pick == "paper" && player2Pick == "sissor"){
		result = player2 + "wins"
		console.log(result)
	}else if (player1Pick == "paper" && player2Pick == "rock"){
		result = player1 + "wins"
		console.log(result)
	}

	
	playerSet();
	
}



}

gameData.on('value', function (snapshot){

	var data = snapshot.val();
	 player1 = data.users.player1.name;
	 player2 = data.users.player2.name;
	 player1Pick = data.users.player1.pick;
	 player2Pick = data.users.player2.pick;
	 turn = data.users.player1.turn;
	 result = data.users.player1.result


	$("#result").text(result)
	
	if (result != ""){
		newGameInterval = setInterval(function(){newGame()}, 1000);

	}
	clearInterval(newGameInterval);

	
});

var messageField = $("#textInput");
var nameField = $("#userNameInput");
var messageList = $('#chat');

messageField.keypress(function(e){
	if(e.keyCode == 13) {

		var username = nameField.val();
		var message = messageField.val();

		chatData.push({name: username , text: message});

		messageField.val(' ');


	}


});

chatData.limitToLast(10).on('child_added', function(snapshot){

	var data = snapshot.val();
	var username = data.name || "anonymous";
	var message = data.text;

	var messageElement = $("<li>");
	var nameElement =$("<strong></strong>");
	nameElement.text(username);
	messageElement.text(message).prepend(nameElement);

	messageList.append(messageElement)

	messageList[0].scrollTop = messageList[0].scrollHeight;





});






$(document).on('click', '.choice', playerPick );

$(document).ready(function(){
	
	newGame();
	

});


