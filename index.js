const searchBoxFormElem = document.querySelector("#searchBoxForm");
const searchInputElem = document.querySelector("input[name='cityField']");
const searchButtonElem = document.getElementById("searchButton");
const resultsBoxElem = document.getElementById("results");

const API_KEY = "0f4787818e87af50f93fb91776c33d69";

async function fetchWeather(city) {
  const urlParams = new URLSearchParams({
    q: city,
    appid: API_KEY,
  }).toString();

  const res = await window.fetch(
    `https://api.openweathermap.org/data/2.5/weather?${urlParams}`
  );
  const data = await res.json();

  return data;
}

function printResults(results) {
  const { name: cityName, sys, main, wind } = results;
  const { country } = sys;
  const { speed } = wind;
  const { humidity, temp, pressure, feels_like } = main;

  const data = [
    { label: "Ciudad", value: `${cityName}, ${country}` },
    { label: "Temperatura", value: `${temp} Kelvin` },
    { label: "Sensación térmica", value: `${feels_like} Kelvin` },
    { label: "Humedad", value: `${humidity}%` },
    { label: "Velocidad Viento", value: `${speed} meter/sec` },
    { label: "Presión", value: `${pressure}` },
  ];

  resultsBoxElem.classList.remove("hide");

  data.forEach((item) => {
    resultsBoxElem.innerHTML += `
    <div class="weather-item">
      <p class="item-title">${item.label}</p>
      <p class="item-body">${item.value}</p>
    </div>`;
  });
}

searchBoxFormElem.addEventListener("submit", async (event) => {
  event.preventDefault();

  resultsBoxElem.classList.add("hide");
  resultsBoxElem.innerHTML = "";

  const { value: city } = searchInputElem;

  if (!city) {
    return;
  }

  const data = await fetchWeather(city);

  printResults(data);
});