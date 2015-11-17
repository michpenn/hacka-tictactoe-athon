var wins = [ 7, 56, 448, 73, 146, 292, 273, 84];
var player1 =true;
var player2=false;
//makes new game/board
var ttt_game = new Board();


function Board() {
    this.available_squares = 9;

//loops through wins array, compares player scores with winning scores
    this.wins = function () {
        for (var i = 0; i < wins.length; i++) {
            if ((wins[i] & this.total_player1[0]) === wins[i]) {
                console.log("player 1 wins");
                this.display_results("player 1 wins");

            }
            else if ((wins[i] & this.total_player2[0]) === wins[i]) {
                this.display_results("player 2 wins");
            }
            else if(this.available_squares =0){
                this.display_results('Its a Tie');
            }
        }
    };
    //appends to game board with winner result
    this.display_results = function (player) {
        var h3 = $('<h3>').text(player);
        $('.display_results').append(h3);

    };

//changes player
    this.change_player = function () {
        if (player1 === true) {
            player1 = false;
            player2 = true;
        }
        else {
            player1 = true;
            player2 = false;
        }
    };
//records score beginning at zero index
    this.total_player1 = [0];
    this.total_player2 = [0];

    this.square_clicked = function (square) {
        var total = 0;
        if (player1) {
            total += parseFloat(square);
            var new_total1 = this.total_player1[0] + total;
            this.total_player1.pop();
            this.total_player1.push(new_total1);
        }
        else {
            total += parseFloat(square);
            var new_total2 = this.total_player2[0] + total;
            this.total_player2.pop();
            this.total_player2.push(new_total2);
        }
        this.wins();
    }

};

$(document).ready(function(){
    ttt_game.available_square = 9;
    console.log(ttt_game.available_squares);
    $('.orange').on('click', function () {
        var square = $(this);
        var square_value = $(this).attr('value');
        ttt_game.square_clicked(square_value);
        if(player1 && square.is(':empty')){
            var img = $('<img>').attr('src','images/coffeeO.png').css('width','50%').addClass('center-block');
            $(this).append(img);
            ttt_game.available_squares--;
            console.log(ttt_game.available_squares)
        }
        else if(player2 && square.is(':empty')){
            var img = $('<img>').attr('src','images/markersX.png').css('width','50%').addClass('center-block');
            $(this).append(img);
            ttt_game.available_squares--;
            console.log(ttt_game.available_squares)
        }
        else{
            alert('pick an empty square');
            console.log(ttt_game.available_squares)
        }
        ttt_game.change_player();
    })
});
