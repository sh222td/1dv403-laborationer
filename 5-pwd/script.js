"use strict";

var Desktop = {
    
    clicker: function() { 
        var body = document.getElementById("body");
        var popup = document.createElement("div");
        var cancelButton = document.createElement("button");
        var cancelButtonText = document.createTextNode("X");
        
        cancelButton.className = "button";
        popup.className = "popup";
        
        cancelButton.setAttribute("click");
        cancelButton.appendChild(cancelButtonText);
        popup.appendChild(cancelButton);
        body.appendChild(popup);
        body.insertBefore(body.firstChild);
        
        cancelButton.onclick = function() { 
            popup.parentNode.removeChild(popup);
        };
    },
    
    button: function() {
            var that = this;
            var rssButton = document.getElementById("RSSicon");
            rssButton.addEventListener("click", function() {
                    that.clicker();
            },false);
        },
    
    memoryButton: function() {
        var that = this;
        var memoryIcon = document.getElementById("MEMORYicon");
            memoryIcon.addEventListener("click", function() {
                    that.clicker();
            },false);
    }
};

window.onload = function(){
    Desktop.button();
    Desktop.memoryButton();
};