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

async function inputToCities(){
    // faire boucle for
    
    for (let i = 0; i < document.getElementsByClassName(`input-city`).length; i++) {
        if (document.getElementsByClassName(`input-city`)[i].value) {
            let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${document.getElementsByClassName(`input-city`)[i].value}&APPID=a33576c7bfd6ba221202c241d8cb8888&lang=fr`
           await  getWeather(apiUrl, i);
        }
    }
}


async function compare() {
    
   await inputToCities();

    if (cities.every(city => city)) {
        const diff = Math.round(cities[1].main.temp) - Math.round(cities[0].main.temp);
        const mess = diff == 0 ? `la même température` : diff > 0 ? `${diff} degrés de plus` : `${diff} degrés de moins`
        document.getElementById('title').textContent = `En ce moment il fait ${mess} à ${cities[1].name}`
    }
}

document.getElementById(`compare-button`).addEventListener('click', compare)


