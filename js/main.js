import {collectCities} from './weather.js';
import {addToFaves} from './faves.js';

const findCities = document.getElementById('find-cities');
const saveCities = document.getElementById('save-cities');
const city1 = document.getElementById('city1');
const city2 = document.getElementById('city2');

findCities.addEventListener("click", (e) =>{
    e.preventDefault();
    if(city1.value === null || city2.value === null){
        console.log("Please fill both cities!")
    }
    else {

        collectCities(city1.value, city2.value)
    }});
 
saveCities.addEventListener("click", (e) =>{
    e.preventDefault();
    if(city1.value === null || city2.value === null){
        console.log("Please fill both cities!")
    }
    else {
        addToFaves(city1.value, city2.value)
    }
    
    });