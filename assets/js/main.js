const app = document.querySelector(".weather-app"),
  temp = document.querySelector(".temp"),
  icon = document.querySelector(".icon"),
  dateOutput = document.querySelector(".date"),
  timeOutput = document.querySelector(".time"),
  conditionOutput = document.querySelector(".condition"),
  nameOutput = document.querySelector(".name"),
  cloudOutput = document.querySelector(".cloud"),
  humidityOutput = document.querySelector(".humidity"),
  windOutput = document.querySelector(".wind"),
  form = document.querySelector("#locationInput"),
  search = document.querySelector(".search"),
  btn = document.querySelector(".submit"),
  cities = document.querySelectorAll(".city");

// Para fixear la diferencia de altura de pantalla en mobile
// cuando se abre/cierra el menu del navegador (en iOS/Android)
const appHeight = () => {
  const vh = window.innerHeight * 0.01;
  this.document.documentElement.style.setProperty("--vh", `${vh}px`);
};
window.addEventListener("resize", appHeight);

appHeight();

//Ciudad por defecto cuando carga la pagina
let cityInput = "Rosario";

//Ocultamos la app
app.style.opacity = "0";

//Agregamos evento click a cada ciudad en el panel
cities.forEach((city) => {
  //Cuando se hace click en una ciudad
  city.addEventListener("click", (e) => {
    //Cambiamos el nombre de la ciudad por la que se hizo click
    cityInput = e.target.innerHTML;

    //Llamamos a la funcion que hace la peticion a la API
    fetchWeatherData();

    //Ocultamos la app
    app.style.opacity = "0";
  });
});

//Agregamos evento submit del form
form.addEventListener("submit", (e) => {
  //Prevenimos que se recargue la pagina al hacer submit
  e.preventDefault();

  //Si el input esta vacio
  if (search.value.length == 0) {
    alert("Debe ingresar el nombre de una Ciudad");
  }

  //Si el input no esta vacio
  else {
    //Cambiamos el nombre de la ciudad por la que se hizo click
    cityInput = search.value;

    //Llamamos a la funcion que hace la peticion a la API
    fetchWeatherData();

    //Borramos el valor del input
    search.value = "";

    //Ocultamos la app
    app.style.opacity = "0";
  }
});

//Funcion de fechas
function dayOfTheWeek(day, month, year) {
  //Creamos un array con los dias de la semana
  const weekday = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];

  //Retornamos el dia de la semana, pasando como parametro los valores que recibe la funcion
  let date = new Date(year, month, day);
  let dayNumber = date.getDay();
  return weekday[dayNumber];
}

//Funcion de fetch a la API
function fetchWeatherData() {
  fetch(`https://guidopellegriniweatherbackend.bsite.net/weather/get-weather/${cityInput}`)
    .then((response) => response.json())
    .then((data) => {
      //Mostramos la temperatura
      temp.innerHTML = data.current.temp_c + "&#176;";

      //Mostramos la condicion
      conditionOutput.innerHTML = data.current.condition.text;

      //Obtenemos la fecha y hora actual de la ciudad
      let date = data.location.localtime;

      //Obtenemos la hora, dia, mes y año
      let hours = date.substring(11, 16);
      let day = date.substring(8, 10);
      let month = date.substring(5, 7);
      let year = date.substring(0, 4);

      //Reformateamos y mostramos la fecha
      dateOutput.innerHTML = `${dayOfTheWeek(day, month, year)} ${day}/${month}/${year}`;

      //Mostramos el nombre de la ciudad
      nameOutput.innerHTML = data.location.name;

      //Mostramos la hora
      timeOutput.innerHTML = `${hours}`;

      // Mostramos el icono de la condicion
      const iconId = data.current.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length);

      icon.src = `assets/icons/${iconId}`;

      //Agregamos detalles
      cloudOutput.innerHTML = data.current.cloud + "%";
      humidityOutput.innerHTML = data.current.humidity + "%";
      windOutput.innerHTML = data.current.wind_kph + " km/h";

      //Establecemos el tiempo (dia o noche)
      let timeOfDay = "day";

      const code = data.current.condition.code;

      if (!data.current.is_day) {
        timeOfDay = "night";
      }

      //Tiempo: Clear
      if (code == 1000) {
        app.style.backgroundImage = `url('./assets/img/${timeOfDay}/clear.avif')`;

        btn.style.backgroundColor = "#e5ba92";

        if (timeOfDay == "night") {
          btn.style.backgroundColor = "#181e27";
        }
      }

      //Tiempo: Cloudy
      else if (
        code == 1003 ||
        code == 1006 ||
        code == 1009 ||
        code == 1030 ||
        code == 1069 ||
        code == 1087 ||
        code == 1135 ||
        code == 1273 ||
        code == 1276 ||
        code == 1279 ||
        code == 1282
      ) {
        app.style.backgroundImage = `url('./assets/img/${timeOfDay}/cloudy.avif')`;

        btn.style.backgroundColor = "#fa6d1b";

        if (timeOfDay == "night") {
          btn.style.backgroundColor = "#181e27";
        }
      }

      //Tiempo: Rainy
      else if (
        code == 1063 ||
        code == 1069 ||
        code == 1072 ||
        code == 1150 ||
        code == 1153 ||
        code == 1180 ||
        code == 1183 ||
        code == 1186 ||
        code == 1189 ||
        code == 1192 ||
        code == 1195 ||
        code == 1204 ||
        code == 1207 ||
        code == 1240 ||
        code == 1243 ||
        code == 1246 ||
        code == 1249 ||
        code == 1252
      ) {
        app.style.backgroundImage = `url('./assets/img/${timeOfDay}/rainy.avif')`;

        btn.style.backgroundColor = "#647d75";

        if (timeOfDay == "night") {
          btn.style.backgroundColor = "#325c80";
        }
      }

      //Tiempo: Snowy
      else {
        app.style.backgroundImage = `url('./assets/img/${timeOfDay}/snowy.avif')`;

        btn.style.backgroundColor = "#4d72aa";

        if (timeOfDay == "night") {
          btn.style.backgroundColor = "#1b1b1b";
        }
      }

      //Mostramos la app
      app.style.opacity = "1";
    })
    .catch((error) => {
      alert("Ciudad no encontrada");

      //Mostramos la app
      app.style.opacity = "1";
    });
}

setTimeout(() => {
  //Llamamos a la funcion que hace la peticion a la API
  fetchWeatherData();
}, 1000);
