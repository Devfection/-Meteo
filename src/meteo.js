function refreshWeather(response){
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#current-city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let speedElement = document.querySelector("#wind");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#icon");

    
    
    iconElement.innerHTML = `<img class="weather-app-icon" src="${response.data.condition.icon_url}">` ;
    timeElement.innerHTML = formatDate(date);
    speedElement.innerHTML = `${response.data.wind.speed}km/h`;
    humidityElement.innerHTML = `${response.data.temperature.humidity} %` ;
    descriptionElement.innerHTML = response.data.condition.description;
    cityElement.innerHTML = response.data.city ;
    temperatureElement.innerHTML = Math.round(temperature);
   getForecast(response.data.city);
}

function formatDate(date){
    let minutes = date.getMinutes();
    let hours  = date.getHours();
    let days = [
        "Sunday", 
        "Monday", 
        "Tuesday", 
        "Wednesday", 
        "Thursday", 
        "Friday", 
        "Saturday"
    ];
    let day = days[date.getDay()];
    if(minutes < 10){
        minutes = `0${minutes}`;
    }
    return ` ${day} ${hours}:${minutes},`;
}
function searchCity(city){
    let apiKey = "61ff3ct11d507f83e0fcob41d8ed7a85";
  let units = "metric";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`; 
    axios.get(apiURL).then(refreshWeather);
}
function handleSearchSubmit(event){
  event.preventDefault();
  let searchInput = document.querySelector("#search-form");
    
  searchCity(searchInput.value)
  }

function formatDay(timestamp){
  let date= new Date (timestamp * 1000 );
  let days = ["Sun", 
        "Mon", 
        "Tue", 
        "Wed", 
        "Thu", 
        "Fri", 
        "Sat"];
        return days[date.getDay()];
}

function displayForecast(response){
  console.log(response.data);
  let forecastHtml = "";
    
  response.data.daily.forEach(function (day, index){
    if(index< 5){
        forecastHtml  = 
            forecastHtml +
            `
            <div class="forecast-day">  
            <div class="weather-forecast-day"> ${formatDay(day.time)} </div>
            <div><img class="weather-forecast-icon" src="${day.condition.icon_url}">  </div>
            <div class="weather-forecast-temperatures">
            <div class="weather-forecast-temperature-max"> <strong>${Math.round(day.temperature.maximum)}°C </strong>
            </div>
            <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}°C
            </div>
              </div>
            </div>
            `;
            }
  }) ;
  let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
}

function getForecast(city){
  let apiKey = "61ff3ct11d507f83e0fcob41d8ed7a85";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
};


let searchFormElement = document.querySelector("#form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
searchCity("Amsterdam");


function changeTheme() {
                let body = document.querySelector("body");
                document.body.classList.toggle("dark")}
let themeButton = document.querySelector(".theme-Button");
 let themeChangeElement = document.querySelector("#theme-changer");
themeChangeElement.addEventListener("click", changeTheme);