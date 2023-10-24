const dayBox1 = document.getElementById('cityForecast1');
const dayBox2 = document.getElementById('cityForecast2');

// get information for both cities
export async function collectCities(cityA, cityB) {
    try {
            dayBox1.innerHTML = "";
            dayBox2.innerHTML = "";
            dayBox1.classList.remove('visible');
            dayBox2.classList.remove('visible');
    

        // get both city lat and long
        const first = await getWeatherInfo(cityA);
        const second = await getWeatherInfo(cityB);
        // set lat and lon for both places
        const latA = first.city.coord.lat;
        const lonA = first.city.coord.lon;
        const latB = second.city.coord.lat;
        const lonB = second.city.coord.lon;
        // get full info for both cities
        const fiveDayA = await getFiveDay(latA, lonA);
        const fiveDayB = await getFiveDay(latB, lonB);
        // make the cities switch to city names
        const nameCity1 = document.getElementById('cityName1');
        const nameCity2 = document.getElementById('cityName2');
        const cityName1 = `${cityA}`;
        const cityName2 = `${cityB}`;
        nameCity1.textContent = cityName1.toUpperCase();
        nameCity2.textContent = cityName2.toUpperCase();
        insertWeather(fiveDayA, fiveDayB);
        console.log(fiveDayA)
        console.log(fiveDayB)
    } catch (error) {
        console.error(error);
    }
}
// get city coordinents
async function getWeatherInfo(city) {
    const apiUrl =
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
        city +
        "&lang=en&units=imperial&appid=42bd6e08d7e2ce3a0832c24d332bfd1e";

    try {
        const response = await fetch(apiUrl);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error("Error: City Not found.");
        }
    } catch (error) {
        throw error;
    }
}
// get five day forecast
async function getFiveDay(lat, lon) {
    const apiUrl2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&lang=en&units=imperial&appid=42bd6e08d7e2ce3a0832c24d332bfd1e`
    try {
        const response = await fetch(apiUrl2);
        if (response.ok) {
            const data = await response.json();
            return data
        } else {
            throw new Error("Error: City Not found.");
        }
    } catch (error) {
        throw error;
    }
}

function insertWeather(one, two) {
    // Day 1 today weather
    
    const todayContainer1 = document.createElement('aside');
    todayContainer1.classList.add('borderBox');
    todayContainer1.classList.add('today');
    
    var dt = new Date(one.current.dt * 1000);
    var windCurrent = parseInt(one.current.wind_speed);
    var tempCurrent = parseInt(one.current.temp);
    var sunrise1 = new Date(one.daily[0].sunrise * 1000).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit'});
    var sunset1 = new Date(one.daily[0].sunset * 1000).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit'});
    todayContainer1.innerHTML = `
        <p>Temp: ${tempCurrent}&deg;F</p>
        <p><img src="http://openweathermap.org/img/wn/${one.current.weather[0].icon}.png" alt="${one.current.weather[0].description}" class=" weatherIcon"></p>
        <p>High: ${one.daily[0].temp.max}&deg;F</p>
        <p>Low: ${one.daily[0].temp.min}&deg;F</p>
        <p>Sunrise: ${sunrise1}</p>
        <p>Sunset: ${sunset1}</p>
        <p>Wind: ${windCurrent} MPH</p>
        <p>Humidity: ${one.current.humidity}%</p>
    `
    dayBox1.appendChild(todayContainer1);

    const dayCast = [one.daily[1], one.daily[2], one.daily[3], one.daily[4]];
    dayCast.forEach(day => {
        const aside = document.createElement('aside');
        aside.classList.add('borderBox');
        aside.classList.add('fiveDayBox');
        var wind = parseInt(day.wind_speed);
        var dt = new Date(day.dt * 1000).toDateString();
        var sunrise = new Date(day.sunrise * 1000).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit'});
        var sunset = new Date(day.sunset * 1000).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit'});
        var rain = Math.round(day.pop * 100)
        aside.innerHTML = `
                <p>(${dt})</p>
                <p> <img 
                src="http://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="${day.weather[0].description}"/></p>
                <p>High: ${day.temp.max}&deg;F</p>
                <p>Low: ${day.temp.min}&deg;F</p>
                <p>Sunrise: ${sunrise}</p>
                <p>Sunset: ${sunset}</p>
                <p>Humidity: ${day.humidity}%</p>
                <p>Chance Rain: ${rain}%</p>
            `;
        dayBox1.appendChild(aside);
    });


    // Day 2 today weather
    
    const todayContainer2 = document.createElement('aside');
    todayContainer2.classList.add('borderBox');
    todayContainer2.classList.add('today');
    
    var dt2 = new Date(two.current.dt * 1000);
    var windCurrent2 = parseInt(two.current.wind_speed);
    var tempCurrent2 = parseInt(two.current.temp);
    var sunrise2 = new Date(two.daily[0].sunrise * 1000).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit'});
    var sunset2 = new Date(two.daily[0].sunset * 1000).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit'});
    todayContainer2.innerHTML = `
    <p>Temp: ${tempCurrent2}&deg;F</p>
    <p><img src="http://openweathermap.org/img/wn/${two.current.weather[0].icon}.png" alt="${two.current.weather[0].description}" class=" weatherIcon"></p>
    <p>High: ${two.daily[0].temp.max}&deg;F</p>
    <p>Low: ${two.daily[0].temp.min}&deg;F</p>
    <p>Sunrise: ${sunrise2}</p>
    <p>Sunset: ${sunset2}</p>
    <p>Wind: ${windCurrent2} MPH</p>
    <p>Humidity: ${two.current.humidity}%</p>
    `
    dayBox2.appendChild(todayContainer2);

    const dayCast2 = [two.daily[1], two.daily[2], two.daily[3], two.daily[4]];
    dayCast2.forEach(day => {
        const aside = document.createElement('aside');
        aside.classList.add('borderBox');
        aside.classList.add('fiveDayBox');
        var dt = new Date(day.dt * 1000);
        var sunrise = new Date(day.sunrise * 1000).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit'});
        var sunset = new Date(day.sunset * 1000).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit'});
        var rain = Math.round(day.pop * 100)
        aside.innerHTML = `
            <p>(${dt.toDateString()})</p>
            <p> <img 
            src="http://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="${day.weather[0].description}"/></p>
            <p>High: ${day.temp.max}&deg;F</p>
            <p>Low: ${day.temp.min}&deg;F</p>
            <p>Sunrise: ${sunrise}</p>
            <p>Sunset: ${sunset}</p>
            <p>Humidity: ${day.humidity}%</p>
            <p>Chance Rain: ${rain}%</p>
        `;
        dayBox2.appendChild(aside);
    });
    dayBox1.classList.add('visible');
    dayBox2.classList.add('visible');
}