let Time = new Date()
	.toLocaleString("en", { month: "long", day: "numeric", year: "numeric" })
	.toString();



// dsadds

let api_key = "471167e190d324460794dabc656b7959";



if ("geolocation" in navigator) {
	navigator.geolocation.getCurrentPosition(setPosition, showError);
}

function showError(error) {
	alert(` ${error.message}`)
}

// set user position
function setPosition(position) {
	let latitude = position.coords.latitude;
	let longitude = position.coords.longitude;
	getWeather(latitude, longitude);
}



// Get weather from API
async function getWeather(lat, lon) {
	let api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;
	fetch(api)
		.then(response => response.json())
		.then(data => render(data))
		.catch(err => { return new Error("City not found") })



}

let searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', (e) => {
	if (e.keyCode == 13) {
		getWeatherInputCity(searchBox.value.toLowerCase());
		searchBox.value = ""
	}
})

async function getWeatherInputCity(city) {
	let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`
	fetch(url)
		.then(response => response.json())
		.then(data => render(data))

}



function render(weather) {

	console.log(weather)

	if (weather.cod == "404") {
		let city = document.querySelector('.city');
		city.innerHTML = `${weather.message}`;

		let date = document.querySelector('.date');
		date.innerHTML = ``
		let currentTemp = document.querySelector('.current__temp');
		currentTemp.innerHTML = ``;
		let currentWeather = document.querySelector('.current__weather');
		currentWeather.innerHTML = ``
		let currenthumidity = document.querySelector('.current__humidity');
		currenthumidity.innerHTML = ``
	} else {
		let city = document.querySelector('.city');
		city.innerHTML = `${weather.name}`;
		let date = document.querySelector('.date');
		date.innerHTML = `${Time}`
		let currentTemp = document.querySelector('.current__temp');
		currentTemp.innerHTML = `${Math.round(weather.main.temp - 273.15)}` + '  <sup>o</sup>C';
		let currentWeather = document.querySelector('.current__weather');
		currentWeather.innerHTML = `${weather.weather[0].main}`
		let currenthumidity = document.querySelector('.current__humidity');
		currenthumidity.innerHTML = `<span>Humidity: <i>${weather.main.humidity}</i> % </span>`
	}


}









