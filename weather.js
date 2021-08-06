const weather = document.getElementById("weather");

function getWeather(){
    if('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
            getWeatherByLL(position.coords.latitude, position.coords.longitude)
        });
    } else {
        console.log(`geolocation not available`);
    }
}

async function getWeatherByLL(geoLat, geoLng){
    let api = "https://api.openweathermap.org/data/2.5/weather";
    let apiKey = "0f37cc8b91496d5e51fc037fab78370e";
    let url =
        api +
        "?lat=" +
        geoLat +
        "&lon=" +
        geoLng +
        "&appid=" +
        apiKey +
        "&units=imperial";
    await fetch(url)
        .then(response => response.json())
        .then(data => {
            weather.innerHTML = "Your location is: "+data.name+" | Temperature: "+data.main.temp+"℉ | Feels Like: "+data.main.feels_like+"℉ | "+data.weather[0].description
        });
}

getWeather();