/******/
(function(modules) { // webpackBootstrap
    /******/ // The module cache
    /******/
    var installedModules = {};
    /******/
    /******/ // The require function
    /******/
    function __webpack_require__(moduleId) {
        /******/
        /******/ // Check if module is in cache
        /******/
        if (installedModules[moduleId]) {
            /******/
            return installedModules[moduleId].exports;
            /******/
        }
        /******/ // Create a new module (and put it into the cache)
        /******/
        var module = installedModules[moduleId] = {
            /******/
            i: moduleId,
            /******/
            l: false,
            /******/
            exports: {}
            /******/
        };
        /******/
        /******/ // Execute the module function
        /******/
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/
        /******/ // Flag the module as loaded
        /******/
        module.l = true;
        /******/
        /******/ // Return the exports of the module
        /******/
        return module.exports;
        /******/
    }
    /******/
    /******/
    /******/ // expose the modules object (__webpack_modules__)
    /******/
    __webpack_require__.m = modules;
    /******/
    /******/ // expose the module cache
    /******/
    __webpack_require__.c = installedModules;
    /******/
    /******/ // define getter function for harmony exports
    /******/
    __webpack_require__.d = function(exports, name, getter) {
        /******/
        if (!__webpack_require__.o(exports, name)) {
            /******/
            Object.defineProperty(exports, name, {
                /******/
                configurable: false,
                /******/
                enumerable: true,
                /******/
                get: getter
                    /******/
            });
            /******/
        }
        /******/
    };
    /******/
    /******/ // getDefaultExport function for compatibility with non-harmony modules
    /******/
    __webpack_require__.n = function(module) {
        /******/
        var getter = module && module.__esModule ?
            /******/
            function getDefault() { return module['default']; } :
            /******/
            function getModuleExports() { return module; };
        /******/
        __webpack_require__.d(getter, 'a', getter);
        /******/
        return getter;
        /******/
    };
    /******/
    /******/ // Object.prototype.hasOwnProperty.call
    /******/
    __webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
    /******/
    /******/ // __webpack_public_path__
    /******/
    __webpack_require__.p = "";
    /******/
    /******/ // Load entry module and return exports
    /******/
    return __webpack_require__(__webpack_require__.s = 0);
    /******/
})
/************************************************************************/
/******/
([
    /* 0 */
    /***/
    (function(module, exports, __webpack_require__) {



        var Game = __webpack_require__(1);





        //--------------------------- launching 

        var game1 = new Game();

        game1.showFurry();
        game1.showCoin();
        game1.startGame();


        /***/
    }),
    /* 1 */
    /***/
    (function(module, exports, __webpack_require__) {



        var Furry = __webpack_require__(2);
        var Coin = __webpack_require__(3);


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

        /***/
    }),
    /* 2 */
    /***/
    (function(module, exports) {


        //-------------------- furry constructor

        var Furry = function() {
            this.x = 0;
            this.y = 0;
            this.direction = "right";
        }


        module.exports = Furry;

        /***/
    }),
    /* 3 */
    /***/
    (function(module, exports) {


        //-------------------- coin constructor


        var Coin = function() {
            this.x = Math.floor(Math.random() * 10);
            this.y = Math.floor(Math.random() * 10);
        }


        module.exports = Coin;

        /***/
    })
    /******/
]);