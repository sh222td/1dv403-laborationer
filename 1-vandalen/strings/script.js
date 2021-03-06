"use strict";

window.onload = function(){

	// I denna funktion ska du skriva koden för att hantera "spelet"
	var convertString = function(str){
		// Plats för förändring.	
		
		
		var stringArray = [];
		var string = "";
		var n;
		var x;
		
		for (n = 0; n < str.length; n++){
		    if (str[n].match(/([A-ZÅÄÖ])/g)) {
		        stringArray[n] = str[n].replace(/([A-ZÅÄÖ])/g, str[n].toLowerCase());
		    }
		    else{
                stringArray[n] = str[n].replace(/([a-zåäö])/g, str[n].toUpperCase());
		    }
		}
		
		for (x = 0; x < stringArray.length; x++){
		    string += stringArray[x];
            console.log(stringArray[x]);
		}
		
		var converted = string.replace(/A/gi,"#");
		return converted;
		
		// Returnera den konverterade strängen.
		// Vid fel, kasta ett undantag med ett meddelande till användaren. 
	

	};
	// ------------------------------------------------------------------------------


	// Kod för att hantera utskrift och inmatning. Denna ska du inte behöva förändra
	var p = document.querySelector("#value"); // Referens till DOM-noden med id="#value"
	var input = document.querySelector("#string");
	var submit = document.querySelector("#send");

	// Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
	submit.addEventListener("click", function(e){
		e.preventDefault(); // Hindra formuläret från att skickas till servern. Vi hanterar allt på klienten.

		p.classList.remove( "error");

		try {
			var answer = convertString(input.value); // Läser in texten från textrutan och skickar till funktionen "convertString"
			p.innerHTML = answer;		// Skriver ut texten från arrayen som skapats i funktionen.	
		} catch (error){
			p.classList.add( "error"); // Växla CSS-klass, IE10+
			p.innerHTML = error.message;
		}
	
	});



};