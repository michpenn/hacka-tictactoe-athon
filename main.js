var cell_row = 0;
var cell_full = 0;
var cell_array = [];
var b = 0;
var newDiv;
var divClickHandler;

$(document).ready(function () {

    $("button").click(btnClick);
    $(".container").click(divClick);

});

function btnClick() {
    // assign selected cell size to cell_row(3) and get full size cell numbers (3x3 = 9)
    cell_row = $(this).attr("id");
    cell_full = (cell_row * cell_row);

    // create an array matching the cell_full_size and assign its numbers
    for (b; b < cell_full; b++) {
        cell_array[b] = b;
    }

    // append cells & images to #cell-area DOM, break the set of cells to next line according to cell_row #
    for (b = 1; b < cell_array.length + 1; b++) {
        newDiv = $("<div class='container'>");
        $("#cell-area").append(newDiv);
        newDiv.append("<img src='images/coffeeO.png' class='player1'><img src='images/markersX.png' class='player2'>");
        if (b % cell_row === 0 && b !== 0) {
            $("#cell-area").append("<br>");
        }
    }
    $("#select-board").css("visibility","hidden");
}


function divClick() {
    $(this).find(".player1").css("visibility","visible");
}