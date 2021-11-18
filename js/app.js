const choose = document.querySelector('.choose');
const section = document.querySelector('section');

function getWeekDay(date) {
    let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    return days[date.getDay()];
  }

let date = new Date()
document.querySelector('.day').innerHTML = getWeekDay(date);

const cities = {
    498817: "Saint Petersburg",
    1496747: "Novosibirsk",
    1486209: "Yekaterinburg",
    524894: "Moscow",
    520555: "Nizhniy Novgorod",
    551487: "Kazan",
    1508291: "Chelyabinsk",
    1496153: "Omsk",
    499099: "Samara",
    501175: "Rostov-na-Donu",
    479561: "Ufa",
    1502026: "Krasnoyarsk"
}

function createSelect(){
    let select = document.createElement('select');
    select.id = 'city';
    choose.appendChild(select);
 
    for(let key in cities){
        let option = document.createElement('option');
        select.appendChild(option);
        option.value = key;
        option.innerHTML = cities[key];
    }     
}
createSelect()
const feel = document.createElement('div');
    feel.classList.add('feel');
    choose.append(feel);

const param = {
	"url": "https://api.openweathermap.org/data/2.5/",
	"appid": "459f68c624f3b00df3e8d1194383e81c"
}

function getWeather() {
	const cityId = document.querySelector('#city').value;
    //console.log(cityId)
	fetch(`${param.url}weather?id=${cityId}&units=metric&APPID=${param.appid}`)
	.then(weather => {
			return weather.json();
		}).then(showWeather);;
}

function showWeather(data){
    console.log(data)
//погода
    feel.textContent= `${data.weather[0].description}.`;
//иконка
    const iconWeather = document.querySelector('.icon_weather');
    const linkWeather = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    iconWeather.setAttribute('src',linkWeather);
//температура
    const degree = document.querySelector('.degree');
    degree.innerHTML = `${Math.round(data.main.temp)} &degC`
//ощущется температура
    const feelDegree = document.querySelector('.degree_feel');
    feelDegree.innerHTML = `Feels like: ${Math.round(data.main.feels_like)} &degC`
//скорость ветра
    const windSpeed = document.querySelector('.wind_speed');
    windSpeed.innerHTML = `${data.wind.speed}, m/s`;
//иконка ветра
    const windIcon= document.querySelector('.wind_icon');
   const linkWindIcon = 'https://www.clipartmax.com/png/full/327-3273369_wind-png-for-free-download-on-wind-icon-png.png';
    windIcon.style.width = '15px'
    windIcon.setAttribute('src', linkWindIcon);
//иконка влажности
    const humidityIcon = document.querySelector('.humidity_icon');
    const linkHumidity = 'https://cdn-icons-png.flaticon.com/512/4005/4005757.png';
    humidityIcon.style.width = '15px'
    humidityIcon.setAttribute('src', linkHumidity);
//влажность
    const humiditySpeed = document.querySelector('.humidity_percent')
    humiditySpeed.innerHTML = `${data.main.humidity}, %`
//восход
    const sunrise = document.querySelector('.sunrise_time');
    sunriseTime = `${data.sys.sunrise}`
    let sunriseObj = new Date(sunriseTime*1000);
    
    let hour = sunriseObj.getHours();
    let minite = sunriseObj.getMinutes();

    let timeSunrise = `${hour}:${minite}`
    sunrise.innerHTML = `${timeSunrise}`;

//закат
    const sunset = document.querySelector('.sunset_time');
    sunsetTime = `${data.sys.sunset}`
    let sunsetObj = new Date(sunsetTime*1000);

    let hour_2 = sunsetObj.getHours();
    let minite_2 = sunsetObj.getMinutes();

    let timeSunset = `${hour_2}:${minite_2}`
    sunset.innerHTML = `${timeSunset}`;
}

getWeather();
document.querySelector('#city').onchange = getWeather;
//document.querySelector('#city') = showWeatherDays;


