let cities = [null, null];
async function getWeather(url, num) {
    const response = await fetch(url)
    const data = await response.json()

    if (data.cod === '404') document.getElementById('text-404').style.visibility = 'visible'
    else {
        document.getElementById(`text-404-${num}`).style.visibility = 'hidden'
        cities[num] = data;
        document.getElementById(`text-found-${num}`).textContent = `Ville trouvée : ${data.name}`;
    }
}

async function inputToCities() {
    // faire boucle for

    for (let i = 0; i < document.getElementsByClassName(`input-city`).length; i++) {
        if (document.getElementsByClassName(`input-city`)[i].value) {
            let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${document.getElementsByClassName(`input-city`)[i].value}&APPID=a33576c7bfd6ba221202c241d8cb8888&lang=fr`
            await getWeather(apiUrl, i);
        }
    }
}


async function compare() {

    await inputToCities();

    if (cities.every(city => city)) {
        const temp0 = Math.round(cities[0].main.temp - 273.15)
        const temp1 = Math.round(cities[1].main.temp - 273.15)
   
        const diff = temp1 - temp0;
        const mess = diff == 0 ? `la même température` : diff > 0 ? `${diff} degrés de plus` : `${Math.abs(diff)} degrés de moins`


        document.getElementById('title').textContent = `En ce moment il fait ${mess} à ${cities[1].name}`
        document.getElementById('description').textContent = `Il fait ${temp0}°C à ${cities[0].name} et ${temp1}°C à ${cities[1].name}.`
    }
}

document.getElementById(`compare-button`).addEventListener('click', compare)


