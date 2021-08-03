/*const api = {
    key: "",
    base: "https://api.openweathermap.org/data/2.5/"
}*/

const icons = new Skycons({ "color": "orange" })
icons.set("icon", "clear-day")
icons.play()

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchBox.value);
    }
}

//second method of doing this but your API will be revealed

/*function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}*/

function getResults(query) {
    fetch('/weather', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            query: query
        })
    })
    .then(weather => {
        return weather.json();
    })
    .then(displayResults);
}

function displayResults (weather) {
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;

    let pressure = document.querySelector('[press]');
    pressure.innerHTML = `${weather.main.pressure}<span>hPa</span>`;

    let wind = document.querySelector('[wind]');
    wind.innerHTML = `${weather.wind.speed}<span>Km/h</span>`;

    let humidity = document.querySelector('[humidity]');
    humidity.innerHTML = `${weather.main.humidity}<span>%</span>`;

}

function dateBuilder (d) {
    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}