/**
 * Created by michpenn on 11/4/15.
 */
var celllabel;
var cellvalues = [];
var cellRows = [];
var cellColumns = [];
var cellDiagonals = [];
var winningArrays = [];
var wins = [];
var NumberOfRows;
var player1 = true;
var player2 = false;

function makeCellLabels(rows) {
    var boardsize = rows * rows;
    NumberOfRows = rows;

    for (var i = 0; i < boardsize; i++) {
        celllabel = Math.pow(2, i);
        cellvalues.push(celllabel);

    }
}

makeCellLabels(3);

function generateWins(cellvalues) {
    var rowStartMarker = 0;
    var rowEndMarker = NumberOfRows - 1;
    var rowArray = [];
    var columnArray = [];
    var diagonalArray = [];
    var diagonalArray2 = [];
    for (var j = 0; j < cellvalues.length; j++) {
        //this makes the row arrays
        if (cellvalues[j] == cellvalues[rowStartMarker]) {
            for (var k = j; k <= rowEndMarker; k++) {
                rowArray.push(cellvalues[k]);
            }
            cellRows.push(rowArray);
            rowArray = [];
            //This makes the column arrays
            for (var m = j; m < NumberOfRows; m++) {
                for (var n = j; n < NumberOfRows; n++) {
                    if (k == NumberOfRows && m == 1) {
                        //this makes the diagonals
                        var diagonal = ((k + m) * n);
                        var diagonal2 = ((k - m) * (n + 1));
                        diagonalArray.push(cellvalues[diagonal]);
                        diagonalArray2.push(cellvalues[diagonal2]);
                    }
                    columnArray.push(cellvalues[m + (n * NumberOfRows)])
                }
                cellColumns.push(columnArray);
                columnArray = [];
            }

            rowStartMarker += NumberOfRows;
        }
        else if (cellvalues[j] == cellvalues[rowEndMarker]) {
            rowEndMarker += NumberOfRows;

        }
    }
    cellDiagonals.push(diagonalArray, diagonalArray2);
    console.log('winning rows: ', cellRows);
    console.log('winning columns: ', cellColumns);
    console.log('winning diagonal: ', cellDiagonals);
    winningArrays.push(cellRows, cellColumns, cellDiagonals);
    console.log('winning options: ', winningArrays);

    for (var i = 0; i < winningArrays.length; i++) {
        var getThisValue = winningArrays[i];
        var value;
        for (var k = 0; k < getThisValue.length; k++) {
            value = getThisValue[k].join(" + ");
            value = eval(value);
            wins.push(value);
        }
    }

    console.log('You win if you get one of these scores: ', wins);
}

generateWins(cellvalues);


function Board() {

//loops through wins array, compares player scores with winning scores
    this.wins = function () {
        for (var i = 0; i < wins.length; i++) {
            if ((wins[i] & this.total_player1[0]) === wins[i]) {

                this.display_results("player 1 wins");
            }
            else if ((wins[i] & this.total_player2[0]) === wins[i]) {
                this.display_results("player 2 wins");
            }

        }

    };
    //appends to game board with winner result
    this.display_results = function (player) {
        var h1 = $('<h1>').text(player);
        $('#display_results').append(h1);
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
        console.log(this.total_player1, this.total_player2);
        ttt_game.wins();


    };

//makes new game/board
    var ttt_game = new Board();


    $('button').on('click', function () {
        var player = $('this');

    });

    $('div').on('click', function () {

        var square = $(this).text();
        ttt_game.square_clicked(square);
        ttt_game.change_player();


    });