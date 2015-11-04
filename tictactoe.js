/**
 * Created by michpenn on 11/4/15.
 */
var celllabel;
var cellvalues = [];
var cellRows = [];
var cellColumns = [];
var cellDiagonals = [];
var winningArrays = [];
var NumberOfRows;

function makeCellLabels(rows) {
    var boardsize = rows * rows;
    NumberOfRows = rows;

    for (var i = 0; i < boardsize; i++) {
        celllabel = Math.pow(2, i);
        cellvalues.push(celllabel);

    }
}

makeCellLabels(4);

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
}

generateWins(cellvalues);