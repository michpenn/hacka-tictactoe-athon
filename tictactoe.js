var wins = [7, 56, 448, 73, 146, 292, 273, 84];
var player1 = true;
var player2 = false;

//make new board
var ttt_game = null;

//Board constructor (this is the board game area with #game-board)
function Board(game_board_element){
    var self = this;
    //game_board_element = #game-board
    self.game_board_element = game_board_element;
    self.available_squares = 9;
    //araay for square objects
    self.game_squares = [];
    //uses parametar to find the class game-square to make objects out of each square
    self.init = function(){
        console.log('initializing board creation',game_board_element);
        self.game_board_element.find('.orange').each(function(){
            console.log('making square based on ',this);
            var square = self.make_square($(this));
            self.game_squares.push(square);
        })
    };
    //makes a square object this gets pushed into the array
    self.make_square = function(target_element){
        console.log('in make_square()',target_element);
        var this_square = new square_template(target_element);
        return this_square;
    };
    self.init();
}

//this is the object for the tic tac toe game
var square_template =function(this_element){
    console.log("creating a square based on ",this_element);
    var self = this;
    self.target_element = this_element;
    self.value = null;
    self.init = function(){
        console.log('stuff! ',self.target_element.attr('value'));
        self.value = self.target_element.attr('value');
        self.target_element.click(function(){
            //why isnt this a boolean.. what is self.clicked doing?
            self.clicked();
        })
        return self;
    };
    self.clicked = function(){
        console.log("my value is ", self.value);
    }
    self.init();

}

$(document).ready( function(){

    console.log('hi', ttt_game);

    ttt_game = new Board($("#game-board"));
})