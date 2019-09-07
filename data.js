const key = "&appid=7bf8fef284b729c9be430f727449ce1c";
let long;
let lat;
const temperatureDigit = document.querySelector(".temperature-number");
const temperatureUnit = document.querySelector(".imperial-degree");
const locationTimezone = document.querySelector(".location-timezone");
const weatherDescription = document.querySelector(".weather-description");
const wind = document.querySelector(".wind");
const humidityScale = document.querySelector(".humidity-scale");
const fahrenheitCelsiusBtn = document.querySelector(".switch");
const currentTime = document.querySelector(".time");

export function getPosition() {
  navigator.geolocation.getCurrentPosition(position => {
    lat = position.coords.latitude;
    long = position.coords.longitude;

    const proxy = "https://cors-anywhere.herokuapp.com/"; // enables cross-origin requests to anywhere
    const api = `${proxy}api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}${key}&units=imperial`;
    fetch(api) // get data from api
      .then(response => {
        return response.json(); // transform the data into json
      })
      .then(data =>
        // get specific data

        write(data)
      );
  });
}

export function search(e) {
  e.preventDefault();

  //   const proxy = "https://cors-anywhere.herokuapp.com/"; // enables cross-origin requests to anywhere
  const api = `api.openweathermap.org/data/2.5/forecast?q=${e.target[0].value}${key}&units=imperial`;
  fetch(api) // get data from api
    .then(response => {
      return response.json(); // transform the data into json
    })
    .then(data =>
      // get specific data

      //   write(data)
      console.log(data)
    );
}
export function write(data) {
  const maxDom = document.querySelectorAll(".max-temp");
  weatherDescription.textContent = data.list[0].weather[0].description;
  const maxTemp = data.list.filter(
    item => item.dt_txt.split(" ")[1] === "15:00:00"
  );
  const minTemp = data.list.filter(
    item => item.dt_txt.split(" ")[1] === "03:00:00"
  );
  for (let i = 0; i < maxTemp.length; i++) {
    maxDom[i].textContent = maxTemp[i].main.temp_max;
  }
  // wind.textContent = windSpeed;
  // humidityScale.textContent = humidity;
}
//   // --- geo data determination and fetch
//   if (navigator.geolocation) {
//

//           // --- connect the weather info of the api to the DOM Elements :))

//           temperatureDigit.textContent = `${temperature.toFixed()}`; // textContent returns the full text
//           // console.dir(temperatureDigit);

//           locationTimezone.textContent = data.timezone;
//
//           currentTime.textContent = time;
//           // --- set/target weather icon
//           setIcons(icon, document.querySelector(".icon"));

//           // --- imperial to celsius toggle -> w3schools toggle switch/check checkbox
//           // if button got slide to the right (change position to the right) -> than we are on position 'checked'
//           const celsius = (temperature - 32) * (5 / 9);
//           fahrenheitCelsiusBtn.addEventListener("change", function() {
//             if (fahrenheitCelsiusBtn.checked) {
//               temperatureUnit.textContent = " °C";
//               temperatureDigit.textContent = celsius.toFixed();
//             } else {
//               temperatureUnit.textContent = " °F";
//               temperatureDigit.textContent = temperature.toFixed();
//             }
//           });
//           // --- f to c ending

//           // --- 5 days weather -> assigning data.daily.data[] from Api -> temperatureMax/temperatureMin to table
//           // -> better use map() or forEach()
//           for (let i = 0; i < data.list[0].clouds.data.length; i++) {
//             //console.log(data.daily.data[i].temperatureMax);
//             document.querySelector(
//               ".max-temp-today"
//             ).textContent = `${data.daily.data[0].temperatureMax} °F`;
//             document.querySelector(
//               ".max-temp-2nd"
//             ).textContent = `${data.daily.data[1].temperatureMax} °F`;
//             document.querySelector(
//               ".max-temp-3rd"
//             ).textContent = `${data.daily.data[2].temperatureMax} °F`;
//             document.querySelector(
//               ".max-temp-4th"
//             ).textContent = `${data.daily.data[3].temperatureMax} °F`;
//             document.querySelector(
//               ".max-temp-5th"
//             ).textContent = `${data.daily.data[4].temperatureMax} °F`;
//           }

//           // --- min-temp
//           for (let i = 0; i < data.daily.data.length; i++) {
//             //console.log(data.daily.data[i].temperatureMin);
//             document.querySelector(
//               ".min-temp-today"
//             ).textContent = `${data.daily.data[0].temperatureMin} °F`;
//             document.querySelector(
//               ".min-temp-2nd"
//             ).textContent = `${data.daily.data[1].temperatureMin} °F`;
//             document.querySelector(
//               ".min-temp-3rd"
//             ).textContent = `${data.daily.data[2].temperatureMin} °F`;
//             document.querySelector(
//               ".min-temp-4th"
//             ).textContent = `${data.daily.data[3].temperatureMin} °F`;
//             document.querySelector(
//               ".min-temp-5th"
//             ).textContent = `${data.daily.data[4].temperatureMin} °F`;
//           }
//         });
//       // --- ending .then(data) -> get specific data
//     });
//     // --- ending geo data determination and fetch

//     const checkStatus = response => {
//       if (response.ok) {
//         return Promise.resolve(response);
//       } else {
//         return Promise.reject(new Error(response.statusText));
//       }
//     };
//   }

//   // --- initiating the skycons library
//   function setIcons(icon, iconID) {
//     const skycons = new Skycons({ color: "white" });
//     const currentIcon = icon.replace(/-/g, "_").toUpperCase();
//     skycons.play();
//     return skycons.set(iconID, Skycons[currentIcon]);
//   }

// // --- window event ending
