function formatDate(timestamp){
  let date = new Date(timestamp);
  let yearNow = date.getFullYear();
  let dayNumber = new Date().getDate();

  let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  ];
  let day = days[date.getDay()];

  let months = [
   "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let monthNow = months[date.getMonth()];

  return `${day}, ${dayNumber} ${monthNow} ${yearNow}, ${formatHours(timestamp)}`;
}

function formatHours(timestamp){
  let date = new Date(timestamp);
  let hours = date.getHours();
    if (hours < 10){
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}h${minutes}`;
}

function showWeather(response){
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#currentTemp").innerHTML = `${Math.round(response.data.main.temp)}°C`;
  document.querySelector("#humidity").innerHTML = `&#128167; &nbsp ${response.data.main.humidity}%`;
  document.querySelector("#feeling").innerHTML = `Feels like ${Math.round(response.data.main.feels_like)}°C`;
  document.querySelector("#max-now").innerHTML = `Max: ${Math.round(response.data.main.temp_max)}°C `;
  document.querySelector("#min-now").innerHTML = `| Min: ${Math.round(response.data.main.temp_min)}°C`;
  document.querySelector("#windSpeed").innerHTML = `&#127788; &nbsp ${Math.round(response.data.wind.speed)} km/h`;
  document.querySelector("#description").innerHTML = response.data.weather[0].main;
  document.querySelector("#currentDate").innerHTML = formatDate(response.data.dt * 1000);
  document.querySelector("#icon-today").setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  document.querySelector("#icon-today").setAttribute("alt", response.data.weather[0].description);  
  celsiusTemperature = response.data.main.temp;
  celsiusMinTemp = Math.round(response.data.main.temp_min);
  celsiusMaxTemp = Math.round(response.data.main.temp_max);
  realFeelTemp = Math.round(response.data.main.feels_like);
}

function displayForecast(response){
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML=null;
  let forecast = null;

for (let index = 0; index < 6 ; index++){
    forecast = response.data.list[index];
    forecastElement.innerHTML +=`
      <div class="col-2">
      <p>${formatHours(forecast.dt*1000)}</p>
      <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png">
      <p>
      Max: <span class="max">${Math.round(forecast.main.temp_max)}&deg;C</span> <br/>
      Min: <span class="min">${Math.round(forecast.main.temp_min)}&deg;C</span></p>
      </div>
      `;
  }
}

  function search(city){
    let apiKey = "ca7e82d0d5801d59d5748f1ff62a2dcb";
    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?q=";
    let unit = "metric";
    let apiUrl = `${apiEndpoint}${city}&appid=${apiKey}&units=${unit}`;
    axios.get(apiUrl).then(showWeather);

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${unit}`;
    axios.get(apiUrl).then(displayForecast);
  }

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-input").value;
  search(city);
}

search ("London");

let form = document.querySelector("#search-City");
form.addEventListener("submit", handleSubmit);

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "ca7e82d0d5801d59d5748f1ff62a2dcb";
  let unit = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather"
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showWeather);
}

function retrievePosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#currentTemp");
  let minTempElement = document.querySelector("#min-now");
  let maxTempElement = document.querySelector("#max-now");
  let realFeel = document.querySelector("#feeling");
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature*9)/5+32;
  let minFahrenheitTemp = (celsiusMinTemp*9)/5+32;
  let maxFahrenheitTemp = (celsiusMaxTemp*9)/5+32;
  let realFeelTempF = (realFeelTemp*9)/5+32;
  temperatureElement.innerHTML = `${Math.round(fahrenheitTemperature)}&deg;F`;
  minTempElement.innerHTML = ` Min: ${Math.round(minFahrenheitTemp)}&deg;F`;
  maxTempElement.innerHTML = `Max: ${Math.round(maxFahrenheitTemp)}&deg;F |`;
  realFeel.innerHTML = `Feels like ${Math.round(realFeelTempF)}&deg;F`;
}

function showCelsiusTemperature(event){
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  let temperatureElementC = document.querySelector("#currentTemp");
  let minTempElementC = document.querySelector("#min-now");
  let maxTempElement = document.querySelector("#max-now");
  let realFeelC = document.querySelector("#feeling");
  let celsiusTemp = celsiusTemperature;
  let minTempC = celsiusMinTemp;
  let maxTempC = celsiusMaxTemp;
  let realFeelTempC = realFeelTemp;
  temperatureElementC.innerHTML = `${Math.round(celsiusTemp)}&deg;C`;
  minTempElementC.innerHTML = ` Min: ${Math.round(minTempC)}&deg;C`;
  maxTempElement.innerHTML = `Max: ${Math.round(maxTempC)}&deg;C |`;
  realFeelC.innerHTML = `Feels like ${Math.round(realFeelTempC)}&deg;C`;
}

let celsiusTemperature = null;

let celsiusMinTemp = null;

let celsiusMaxTemp = null;

let realFeelTemp = null;


let locationButton = document.querySelector("#my-location");
locationButton.addEventListener("click", retrievePosition);

let fahrenheit = document.querySelector("#Fahrenheit");
fahrenheit.addEventListener("click", showFahrenheitTemperature);

let celsius = document.querySelector("#Celsius");
celsius.addEventListener("click", showCelsiusTemperature);