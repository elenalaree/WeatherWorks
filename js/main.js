import {collectCities} from './weather.js';
import {addToFaves} from './faves.js';

const findCities = document.getElementById('find-cities');
const saveCities = document.getElementById('save-cities');
const city1 = document.getElementById('city1');
const city2 = document.getElementById('city2');

findCities.addEventListener("click", (e) =>{
    e.preventDefault();
    collectCities(city1.value, city2.value)
    });
 
saveCities.addEventListener("click", (e) =>{
    e.preventDefault();
    addToFaves(city1.value, city2.value)
    });