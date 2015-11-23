/**
 * Created by tic-tac-toe hackathon group - michal, adia, aldo, lance
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
var justClicked;
var cell_array = [];

var ttt_Players = new Players();
var ttt_game = new Board();


$(document).ready(function () {
    $("button").click(function () {
        $("#select-level").css("visibility", "hidden");

        // get cell_row number (3 or 4, depending on level selected)
        var cell_row = $(this).attr("id");

        ttt_game.makeCellLabels(parseInt(cell_row));
        ttt_game.make_cells(cell_row);
        generateWins(cellvalues);

        var targetSquare = document.getElementsByClassName('square');
        ttt_game.place_markers(targetSquare);    // *** 1

    });
});


function Players() {
    //records players' scores
    this.total_player1 = 0;
    this.total_player2 = 0;

    //get the clicked square's value and assign it to the player's score
    this.assign_score= function (square) {  // *** 3
        var total = 0;
        if (player1 && justClicked["childElementCount"] == 0) {
            total += parseFloat(square);
            this.total_player1 += total;
        }
        else if (justClicked["childElementCount"] == 0) {
            total += parseFloat(square);
            this.total_player2 += total;
        }
        console.log(this.total_player1, this.total_player2);
        ttt_game.wins(this.total_player1, this.total_player2);
        this.change_player();
    };

    //changes player
    this.change_player = function () {  // *** 6
        if (player1 === true && justClicked["childElementCount"]==0) {
            player1 = false;
            player2 = true;
        }
        else if (justClicked["childElementCount"]==0) {
            player1 = true;
            player2 = false;
        }
    };

}


function Board() {
    // create unique cell values: 2^n used to determine winning condition
    this.makeCellLabels = function(rows) {
        var board_size = rows * rows;
        NumberOfRows = rows;
        for (var i = 0; i < board_size; i++) {
            celllabel = Math.pow(2, i);
            console.log(celllabel);
            cellvalues.push(celllabel);
        }
    };

    // create game cells dynamically per level chosen
    this.make_cells = function(cell_row) {
        var b = 0;
        var cell_full = (cell_row * cell_row);
        // create an array matching the cell_full_size and assign its numbers
        for (b; b < cell_full; b++) {
            cell_array[b] = b;
        }
        // append cells to DOM, break and shift to next line according to cell_row #
        for (b = 1; b < cell_array.length + 1; b++) {
            var newDiv = $("<div>", {
                class: 'square',
                text: cellvalues[b - 1]
            });
            $("#cell-area").append(newDiv);
            if (b % cell_row === 0 && b !== 0) {
                $("#cell-area").append("<br>");
            }
        }
    };

    // place current player's marker image on the clicked square
    this.place_markers = function(targetSquare) {   // *** 2
        $(targetSquare).on('click', function () {
            var square = $(this).text();
            justClicked=this;

            ttt_Players.assign_score(square);

            if (justClicked["childElementCount"]==0) {
                if (player1) {
                    $(this).append("<img src='images/coffeeO.png'>");
                }
                if (player2) {
                    $(this).append("<img src='images/markersX.png'>");
                }
            }
        });
    };

    //loops through wins array, compute bitwise AND operation (&), compares player scores with winning scores
    this.wins = function (p1_score, p2_score) {   // *** 4 (skip to 6 if nobody won)
        for (var i = 0; i < wins.length; i++) {
            if ((wins[i] & p1_score) === wins[i]) {
                this.display_results(1);
            }
            else if ((wins[i] & p2_score) === wins[i]) {
                this.display_results(2);
            }
        }
    };

    //appends to game board DOM with winner result
    this.display_results = function (player) {  // *** 5 (game won)
        if (player === 1) {
            var p1_h2 = $("<h2>").text("Player 1 Wins!");
            var p1_img = $("<img src='images/dan_win.png'>");
            $('#game-board').empty();
            $('#game-board').append(p1_h2, p1_img);
        }
        else if (player === 2) {
            var p2_h2 = $("<h2>").text("Player 2 Wins!");
            var p2_img = $("<img src='images/eric_win.png'>");
            $('#game-board').empty();
            $('#game-board').append(p2_h2, p2_img);
        }
    };

}


// generate winning condition
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


// thought bubble animation for each player
function thought_bubbles() {
    setTimeout(function () {
        $('.Dan_though1, .Eric_thought1').fadeOut('slow');
    }, 4000);
}

thought_bubbles();
