// get information for both cities
export async function collectCities(cityA, cityB) {
    try {
        const first = await getWeatherInfo(cityA);
        const second = await getWeatherInfo(cityB);
        const latA = first.city.coord.lat;
        const lonA = first.city.coord.lon;
        const latB = second.city.coord.lat;
        const lonB = second.city.coord.lon;
        const fiveDayA = await getFiveDay(latA, lonA);
        const fiveDayB = await getFiveDay(latB, lonB);
        console.log(fiveDayA)
        console.log(fiveDayB)
    } catch (error) {
        console.error(error);
    }
}
// get city coordinants
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
async function getFiveDay(lat, lon){
    const apiUrl2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&lang=en&units=imperial&appid=42bd6e08d7e2ce3a0832c24d332bfd1e`
    try {
        const response = await fetch(apiUrl2);
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

