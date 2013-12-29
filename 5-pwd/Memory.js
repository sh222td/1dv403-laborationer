"use strict";

var Memory = {
    
    click: 0,
    currentCard: null,
    previousCard: null,
    tries: 0,
    init: function(rows, cols) {
        var randomImage = RandomGenerator.getPictureArray(rows, cols);
        this.scoreBoard();
        this.createTable(rows, cols, randomImage);
    },
    
    createTable: function(rows, cols, randomImage){
    var body = document.getElementById("memory");
    var table  = document.createElement("table");
    var that = this;
    var cardArray = [];
    var count = 0;
    
    for (var i = 0; i < rows; i++) {
        var tr = document.createElement("tr");
        for (var n = 0; n < cols; n++) {
            
            var card = new Card(randomImage[count], that);
            cardArray.push(card);
            
            tr.appendChild(card.getTd());
            count++;
        }
        table.appendChild(tr);
    }
    body.appendChild(table);
    },
    
    flipCard: function(card) {
        if (this.currentCard !== null && this.previousCard !==null) {
            return;
        }
        var that = this;
        this.click++;
        
        if (this.click === 1) {
            card.flip();
            this.currentCard = card;
            return;
        }
        
        if (this.click === 2) {
            card.flip();
            this.previousCard = card;
            
            if (this.currentCard.getID() === this.previousCard.getID()) {
                this.click = 0;
                that.currentCard = null;
                that.previousCard = null;
            }
            else {
                setTimeout (function() {
                    that.currentCard.getBackside();
                    that.previousCard.getBackside();
                    that.currentCard = null;
                    that.previousCard = null;
                }, 1000);
            }
            this.click = 0;
            this.scoreBoard(this.tries++);
            console.log(this.tries);
        }
    },
    
    scoreBoard: function(tries) {
        document.getElementById("tries").innerHTML = "Kattliv förlorade: " + this.tries;
    }
};

window.onload = function() {
    Memory.init(4,4);
};