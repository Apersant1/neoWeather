let api_key = "471167e190d324460794dabc656b7959";

let citysWeather = [];

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

// set user position
function setPosition(position) {
	let latitude = position.coords.latitude;
	let longitude = position.coords.longitude;
	getWeather(latitude, longitude);
}

//Get weather from API
function getWeather(lat, lon) {
	let api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;

	fetch(api)
		.then((response) => {
			let data = response.json();
			return data;
		})
		.then((data) => {
			const weather = {
				"City": data.name,
				"info": {
					"temperature": {
						"CurrentTemp": data.main.temp,
						"maxTemp": data.main.temp_max,
						"minTemp": data.main.temp_min,
					},
					"description": data.weather[0].description,
					"Country": data.sys.country,
					"Wind": data.wind,
					"humidity": data.main.humidity,
					"Sunrise": new Date(data.sys.sunrise * 1000).getHours().toString(10) + ":" + new Date(data.sys.sunrise * 1000).getMinutes().toString(10),
					"Sunset": new Date(data.sys.sunset * 1000).getHours().toString(10) + ":" + new Date(data.sys.sunset * 1000).getMinutes().toString(10),
				}
			};

			console.log(weather);
		});


}

// console.log(citysWeather);
// console.log(citysWeather.length);