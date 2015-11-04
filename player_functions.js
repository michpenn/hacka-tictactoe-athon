var player1 = true;
var player2 = false;



function Board(){

    this.can_be_clicked = true;

    this.wins = function(){
        for(var i =0; i< wins.length; i++){
            if((wins[i] & score) === wins[i]){

                console.log("YOU WON");
            }
            else{

                console.log("lost");
            }
        }
    };
    this.change_player =function(){
        if(player1 === true){
            player1 = false;
            player2 = true;
        }
        else{
            player1 = true;
            player2 = false;
        }


    };
    this.total_player1 = [];
    this.total_player2 = [];

    this.square_clicked = function(square){
        if(player1){
            this.total_player1.push(square);
        }
        else{
            this.total_player2.push(square);
        }

        console.log("this is the total for player one ", this.total_player1, "this is the total for player two ", this.total_player2);
    };
}


var ttt_game = new Board();

$('button').on('click', function(){
    var player = $('this');

});

$('div').on('click', function(){

    var square = $(this).text();
    ttt_game.square_clicked(square);
    ttt_game.change_player();

});