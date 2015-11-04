var cell_row = 0;
var cell_full = 0;
var cell_array = [];
var b = 0;
var newDiv;

$(document).ready(function () {
    $("button").click(function () {

        // assign selected cell size to cell_row(3) and get full size cell numbers (3x3 = 9)
        cell_row = $(this).attr("id");
        cell_full = (cell_row * cell_row);

        // create an array matching the cell_full_size and assign its numbers
        for (b; b < cell_full; b++) {
            cell_array[b] = b;
        }

        // append cells to HTML, break to next line according to cell_row #
        for (b = 1; b < cell_array.length + 1; b++) {
            newDiv = $("<div>");
            $("#cell-area").append(newDiv);
            if (b % cell_row === 0 && b !== 0) {
                $("#cell-area").append("<br>");
            }
        }

    })
});

