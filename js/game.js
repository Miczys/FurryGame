var Furry = require("./furry.js");
var Coin = require("./coin.js");


//-------------------- game constructor 

var Game = function() {
    this.board = document.querySelectorAll("#board div");
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;
    self = this;
    document.addEventListener('keydown', this.turnFurry);

}

//----------------------------- prototypes

var self;

//--- index

Game.prototype.index = function(x, y) {
    return x + (y * 10);
}


//--- show Furry

Game.prototype.showFurry = function() {
    this.hideVisibleFurry();
    this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
}


//--- hideVisibleFurry  

Game.prototype.hideVisibleFurry = function() {
    var furdiv = document.querySelector('.furry');
    if (furdiv !== null) {
        furdiv.classList.remove('furry');
    }
}


//--- show coin  

Game.prototype.showCoin = function() {
    this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
}


//--- move Furry 



Game.prototype.moveFurry = function(self) {



    if (self.furry.direction === "right") {
        self.furry.x = self.furry.x + 1;
    } else if (self.furry.direction === "left") {
        self.furry.x = self.furry.x - 1;
    } else if (self.furry.direction === "up") {
        self.furry.y = self.furry.y - 1;
    } else if (self.furry.direction === "down") {
        self.furry.y = self.furry.y + 1;
    }

    self.gameOver();
    self.showFurry();
    self.checkCoinCollision();


}


//--- turn furry  

Game.prototype.turnFurry = function(event) {
    switch (event.which) {
        case 37:
            self.furry.direction = 'left';
            break;
        case 38:
            self.furry.direction = 'up';
            break;
        case 39:
            self.furry.direction = 'right';
            break;
        case 40:
            self.furry.direction = 'down';
            break;
    }
}

//--- coin collision


Game.prototype.checkCoinCollision = function() {

    if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
        document.querySelector('div.coin').classList.remove('coin');
        this.score++;
        document.querySelector('#score strong').innerText = this.score;
        this.coin = new Coin;
        this.showCoin();
    }
}

//--- game over 

Game.prototype.gameOver = function() {

    if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
        self.hideVisibleFurry();
        clearInterval(this.idSetInterval);
        document.querySelector('#board').classList.add('invisible');
        document.querySelector('#over').classList.remove('invisible');

    }
}



//-------- furry instant movement ( start game )

Game.prototype.startGame = function() {
    this.idSetInterval = setInterval(this.moveFurry, 250, this);
}


module.exports = Game;