var cell_row = 0;
var cell_full = 0;
var cell_array = [];
var i = 0;
var newDiv;

$(document).ready(function(){
    $("button").click(function(){

        // assign selected cell size to cell_row(3) and get full size cell numbers (3x3 = 9)
        cell_row = $(this).attr("id");
        cell_full = (cell_row * cell_row);

        // create an array matching the cell_full_size and assign its numbers
        for (i; i < cell_full; i++) {
            cell_array[i] = i;
        }

        // append cells to HTML, break to next line according to cell_row #
        for (i = 1; i < cell_array.length + 1; i++) {
            newDiv = $("<div>");
            $("body").append(newDiv);
            if (i % cell_row === 0 && i !== 0) {
                $("body").append("<br>");
            }
        }

    })
});

