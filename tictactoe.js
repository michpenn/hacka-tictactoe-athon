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

var justclicked;
var cell_row = 0;
var cell_full = 0;
var cell_array = [];
var b = 0;
var newDiv;
var targetSquare;

$(document).ready(function () {
    $("button").click(function () {

        // assign selected cell size to cell_row(3) and get full size cell numbers (3x3 = 9)
        cell_row = $(this).attr("id");
        cell_full = (cell_row * cell_row);
        makeCellLabels(parseInt(cell_row));
        generateWins(cellvalues);

        // create an array matching the cell_full_size and assign its numbers
        for (b; b < cell_full; b++) {
            cell_array[b] = b;
        }

        // append cells to HTML, break to next line according to cell_row #
        for (b = 1; b < cell_array.length + 1; b++) {
            newDiv = $("<div>", {
                class: 'square',
                text: cellvalues[b - 1]

            });

            $("#cell-area").append(newDiv);
            if (b % cell_row === 0 && b !== 0) {
                $("#cell-area").append("<br>");
            }
        }
        $("#select-board").css("visibility", "hidden");
        targetSquare = document.getElementsByClassName('square');
        $(targetSquare).on('click', function () {
            var square = $(this).text();
            justclicked=this;
                ttt_game.square_clicked(square);  // *** 1

            if (justclicked["childElementCount"]==0) {
                if (player1) {
                    $(this).append("<img src='images/coffeeO.png'>");
                    $(this).addClass('selected');
                }
                if (player2) {
                    $(this).append("<img src='images/markersX.png'>");
                    $(this).addClass('selected');
                }
            }

            });
        })
    });

    function Board() {
        //loops through wins array, compares player scores with winning scores
        this.wins = function () {  // *** 3, if won > go to 4, if not won > go to 5
            for (var i = 0; i < wins.length; i++) {
                if ((wins[i] & this.total_player1[0]) === wins[i]) {

                    this.display_results(1);
                }
                else if ((wins[i] & this.total_player2[0]) === wins[i]) {
                    this.display_results(2);
                }

            }

        };
        //appends to game board with winner result
        this.display_results = function (player) {  // *** 4 (game won / finished)
            if (player === 1) {
                var h1 = $('<h1>').text("Player 1 Wins!");
                $('#display_results').append(h1);
                $('#display_results').css("opacity","1");
                $('#cell-area').replaceWith("<img src='images/dan_win.png'>")
            }
            else if (player === 2) {
                var h1 = $('<h1>').text("Player 2 Wins!");
                $('#display_results').append(h1);
                $('#display_results').css("opacity","1");
                $('#cell-area').replaceWith("<img src='images/eric_win.png'>")
            }

        };

//changes player
        this.change_player = function () {  // *** 5, exit function and wait for next click
            if (player1 === true && justclicked["childElementCount"]==0) {
                player1 = false;
                player2 = true;
            }
            else if (justclicked["childElementCount"]==0) {
                player1 = true;
                player2 = false;
            }
        };
//records score beginning at zero index
        this.total_player1 = [0];
        this.total_player2 = [0];


        this.square_clicked = function (square) {  // ** 2
            var total = 0;
            if (player1 && justclicked["childElementCount"]==0) {
                total += parseFloat(square);
                var new_total1 = this.total_player1[0] + total;
                this.total_player1.pop();
                this.total_player1.push(new_total1);
            }
            else if (justclicked["childElementCount"]==0) {
                total += parseFloat(square);
                var new_total2 = this.total_player2[0] + total;
                this.total_player2.pop();
                this.total_player2.push(new_total2);
            }
            console.log(this.total_player1, this.total_player2);
            ttt_game.wins();
            this.change_player();


        };
    }

    var ttt_game = new Board();

    function makeCellLabels(rows) {
        var boardsize = rows * rows;
        NumberOfRows = rows;

        for (var i = 0; i < boardsize; i++) {
            celllabel = Math.pow(2, i);
            console.log(celllabel);
            cellvalues.push(celllabel);

        }
    };

    //makeCellLabels(cell_row);

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
function thought_bubbles() {
    setTimeout(function () {
        $('.Dan_though1, .Eric_thought1').fadeOut('slow');
    }, 4000);

}
thought_bubbles();
