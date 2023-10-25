import { collectCities } from "./weather.js";

const dayBox1 = document.getElementById('cityForecast1');
const dayBox2 = document.getElementById('cityForecast2');

const myFaves = JSON.parse(localStorage.getItem('the-faves')) || [];
const holdFaves = document.getElementById('holdFaves');

export async function addToFaves(cityA, cityB) {
    let lowerCity1 = cityA.toLowerCase();
    let lowerCity2 = cityB.toLowerCase();

    const faveCityPair = [lowerCity1, lowerCity2];
    
    const checkCheck = checkCities(faveCityPair, myFaves)
    
    if (checkCheck == true) {
        // Do nothing
        
    } else {
        myFaves.push(faveCityPair);
        console.log(faveCityPair);
        localStorage.setItem('the-faves', JSON.stringify(myFaves));
    }
}

function checkCities(obj, arr){
    let trueFalse = false;
    for (let pair = 0; pair < arr.length; pair++) {
            let cityOne = arr[pair][0];
            let cityTwo = arr[pair][1];
            let incoming1 = obj[0];
            let incoming2 = obj[1];
            if(cityOne == incoming1 && cityTwo == incoming2 || cityTwo == incoming1 && cityOne == incoming2){
                
                trueFalse = true;
            }
            else {
                trueFalse = false;
            }
    }
    return trueFalse;
}

export function fillFaves() {
    if (myFaves === null) {

    } else {
        myFaves.forEach(pair => {
            const div = document.createElement('div');
            const yeet = document.createElement('button');
            const myPretty = document.createElement('button');
            div.classList.add('cityPart');
            yeet.classList.add('yeet');
            yeet.classList.add('btn');
            myPretty.classList.add('daCities');
            myPretty.classList.add('btn');
            div.appendChild(yeet);
            div.appendChild(myPretty);
            myPretty.textContent = `${pair[0]} and ${pair[1]}`
            yeet.textContent = "X";
            holdFaves.appendChild(div);
            myPretty.addEventListener("click", (e) => {
                e.preventDefault();
                collectCities(pair[0], pair[1]);
            })
            yeet.addEventListener("click", (e) => {
                e.preventDefault();

                // Handle the removal of the pair from myFaves array
                const pairIndex = myFaves.indexOf(pair);
                if (pairIndex !== -1) {
                    myFaves.splice(pairIndex, 1);
                    localStorage.setItem('the-faves', JSON.stringify(myFaves));
                    div.remove(); // Remove the pair's UI element
                }
            })
        })
    };
}



function pageLoaded() {
    fillFaves();
}

if (holdFaves) {
    holdFaves.onload = pageLoaded();
} else {
    console.log('Element with ID "holdFaves" not found.');
}