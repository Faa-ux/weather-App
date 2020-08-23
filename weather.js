let now = new Date();
console.log(now.getDate());
console.log(now.getHours());
console.log(now.getMinutes());
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
console.log(days[now.getDay()]);
console.log(now.getFullYear());
let day = now.getDay();
let hr = now.getHours();
let min = now.getMinutes();
let time = document.querySelector("#current-time");
time.innerHTML = `${days[day]} ${hr}:${min} `;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#inputcity");
  console.log(searchInput.value);
  let geo = document.querySelector("#location");
  geo.innerHTML = `${searchInput.value}`;
  let description = document.querySelector("#weatherdescriptor");
  let speed = document.querySelector("#wind");
  let humid = document.querySelector("#precipitation");
  let weathericon = document.querySelector("#icon")
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=4a3d357424bef28614271bbf95c59986&&units=metric`;
  axios
    .get(apiUrl)
    .then(function (response) {
      console.log(response);
      console.log(response.data.main.temp);
      console.log(response.data.weather[0].description);
      console.log(response.data.wind.speed);
      console.log(response.data.main.humidity);
    
      time.innerHTML = `${days[day]} ${hr}:${min} Temperature:${Math.round(
        response.data.main.temp
      )}°C`;
      description.innerHTML = response.data.weather[0].description;
      speed.innerHTML = `Wind:${response.data.wind.speed} Km/h`;
      humid.innerHTML = `Humidity:${response.data.main.humidity} %`;
      weathericon.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`); 
      weathericon.setAttribute("alt", response.data.weather[0].description);
    })

    .catch((error) => {
      console.log(error);
    });
}

let form = document.querySelector("#searchcity");
form.addEventListener("submit", search);
