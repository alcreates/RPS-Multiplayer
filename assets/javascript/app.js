
//connected to Firebase
var gameData = new Firebase ("https://alcreatesrps.firebaseio.com/");
// Global variables
player1 = ""
player2 = ""
turn = ""
player1Pick = ""
player2Pick = ""
// Sets player names
$('#start').on('click', function(){
	


	if (player1.length > 0 && player2.length > 0){

		alert("sorry... room is full");
		$("#player").val("");

	}else if(player1 == ""){
		
		player1 = $("#player").val().trim();
		gameData.set({player1 : player1});
		$("#player").val("");
		gamePlays();
		
	
	}else if (player1 != ""){
		
		player2 = $("#player").val().trim();
		gameData.set({player2 : player2});
		$("#player").val("");
		gamePlays2();
		
		
	}
		
	gameData.set({


		player1: player1,
		player2: player2


	})

});

function newGame() {
	player1 = ""
	player2 = ""
	$("#player1").text("waiting for player 1 ... zzz");
	$("#player2").text("waiting for player 2 ... zzz");

}
function gamePlays(){
	$("#player1").append("<div id='rock'>rock</div>");
	$("#player1").append("<div id='paper'>paper</div>");
	$("#player1").append("<div id ='sissor'>sissor</div>");

}

function gamePlays2(){
	$("#player2").append("<div id='rock'>rock</div>");
	$("#player2").append("<div id='paper'>paper</div>");
	$("#player2").append("<div id ='sissor'>sissor</div>");


}



$(document).ready(function(){
	newGame();

});




// tested Firebase


//$('#start').on("click",function(){

//	gameData.set({ test: "works"});

//})

