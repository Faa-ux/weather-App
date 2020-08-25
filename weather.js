let date = new Date();
let day = date.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
console.log(date.getDate());
console.log(date.getHours());
let hr = date.getHours();
if (hr < 10) {
  hr = `0${hr}`;
}
console.log(date.getMinutes());
let min = date.getMinutes();
if (min < 10) {
  min = `0${min}`;
}
console.log(days[date.getDay()]);
console.log(date.getFullYear());
let time = document.querySelector("#current-time");
time.innerHTML = `${days[day]} ${hr}:${min} `;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#inputcity");
  console.log(searchInput.value);
  let geo = document.querySelector("#location");
  geo.innerHTML = `${searchInput.value}`;
  let currentWeather = document.querySelector("#temperature");
  let description = document.querySelector("#weatherdescriptor");
  let speed = document.querySelector("#wind");
  let humid = document.querySelector("#precipitation");
  let weathericon = document.querySelector("#icon");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=4a3d357424bef28614271bbf95c59986&&units=metric`;
  axios
    .get(apiUrl)
    .then(function (response) {
      console.log(response);
      var forecastTime = new Date(
        response.data.dt + response.data.timezone * 1000
      );
      console.log(forecastTime);
      console.log(response.data.main.temp);
      console.log(response.data.weather[0].description);
      console.log(response.data.wind.speed);
      console.log(response.data.main.humidity);

      currentWeather.innerHTML = `${Math.round(response.data.main.temp)} C°`;
      document.getElementById(
        "current-time"
      ).innerHTML = `Last Updated ${forecastTime.toLocaleString("en-us", {
        weekday: "long",
      })}, ${forecastTime.getHours()}:${forecastTime.getSeconds()}`;
      description.innerHTML = response.data.weather[0].description;
      speed.innerHTML = `Wind: ${response.data.wind.speed} Km/h`;
      humid.innerHTML = `Humidity: ${response.data.main.humidity} %`;
      weathericon.setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
      );
      weathericon.setAttribute("alt", response.data.weather[0].description);
    })

    .catch((error) => {
      console.log(error);
    });
}

let form = document.querySelector("#searchcity");
form.addEventListener("submit", search);
