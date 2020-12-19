let now = new Date();

let yearNow = now.getFullYear();

let dayNumber = new Date().getDate();

let hourNow = new Date().getHours();
if (hourNow < 10) {
  hourNow = "0" + hourNow;
}

let minutesNow = new Date().getMinutes();
if (minutesNow < 10) {
  minutesNow = "0" + minutesNow;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

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

let monthNow = months[now.getMonth()];

let dayNow = days[now.getDay()];

let nowFull = `${dayNow}, ${dayNumber} ${monthNow} ${yearNow}, ${hourNow}h${minutesNow}`;

let today = document.querySelector("#dateNow");
today.innerHTML = nowFull;

////

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
  document.querySelector("#icon-today").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  document.querySelector("#icon-today").setAttribute("alt", response.data.weather[0].description);
  celsiusTemperature = response.data.main.temp;
  celsiusMinTemp = Math.round(response.data.main.temp_min);
  celsiusMaxTemp = Math.round(response.data.main.temp_max);
  realFeelTemp = Math.round(response.data.main.feels_like);
}

function displayForecast(response){
console.log(response.date);
let forecastElement = document.querySelector("forecast");
forecastElement.innerHTML = `
   <div class="col - 2">
        <div class="card">
            <img src="src/images/cloudy 2.jpg" class="forecast" alt="cloudy">
                <div class="card-body">
                    <h5 class="card-title">12:00</h5>
                          <p class="card-text">Max: <span class="max">17&deg;C</span> <br/> Min: <span class="min">9&deg;C</span></p>
    </div>
    `
}

  function search(city){
    let apiKey = "ca7e82d0d5801d59d5748f1ff62a2dcb";
    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?q=";
    let unit = "metric";
    let apiUrl = `${apiEndpoint}${city}&appid=${apiKey}&units=${unit}`;
    axios.get(apiUrl).then(showWeather);

    apiUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${unit}`;
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
  let apiEndpoint = "http://api.openweathermap.org/data/2.5/weather"
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