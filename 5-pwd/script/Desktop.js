"use strict";

var Desktop = {
    
    counter : 0,
    loadIcon : null,
    footer : null,
    time : null,
    
    //Variablerna för popup fönstret.
    popupWindow: function(jsonImages) { 
        this.counter++;
        var that = this;
        var body = document.getElementById("content");
        var popup = document.createElement("popup");
        var imageIcon = document.createElement("img");
        var header = document.createElement("header");
        Desktop.footer = document.createElement("footer");
        var headerTxt = document.createElement("p");
        var headerText = document.createTextNode("Image Viewer");
        var cancelButton = document.createElement("img");
        var ajaxImg = document.createElement("div");
        Desktop.loadIcon = document.createElement("img");
        cancelButton.src = "images/delete.png";
        
        Desktop.time = setTimeout(function() {
        Desktop.loadIcon.src = "images/ajax.gif";
        Desktop.footer.appendChild(Desktop.loadIcon);
        },300);  
        
        //Ger några variabler klassnamn för redigering.
        cancelButton.className = "cancelButton";
        popup.className = "popup";
        headerTxt.className = "headerText";
        imageIcon.className = "image";
        
        //"Knuffar" in taggarna i popup rutan.
        cancelButton.setAttribute("click");
        header.appendChild(imageIcon);
        headerTxt.appendChild(headerText);
        header.appendChild(headerTxt);
        header.appendChild(cancelButton);
        popup.appendChild(header);
        popup.appendChild(ajaxImg);
        ajaxImg.appendChild(jsonImages);
        popup.appendChild(Desktop.footer);
        body.appendChild(popup);
        body.insertBefore(body.firstChild);
        
        //Funktion som stänger ner popup fönstret.
        cancelButton.onclick = function() { 
            popup.parentNode.removeChild(popup);
            that.counter = 0;
        };
    },
    
    //Knapp funktionen som kallar på ajax anropet för bilderna. 
    galleryButton: function() {
            var that = this;
            var galleryIcon = document.getElementById("GALLERYicon");
            galleryIcon.addEventListener("click", function() {
                    if (that.counter === 1) {
                        return;
                    }
                    else{
                    that.init();
                    }
            },false);
    },
    
    //Ajax metoden som hämtar ut länken med bilderna och knuffar in de i popup fönstret. 
    init: function() {
        var jsonImages = document.createElement("div");
        
        this.popupWindow(jsonImages);
        var xhr = new XMLHttpRequest(); 
        var count = 0;
        
        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4) {
                if(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                    var jsonStr = JSON.parse(xhr.responseText);
                    var currentThumb;
                    var height = 0;
                    var width = 0;
                
                    for (var n = 0; n < jsonStr.length; n++) {
                        currentThumb = jsonStr[n];
                        if (currentThumb.thumbHeight > height) {
                            height = currentThumb.thumbHeight;
                        }
                        if (currentThumb.thumbWidth > width) {
                            width = currentThumb.thumbWidth;
                        }
                    }
                    
                    //Hämtar ut varje photo individuellt.
                    for (var i = 0; i < jsonStr.length; i++) {
                        var img = document.createElement("img");
                        var currentThumb = document.createElement("div");
                        currentThumb.setAttribute("class", "boxes");
                        img.setAttribute("src", jsonStr[i].thumbURL);
                        img.setAttribute("id", "photo" + count);
                        
                        jsonImages.appendChild(currentThumb);
                        currentThumb.appendChild(img);
                        count++;
                        
                        //Ändrar bakgrundsbilden.
                        img.onclick = function(e) {
                            var image = e.target.id.replace("photo", ""); 
                            var background = jsonStr[image].URL;
                            var content = document.getElementById("content");
                            content.style.backgroundImage = "url(" + background + ")";
                        };      
                    currentThumb.style.width = width + "px";
                    currentThumb.style.height = height + "px";
                    }
                }
                else {
                    console.log("Läsfel, status"+xhr.status);
                }
                clearTimeout(Desktop.time);
                Desktop.footer.removeChild(Desktop.loadIcon);
            }
        };
        xhr.open("get", "http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/", true);    
        xhr.send(null);
    },
    
    interval: function() {
        
        setInterval(function(){updateClock()},1000);
    
        function updateClock(){
       
            var currentTime = new Date ();
            var currentHours = currentTime.getHours();
            var currentMinutes = currentTime.getMinutes();
            var currentSeconds = currentTime.getSeconds();

            // Pad the minutes and seconds with leading zeros, if required
            currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
            currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;
    
            // Choose either "AM" or "PM" as appropriate
            var timeOfDay = ( currentHours < 12 ) ? "AM" : "PM";

            // Convert the hours component to 12-hour format if needed
            currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;

            // Convert an hours component of "0" to "12"
            currentHours = ( currentHours === 0 ) ? 12 : currentHours;

            // Compose the string for display
            var currentTimeString = currentHours + ":" + currentMinutes + ":" + currentSeconds + " " + timeOfDay;

            // Update the time display
            document.getElementById("clock").firstChild.nodeValue = currentTimeString;
        }
    }
    
};

window.onload = function(){
    Desktop.galleryButton();
    Desktop.interval();
};