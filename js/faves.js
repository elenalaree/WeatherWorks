const myFaves = JSON.parse(localStorage.getItem('the-faves')) || [];
const holdFaves = document.getElementById('holdFaves');

export async function addToFaves(cityA, cityB){
    const faveCityPair = [cityA, cityB];
    myFaves.push(faveCityPair);
    console.log(faveCityPair);
    localStorage.setItem('the-faves', JSON.stringify(myFaves));
    console.log(myFaves)
}

export function fillFaves(){
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
    });
}

fillFaves();