const p = document.querySelector('#weather, p')

let weatherData = {}

let xhr = new XMLHttpRequest()

xhr.open('GET', 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m')
xhr.responseType = 'text';

xhr.addEventListener('load', function() {
    if (xhr.status === 200) {
        p.textContent = "loading...";
        weatherData = JSON.parse(xhr.responseText)
        weatherPost()

    } else {

        p.textContent = "error: " + xhr.status
    }

}, false)

xhr.send()

// Display weather information
function weatherPost() {
    // time,
    // temperature_2m,
    // humidity_2m,
    // wind_2m,
    // cloud cover_2m


    const temp = weatherData.hourly.temperature_2m
    const sec = weatherData.generationtime_ms
    const tempe = weatherData.elevation
    const time = weatherData.hourly.time



    const humidity = weatherData.hourly.humidity_2m
    const wind = weatherData.hourly.wind_2m
    const cloud = weatherData.hourly.cloudcover_mid


    const str = ` Tempe:${tempe} <br>sec:${sec} <br> time:${time} \n temp:${temp} humidity:${humidity} wind:${wind} cloud:${cloud}`
    p.innerHTML = str


}