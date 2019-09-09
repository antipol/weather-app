//NEEDED for currentTime.textContent
// import time from "./date.js"

const key = "&appid=7bf8fef284b729c9be430f727449ce1c";

const icon = document.querySelector(".icon");
const fahrenheit = document.querySelector(".imperial");
const celsius = document.querySelector(".celsius");
const city = document.querySelector(".city");
const country = document.querySelector(".country");
//In index.html no class called "wind", change to ".wind-unit"
const wind = document.querySelector(".wind-unit");
const humidity = document.querySelector(".humidity");
const currentTime = document.querySelector(".time");
const description = document.querySelector(".weather-description");

const days = document.querySelectorAll(".day");
const max = document.querySelectorAll(".max-temp");
const min = document.querySelectorAll(".min-temp");
const fToC = document.querySelectorAll(".fToC");

const locationArr = [];

// --------------------------------------------------------
export function getPosition() {
  navigator.geolocation.getCurrentPosition(position => {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    locationArr.push(lat);
    locationArr.push(long);
    write(locationArr);
  });
}


//You can delete this console log of locationArr
console.log(locationArr);

// ---------------------------------------------------------


export function search(e) {
  e.preventDefault();

  const proxy = "https://cors-anywhere.herokuapp.com/"; // enables cross-origin requests to anywhere
  const api = `${proxy}api.openweathermap.org/data/2.5/forecast?q=${e.target[0].value}${key}&units=imperial`;
  fetch(api) // get data from api
    .then(response => {
      return response.json(); // transform the data into json
    })

    // //not necessary
    // .then((
    //   data // get data
    // ) => console.log(data));


}

// ----------------------------------------------------------
// --- 5 days weather -> assigning data from Api to DOM -----
export function write(locationArr) {
  // getPosition();
  const maxDom = document.querySelectorAll(".max-temp");
  const minDom = document.querySelector(".min-temp");
  // const proxy = "https://cors-anywhere.herokuapp.com/"; // enables cross-origin requests to anywhere
  const api = `http://api.openweathermap.org/data/2.5/forecast?lat=${
    locationArr[0]
  }&lon=${locationArr[1]}${key}&units=imperial`;
  fetch(api) // get data from api
    .then(response => {
      return response.json(); // transform the data into json
    })
    .then(data => {
      // get specific data
      const maxTemp = data.list.filter(
        item => item.dt_txt.split(" ")[1] === "15:00:00"
      );
      for (let i = 0; i < maxTemp.length; i++) {
        maxDom[i].textContent = maxTemp[i].main.temp_max;
      }


      //delete this console log
      console.log(data);


      // connect the weather info of the api to the DOM Elements :))
      icon.src = `http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;
      fahrenheit.textContent = (
        parseFloat(data.list[0].main.temp_max * 1.8) + 32
      ).toFixed(0);
      celsius.textContent = parseFloat(data.list[0].main.temp_max).toFixed(0);
      city.textContent = data.city.name.split(" ")[0];
      country.textContent = data.city.country;
      wind.textContent = data.list[0].wind.speed;
      humidity.textContent = data.list[0].main.humidity;
      //get time in date.js ans export / import that function before using it
      currentTime.textContent = time;
      description.textContent = data.list[0].weather[0].description;
    });
}

// --- imperial to celsius toggle -> w3schools toggle switch/check checkbox
// if button got slide to the right (change position to the right) -> than we are on position 'checked'
// const celsius = (temperature - 32) * (5 / 9);
// fahrenheitCelsiusBtn.addEventListener("change", function() {
//   if (fahrenheitCelsiusBtn.checked) {
//     temperatureUnit.textContent = " °C";
//     temperatureDigit.textContent = celsius.toFixed();
//   } else {
//     temperatureUnit.textContent = " °F";
//     temperatureDigit.textContent = temperature.toFixed();
//   }
// });
