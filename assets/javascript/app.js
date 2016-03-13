
//connected to Firebase
var gameData = new Firebase ("https://alcreatesrps.firebaseio.com/");
// Global variables
player1 = ""
player2 = ""
turn = ""
player1Pick = ""
player2Pick = ""
// Sets player names
var playersData = gameData.child("users");

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

	playerSet();

	

});

function playerSet(){

	playersData.push({

		player1: { 
			name : player1,
			pick : player1Pick,
			turn : turn
		},
		player2: {
			name: player2,
			pick : player2Pick,
			turn : turn
		}


	});
}


function newGame() {
	player1 = ""
	player2 = ""
	$("#player1").text("waiting for player 1 ... zzz");
	$("#player2").text("waiting for player 2 ... zzz");

}
function gamePlays(){
	$("#player1").append("<div class='choice' id='one'>rock</div>");
	$("#player1").append("<div class='choice' id='one'>paper</div>");
	$("#player1").append("<div  class= 'choice'id ='one'>sissor</div>");

}

function gamePlays2(){
	$("#player2").append("<div class='choice'id='two'>rock</div>");
	$("#player2").append("<div class='choice' id='two'>paper</div>");
	$("#player2").append("<div class='choice' id ='two'>sissor</div>");


}

function playerPick(){
	if (turn == player1 && $(this).attr('id')== 'one'){
	 player1Pick = $(this).text()
	 console.log(player1Pick)
	 turn = player2
	 playerSet();
	 
	}else if(turn == player2 && $(this).attr('id') == 'two'){
		player2Pick =$(this).text()
		turn = player1
		playerSet();
	}
	else{
		alert("its not your turn")
	}

}

function randomTurn(){
	if (player1.length > 0 && player2.length > 0){
	var players = [player1, player2];
	var playerturn = players[Math.floor((Math.random() * 1) + 1)];
	turn = playerturn;
	alert("you won the coin toss :" + turn);
	};

} 

gameData.on('child_added', function (snapshot){

	var data = snapshot.val();
	var updatedplayer1Pick = data.player1.pick;
	var updatedplayer2Pick = data.player2.pick;
	var updatedturn = data.player1.turn;


	player1Pick = updatedplayer1Pick;
	player2Pick = updatedplayer2Pick;


});






$(document).on('click', '.choice', playerPick);

$(document).ready(function(){
	newGame();

});




// tested Firebase


//$('#start').on("click",function(){

//	gameData.set({ test: "works"});

//})

