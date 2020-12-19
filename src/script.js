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
}

  function search(city){
    let apiKey = "ca7e82d0d5801d59d5748f1ff62a2dcb";
    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?q=";
    let unit = "metric";
    let apiUrl = `${apiEndpoint}${city}&appid=${apiKey}&units=${unit}`;
    axios.get(apiUrl).then(showWeather);
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

let locationButton = document.querySelector("#my-location");
locationButton.addEventListener("click", retrievePosition);
