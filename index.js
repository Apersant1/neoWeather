let city_token = "f88866f968b01d916aac1b8f288b0044";
let api_key = "471167e190d324460794dabc656b7959";

// `api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;

const weather = {};

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

function showError(error) {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// set position
function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  getWeather(latitude, longitude);
}

function getWeather(lat, lon) {
  let api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;
  fetch(api)
    .then((response) => {
      let data = response.json();
      return data;
    })
    .then((data) => {
      weather.temperature = Math.round(data.main.temp - 273.15);
      weather.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
      weather.city = data.name;
      weather.country = data.sys.country;
      weather.wind = data.wind;
      weather.humidity = data.main.humidity;
      weather.sunrize =
        new Date(data.sys.sunrise * 1000).getHours().toString(10) +
        ":" +
        new Date(data.sys.sunrise * 1000).getMinutes().toString(10);

      weather.sunset =
        new Date(data.sys.sunset * 1000).getHours().toString(10) +
        ":" +
        new Date(data.sys.sunset * 1000).getMinutes().toString(10);
    });
}

console.log(weather);
