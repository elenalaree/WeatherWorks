import {collectCities} from './weather.js'

const findCities = document.getElementById('find-cities');
const city1 = document.getElementById('city1');
const city2 = document.getElementById('city2');

findCities.addEventListener("click", (e) =>{
    e.preventDefault();
    collectCities(city1.value, city2.value)
    })
 