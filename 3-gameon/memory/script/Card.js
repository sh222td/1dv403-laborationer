"use strict";

//Gör varje bild till ett eget klickbart objekt och vänder upp bilden som klickats på.
function Card (card, memory) {
        var td = document.createElement("td");
        var img = document.createElement("img");
        var a = document.createElement("a");
        a.href = "#";
        img.className = "icon";
        img.src = "pics/background0.png";
        var that = this;
        a.appendChild(img);
        td.appendChild(a);
        
    this.getTd = function(){
        return td;
    };
    
    a.onclick = function() {
        memory.flipCard(that);
    };
    
    this.getBackside = function() {
        a.onclick = function() {
            memory.flipCard(that);
        };
        img.src = "pics/background0.png";
    };
    
    this.flip = function() {
        a.onclick = null;
        img.src = "pics/" + card + ".png";
    };
    
    this.getID = function() {
        return card;
    };
   
}