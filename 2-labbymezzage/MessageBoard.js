"use strict";

var MessageBoard = {
    messages: [],
    init: function() {
        var that = this;
        var currentMessage = document.getElementById("textarea"); 
        var sendButton = document.getElementById("button").onclick = function () {  
            MessageBoard.addMessage(currentMessage.value); 
        };
        
        currentMessage.onkeypress = function(e){
            if(e.keyCode === 13 && !e.shiftKey){
                MessageBoard.addMessage(currentMessage.value);
            }
        };
    },
    addMessage: function(text){
        if(text === ""){ 
            return false; 
        } 
        this.mess = new Message(text, new Date); 
        this.messages.push(this.mess);
        MessageBoard.renderMessages();
    },
    renderMessages: function () { 
        document.getElementById("textarea").value = "";
        document.getElementById("messagebox").innerHTML = ""; 
        for(var i = 0; i<this.messages.length; i++){
           MessageBoard.renderMessage(i); 
        }
        var messageCounter = document.getElementById("counter");
        var length = (MessageBoard.messages.length);
        messageCounter.innerHTML = length;
    }, 

    renderMessage: function (messageID) { 
        
        var div = document.getElementById("messagebox");
        var text = document.createElement("p"); 
        var date = document.createElement("h4");
        date.className = "clock";
        
        text.innerHTML = MessageBoard.messages[messageID].getHTMLText();
        date.innerHTML = MessageBoard.messages[messageID].getDate().toLocaleTimeString();
        text.appendChild(date);
        div.appendChild(text);
        
        var cross = document.createElement("a");
        var imgCross = document.createElement("img");
        imgCross.className = "icon";
        imgCross.setAttribute("src", "kryss.png");
        div.appendChild(imgCross);
        
        var time = document.createElement("a");
        var imgTime = document.createElement("img");
        imgTime.setAttribute("src", "clock.png");
        imgTime.className = "icon";
        date.appendChild(time);
        time.appendChild(imgTime);
        
        
        //Ta bort knappen.
        cross.setAttribute("a"); 
        imgCross.setAttribute("src", "kryss.png"); 
        imgCross.addEventListener("click", function(){
            MessageBoard.remove(messageID);
        }, false);
        
        //Tidvisaren
        time.onclick = function(){
            alert ("Meddelandet skrevs " + MessageBoard.messages[messageID].getDate().toLocaleDateString() + " klockan " + MessageBoard.messages[messageID].getDate().toLocaleTimeString());
        };
        
    },
        remove: function(messageID) {
            if (window.confirm("Är du säker på att du vill ta bort meddelandet?")) {
                console.log(MessageBoard.messages);
                MessageBoard.messages.splice(messageID, 1); 
                console.log(MessageBoard.messages);
                MessageBoard.renderMessages(); 
                }
        }

};
window.onload = function() {
    MessageBoard.init();
}

   