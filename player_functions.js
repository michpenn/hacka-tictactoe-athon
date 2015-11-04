var player1 = true;
var player2 = false;

<<<<<<< HEAD
var wins_3x3 = [ 7, 56, 448, 73, 146, 292, 273, 84];



=======
>>>>>>> 29a4a93deac8dd19d6a241d0dc3407a89b3fc351


function Board(){

    this.can_be_clicked = true;

    this.wins = function(){
<<<<<<< HEAD
        for(var i =0; i< wins_3x3.length; i++){
            if((wins_3x3[i] & this.total_player1[0]) === wins_3x3[i]){

                this.display_results("player 1 wins");
            }
            else if((wins_3x3[i] & this.total_player2[0]) === wins_3x3[i]){
                this.display_results("player 2 wins");
            }

        }

    };
    this.display_results = function(player){
        var h1 = $('<h1>').text(player);
        $('#display_results').append(h1);
    };

=======
        for(var i =0; i< wins.length; i++){
            if((wins[i] & score) === wins[i]){

                console.log("YOU WON");
            }
            else{

                console.log("lost");
            }
        }
    };
>>>>>>> 29a4a93deac8dd19d6a241d0dc3407a89b3fc351
    this.change_player =function(){
        if(player1 === true){
            player1 = false;
            player2 = true;
        }
        else{
            player1 = true;
            player2 = false;
        }

<<<<<<< HEAD
    };

    this.total_player1 = [0];
    this.total_player2 = [0];

    this.square_clicked = function(square){
        var total =0;
        if(player1){
            total+= parseFloat(square);
            var new_total1 = this.total_player1[0] + total;
            this.total_player1.pop();
            this.total_player1.push(new_total1);
        }
        else{
            total+= parseFloat(square);
            var new_total2 = this.total_player2[0] + total;
            this.total_player2.pop();
            this.total_player2.push(new_total2);
        }
        console.log(this.total_player1, this.total_player2);
        ttt_game.wins();

=======

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
>>>>>>> 29a4a93deac8dd19d6a241d0dc3407a89b3fc351
    };
}


var ttt_game = new Board();

<<<<<<< HEAD
=======
$('button').on('click', function(){
    var player = $('this');

});

>>>>>>> 29a4a93deac8dd19d6a241d0dc3407a89b3fc351
$('div').on('click', function(){

    var square = $(this).text();
    ttt_game.square_clicked(square);
    ttt_game.change_player();

<<<<<<< HEAD

=======
>>>>>>> 29a4a93deac8dd19d6a241d0dc3407a89b3fc351
});