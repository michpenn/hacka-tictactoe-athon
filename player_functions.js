var player1 = true;
var player2 = false;

var wins_3x3 = [ 7, 56, 448, 73, 146, 292, 273, 84];





function Board(){

    this.can_be_clicked = true;

    this.wins = function(){
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

    };
}


var ttt_game = new Board();

$('div').on('click', function(){

    var square = $(this).text();
    ttt_game.square_clicked(square);
    ttt_game.change_player();


});