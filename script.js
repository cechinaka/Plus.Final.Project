function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  let apiKey = "b8bt1eedc53a49e91cf7bb6aob435022";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayNew);
}

function displayNew(response) {
  let temperatureElement = document.querySelector("#tempNow");
  let temperature = Math.round(response.data.temperature.current);
  temperatureElement.innerHTML = temperature;

  let cityElement = document.querySelector("#cityNow");
  let citySearch = response.data.city;
  cityElement.innerHTML = citySearch;

  let weatherConditions = document.querySelector("#conditionsDescription");
  let conditions = response.data.condition.description;
  weatherConditions.innerHTML = conditions;

  let weatherIcon = document.querySelector("#icon");
  let currentIcon = response.data.condition.icon_url;
  weatherIcon.innerHTML = currentIcon;

  let humidityElement = document.querySelector("#humidityNow")
  let humidity = Math.round(response.data.temperature.humidity);
  humidityElement.innerHTML = humidity;

  let windSpeedElement = document.querySelector("#windNow");
  let windSpeed = response.data.wind.speed;
  windSpeedElement.innerHTML = windSpeed;

  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon" />`;

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
  minutes = `0${minutes}`;
  }

  if (hours < 10) {
  hours = `0${hours}`;
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

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateElement = document.querySelector("#current-date");
let dateNow = new Date();

currentDateElement.innerHTML = formatDate(dateNow);

function startingCity(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Honolulu&key=b8bt1eedc53a49e91cf7bb6aob435022&units=imperial`;
  axios.get(apiUrl).then(displayNew);
}

startingCity("Honolulu");

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "b8bt1eedc53a49e91cf7bb6aob435022";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index <5) {forecastHtml = forecastHtml + 
      `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>
          <img src = "${day.condition.icon_url}" class="weather-forecast-icon" />
          <div class="weather-forecast-temperatures">
            <div class="weather-forecast-temp">${Math.round(day.temperature.minimum)}°</div>
            <div class="weather-forecast-temp">${Math.round(day.temperature.maximum)}°</div>
          </div>
        </div>
      </div>
    `;
    }
  });


let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = forecastHtml;
}

displayForecast();