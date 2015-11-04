/**
 * Created by michpenn on 11/4/15.
 */
var celllabel;
var cellvalues = [];
var cellRows = [];
var cellColumns =[];
var winningArrays = [];
var NumberOfRows;

function makeCellLabels(rows) {
    var boardsize = rows * rows;
    NumberOfRows = rows;

    for (var i = 0; i < boardsize; i++) {
        celllabel = Math.pow(2, i);
        console.log(celllabel);
        cellvalues.push(celllabel);

    }
    console.log('these are the values of the cells: ', cellvalues);
}

makeCellLabels(4);

function generateWins(cellvalues) {
    var rowStartMarker = 0;
    var rowEndMarker = NumberOfRows - 1;
    var rowArray = [];
    var columnArray =[];
    for (var j = 0; j < cellvalues.length; j++) {
        //this makes the row arrays
        if (cellvalues[j] == cellvalues[rowStartMarker]) {
            console.log('this will be the start of a row, at index: ', j);
            for (var k = j; k <= rowEndMarker; k++) {
                rowArray.push(cellvalues[k]);
            }
            cellRows.push(rowArray);
            rowArray = [];
            //This makes the column arrays
            for (var m=j; m<NumberOfRows; m++) {
                columnArray.push(cellvalues[m], cellvalues[m+NumberOfRows], cellvalues[m+NumberOfRows+NumberOfRows]);
                cellColumns.push(columnArray);
                columnArray=[];
            }

            rowStartMarker += NumberOfRows;
        }
        else if (cellvalues[j] == cellvalues[rowEndMarker]) {
            console.log('this will be the end of a row, at index: ', j);
            rowEndMarker += NumberOfRows;

        }
        else {
            console.log(j);
        }
    }
    console.log('winning rows: ', cellRows);
    console.log('winning columns: ', cellColumns);
    winningArrays.push(cellRows, cellColumns);
}

generateWins(cellvalues);