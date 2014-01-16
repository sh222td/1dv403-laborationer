"use strict";

var Form = {
    exist : null, 
    init: function(){
        var firstName = document.getElementById("firstname");
        var lastName = document.getElementById("lastname");
        var email = document.getElementById("email");
        var regEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var zipCode = document.getElementById("zipcode");
        var button = document.getElementById("button");
        
        firstName.onblur = function() {
            if (firstName.value === ""){
                if (!this.exist) {
                    button.disabled = true;
                    var fn = document.getElementById("fn");
                    var fnText = document.createTextNode("Detta fält får inte lämnas tomt");
                    var p = document.createElement("p");
                    p.id="fname";
                    p.appendChild(fnText);
                    fn.appendChild(p);
                    this.exist = true;
                }
            }
            else if (firstName.value.length > 0){
                var removeMsg = document.getElementById("fname");
                removeMsg.parentNode.removeChild(removeMsg);
                this.exist = null;
            }
        };
        
        lastName.onblur = function() {
            if (lastName.value === ""){
                if (!this.exist) {
                button.disabled = true;
                var ln = document.getElementById("en");
                var lnText = document.createTextNode("Detta fält får inte lämnas tomt");
                var p = document.createElement("p");
                p.id="ename";
                p.appendChild(lnText);
                ln.appendChild(p);
                this.exist = true;
                }
            }
            else if (lastName.value.length > 0){
                var removeMsg = document.getElementById("ename");
                removeMsg.parentNode.removeChild(removeMsg);
                //button.disabled = false;
                this.exist = null;
            }
        };
        
        email.onblur = function() {

            if (!this.value.match(regEmail)) {
                if (!this.exist) {
                button.disabled = true;
                var em = document.getElementById("emailerror");
                var emText = document.createTextNode("E-Posten är inte giltlig");
                var p = document.createElement("p");
                p.id="emname";
                p.appendChild(emText);
                em.appendChild(p);
                this.exist = true;
                }
            }
            else{
                var removeMsg = document.getElementById("emname");
                removeMsg.parentNode.removeChild(removeMsg);
                button.disabled = false;
                this.exist = null;
            }
        };
        
        zipCode.onblur = function() {
            var postalCode = zipCode.value;
            
            if (postalCode.match(/^\d{5}$/) || postalCode.match(/^\d{3}[ ]\d{2}$/) ||  postalCode.match(/^\d{3}-\d{2}$/) || postalCode.match(/^[SE]+\d{5}$/) || postalCode.match(/^[SE]+\d{3}-\d{2}$/) || postalCode.match(/^[SE]+\d{3}[ ]\d{2}$/) || postalCode.match(/^[SE]+[ ]+\d{5}$/) || postalCode.match(/^[SE]+[ ]+\d{3}[ ]\d{2}$/) || postalCode.match(/^[SE]+[ ]+\d{3}-\d{2}$/) ){         
                postalCode = postalCode.replace(/-/g, "");
                postalCode = postalCode.replace(/ /g, "");
                zipCode.value = postalCode.replace(/SE/g, "");
            }
            
            if (zipCode.value === ""){
                if (!this.exist) {
                button.disabled = true;
                var pn = document.getElementById("pn");
                var pnText = document.createTextNode("Detta fält får inte lämnas tomt");
                var p = document.createElement("p");
                p.id="zipname";
                p.appendChild(pnText);
                pn.appendChild(p);
                this.exist = true;
                }
            }
            else if (zipCode.value.length > 0){
                var removeMsg = document.getElementById("zipname");
                removeMsg.parentNode.removeChild(removeMsg);
                //button.disabled = false;
                this.exist = null;
            }
        };
    },

    
    clicker: function() { 
            var body = document.getElementById("body");
            var backgroundDiv = document.createElement("div");
            var popup = document.createElement("div");
            var cancelButton = document.createElement("button");
            var proceedButton = document.createElement("button");
            var cancelButtonText = document.createTextNode("Avbryt");
            var proceedButtonText = document.createTextNode("Genomför Köp");
            var submit = document.getElementById("button");
            
            popup.className = "popup";
            backgroundDiv.className = "background";
            
            cancelButton.setAttribute("click");
            proceedButton.setAttribute("click");
            
            cancelButton.appendChild(cancelButtonText);
            proceedButton.appendChild(proceedButtonText);
            
            popup.appendChild(cancelButton);
            popup.appendChild(proceedButton);
            body.appendChild(popup);
            body.insertBefore(backgroundDiv, body.firstChild);
            
            cancelButton.onclick = function() { 
                popup.parentNode.removeChild(popup);
                backgroundDiv.parentNode.removeChild(backgroundDiv);
            };
            
            proceedButton.onclick = function() {
                document.getElementById("form").submit();
            };
            
            var table = document.createElement("table");
            var inputInfo = document.getElementsByTagName("input"); 
            
            for (var i = 0; i < inputInfo.length; i++ ) {
                var input = inputInfo[i].getAttribute("name");
                var inputValue = inputInfo[i].value;
                console.log(input);
                console.log(inputValue);
                
                var tblTd = document.createTextNode(input);
                var tblVa = document.createTextNode(inputValue);
                var td = document.createElement("td");
                var tdTwo = document.createElement("td");
                var tr = document.createElement("tr");
                
                table.appendChild(tr);
                tr.appendChild(td);
                tr.appendChild(tdTwo);
                td.appendChild(tblTd);
                tdTwo.appendChild(tblVa);
            }
            
            var select = document.getElementById("price");
            var selectAtt = select.getAttribute("for");
            var optionCho = document.createTextNode(select.options[select.selectedIndex].value)
            var priceType = document.createTextNode(selectAtt);                
              
            var tdName = document.createElement("td");
            tdName.appendChild(priceType);
            var tdOp = document.createElement("tr");
            tdOp.appendChild(optionCho);
            var tr2 = document.createElement("tr");
            tr2.appendChild(tdName);
            tr2.appendChild(tdOp);
            table.appendChild(tr2);
            popup.appendChild(table);
            
        },
        
        button: function() {
            var that = this;
            var sendButton = document.getElementById("button");
            sendButton.addEventListener("click", function() {
                    that.clicker();
            },false);
        }
        
};

window.onload = function(){
    Form.init();
    Form.button();
    var form = document.getElementById("form");
    form.onsubmit = function(e) {
        e.preventDefault();
    };
    
};


