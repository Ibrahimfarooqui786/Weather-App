const apiKey = "94b624328ea0d0b0710e4e51987fd00f";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

const cityEl = document.querySelector(".city");
const tempEl = document.querySelector(".temperature");
const conditionEl = document.querySelector(".condition");
const humidityEl = document.querySelector(".humidity");
const windEl = document.querySelector(".wind");
const noteEl = document.querySelector(".note");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city === "") {
    noteEl.textContent = " Please enter a city name";
    return;
  }
  getWeather(city);
});

async function getWeather(city) {
  try {
    noteEl.textContent = "Loading weather data...";

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    cityEl.textContent = data.name;
    tempEl.textContent = `${Math.round(data.main.temp)}°C`;
    conditionEl.textContent = data.weather[0].description;
    humidityEl.textContent = `${data.main.humidity}%`;
    windEl.textContent = `${data.wind.speed} km/h`;

    noteEl.textContent = "Weather updated successfully";
  } catch (error) {
    noteEl.textContent = "City not found. Try again.";
  }
}