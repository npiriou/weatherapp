let apiUrl;
let city1, city2;

async function getWeather() {
  const response = await fetch(apiUrl);
  const data = await response.json();
  if (data.cod === "404")
    document.getElementById("text-404").style.visibility = "visible";
  else {
    document.getElementById("text-404").style.visibility = "hidden";

    const { description, icon } = data.weather[0];
    const tempC = Math.round(data.main.temp - 273.15);
    const name = data.name;

    document.getElementById("description").textContent = description;
    document.getElementById(
      "icon-container",
    ).innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png" />`;
    document.getElementById("temperature").textContent = `${tempC}°C`;
    document.getElementById(
      "title",
    ).textContent = `Quel temps fait il à ${name} ?`;
  }
}
getWeather();
document.getElementById("search-button").addEventListener("click", () => {
  const input = document.getElementById("input-city").value;
  if (input)
    apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${input}&APPID=${APIKEY}&lang=fr`;
  getWeather();
});
