function refreshWeather(response){
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#current-city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let speedElement = document.querySelector("#wind");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);

    timeElement.innerHTML = formatDate(date);
    speedElement.innerHTML = `${response.data.wind.speed}km/h`;
    humidityElement.innerHTML = `${response.data.temperature.humidity} %` ;
    descriptionElement.innerHTML = response.data.condition.description;
    cityElement.innerHTML = response.data.city ;
    temperatureElement.innerHTML = Math.round(temperature);
    
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


let searchFormElement = document.querySelector("#form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Amsterdam");