// API = aa2086bc33ed267f712b7dce08282e66;

const moment = require('moment');

const currentConditions = document.querySelector('.current-conditions');
const forecast = document.querySelector('.forecast');

function getGeoLocation() {
  if (navigator.geolocation) {
    console.log('supported');
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    console.log('not supported')
  }
}

function onSuccess(position) {
  const { latitude, longitude } = position.coords;
  getCurrentConditions(latitude, longitude);
  getForecast(latitude, longitude)
}

function onError(error) {
  console.log(error)
}

window.addEventListener('load', getGeoLocation);

function getCurrentConditions(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=aa2086bc33ed267f712b7dce08282e66`)
    .then(response => {
      response.json().then(data => {
        let mainTemp = data.main;
        let aveTemp = Math.floor(mainTemp.temp - 273.15);
        let weather = data.weather[0];
        createCurrentConditions(weather.icon, aveTemp, weather.description);
      })
    })
}

function createCurrentConditions(icon, aveTemp, condition) {
  currentConditions.insertAdjacentHTML('beforeend',
    `<h2>Current Conditions</h2>
    <img src="http://openweathermap.org/img/wn/${icon}@2x.png" />
    <div class="current">
      <div class="temp">${aveTemp}℃</div>
      <div class="condition">${condition}</div>
    </div>`
  );
}

function getForecast(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=aa2086bc33ed267f712b7dce08282e66`)
    .then(response => {
      response.json().then(data =>
        data.list.slice(1)
      ).then(data => {
        let obj = {
          first: data.slice(0, 8),
          second: data.slice(8, 16),
          third: data.slice(16, 24),
          forth: data.slice(24, 32),
          fifth: data.slice(32, data.length)
        }
        createForecast(obj)
      })
    })
}

function createForecast(data) {
  for (const value in data) {
    let max = Math.max.apply(Math, data[value].map(item => item.main.temp_max)) - 273.15;
    let min = Math.min.apply(Math, data[value].map(item => item.main.temp_min)) - 273.15;
    forecast.insertAdjacentHTML('beforeend',
    `<div class="day">
    <h3>${moment(data[value][4].dt_txt).format('dddd')}</h3>
    <img src="http://openweathermap.org/img/wn/${data[value][4].weather[0].icon}@2x.png" />
    <div class="description">${data[value][4].weather[0].description}</div>
    <div class="temp">
    <span class="high">${Math.floor(max)}℃</span>/<span class="low">${Math.floor(min)}℃</span>
    </div>
    </div>
    `
    )
  }
}