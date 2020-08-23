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
let span = document.querySelector("#current-time");
span.innerHTML = `${days[day]} ${hr}:${min} `;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#inputcity");
  console.log(searchInput.value);
  let h4 = document.querySelector("h4");
  h4.innerHTML = `${searchInput.value}`;
  let description = document.querySelector("#weatherdescriptor");
  let speed = document.querySelector("#wind");
  let humid = document.querySelector("#precipitation");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=4a3d357424bef28614271bbf95c59986&&units=metric`;
  axios
    .get(apiUrl)
    .then(function (response) {
      console.log(response);
      console.log(response.data.main.temp);
      console.log(response.data.weather[0].description);
      console.log(response.data.wind.speed);
      console.log(response.data.main.humidity);

      span.innerHTML = `${days[day]} ${hr}:${min} Temperature:${Math.round(
        response.data.main.temp
      )}°C`;
      description.innerHTML = response.data.weather[0].description;
      speed.innerHTML = `${response.data.wind.speed} Km/h`;
      humid.innerHTML = `${response.data.main.humidity} %`;
    })

    .catch((error) => {
      console.log(error);
    });
}

let form = document.querySelector("#searchcity");
form.addEventListener("submit", search);
