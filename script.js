// locating latitude and longitude for your location
document.getElementById('location').addEventListener('click', geoLocation, false)

function geoLocation() {
    const status = document.getElementById('stat')

    function success(position) {
        const latitude = parseFloat(position.coords.latitude)
        const longitude = parseFloat(position.coords.longitude)
        status.innerHTML = `Your location is: <br>latitude: ${latitude}, longitude: ${longitude}`
        getWeather(latitude, longitude)
    }

    function error(err) {
        status.innerHTML = `Did not retrieve location,Error:${err.code}. ${ err.message }`
    }
    if (!navigator.geolocation) {
        status.innerHTML = `Geolocation is not available or supported allowed by your browser, Please connect to the Google Map API and try again`
    } else {

        status.innerHTML = `Processing...`
        navigator.geolocation.getCurrentPosition(success, error)
    }
}


// Retrieve the weather information

function getWeather(latitude, longitude) {

    const p = document.querySelector('#weather p')

    let weatherData = {}
    let weather = new XMLHttpRequest()

    weather.open('GET', 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,relativehumidity_2m,windspeed_120m,cloudcover_mid')
    weather.responseType = 'text';

    weather.addEventListener('load', function() {
        if (weather.status === 200) {
            p.textContent = "loading...";
            weatherData = JSON.parse(weather.responseText)
            weatherPost(weatherData, p)

        } else {
            p.textContent = "error: " + weather.status
        }

    }, false)
    weather.send()

}


// Display weather information
function weatherPost(weatherData, p) {
    // time,
    // temperature_2m,
    // humidity_2m,
    // wind_2m,
    // cloud cover_2m



    const sec = weatherData.generationtime_ms
    const tempe = weatherData.elevation
        // const time = weatherData.hourly.time


    const temp = weatherData.hourly.temperature_2m
    const wind = weatherData.hourly.windspeed_120m
    const humidity = weatherData.hourly.relativehumidity_2m
    const cloud = weatherData.hourly.cloudcover_mid


    const str = `Temperature in °C: ${temp}<br><br> Wind in km/h: ${wind} <br><br> Relative Humidity: ${humidity} <br><br> Cloud Cover: ${cloud} <br><br> Generationtime_ms: ${sec} <br><br> Elevation: ${tempe}`
    p.innerHTML = str


}