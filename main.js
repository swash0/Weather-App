const API_KEY = "37bf3d4cb6b7abaed18fc592fedfe21f";
const weatherCard = document.querySelector(".weather-card");
const city = document.querySelector(".city");
const country = document.querySelector(".country");
const icon = document.querySelector(".icon");
const description = document.querySelector(".description");
const temp = document.querySelector(".temp");
const feelsLike = document.querySelector(".feels-like");
const form = document.querySelector("form");
const input = document.querySelector("input");

async function getCurrentWeather(cityName) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching current weather:", error);
    throw error;
  }
}

async function updateWeather(cityName) {
  try {
    const data = await getCurrentWeather(cityName);
    console.log(data);
    city.textContent = data.name;
    country.textContent = data.sys.country;
    icon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    description.textContent = data.weather[0].description;
    temp.textContent = `Temperature: ${data.main.temp}°C`;
    feelsLike.textContent = `Feels like: ${data.main.feels_like}°C`;
    weatherCard.style.display = "block";
  } catch (error) {
    console.error("Error updating weather:", error);
    weatherCard.style.display = "none";
    alert("Could not retrieve weather data. Please try again later.");
  }
}

//prevent default value
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityName = input.value;
  updateWeather(cityName);
});

// Updateweather when page loads
window.addEventListener("load", () => {
  const cityName = "Kathmandu";
  updateWeather(cityName);
});

