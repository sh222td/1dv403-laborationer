"use strict";

var makePerson = function(persArr){

    var personObj = {};
    var ages = [];
    var averageAge;
    var names = [];
    
    
    ages = persArr.map(function(person){
        return person.age;
    });
    
    personObj.maxAge = ages.reduce(function(prevAge, age){
        return Math.max(prevAge, age);
    });
    
    personObj.minAge = ages.reduce(function(prevAge, age){
        return Math.min(prevAge, age);
    });
    
    personObj.averageAge = Math.round((persArr[0].age + persArr[1].age + persArr[2].age) / 3);
    
    names = persArr.map(function(person) {
       return person.name; 
    });
    
    personObj.names = names.sort(function(a, b){
            return a.localeCompare(b);
    });
    
    personObj.names = names.reduce(function(names, name) {
        return names + ", " + name;
    });
 
    return personObj;
};