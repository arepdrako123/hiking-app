let weather = {
  apiKey: "9fd7a449d055dba26a982a3220f32aa2",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity, pressure } = data.main;
    const { speed } = data.wind;
    const { deg } = data.wind;
 
    const { lon, lat } = data.coord;
    
    
    
    
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + " °C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + " g.m-3";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".direction").innerText = "Wind direction: "+ deg + " °";
   
    document.querySelector(".pressure").innerText = "Pressure: "+ pressure + " pa";
    document.querySelector(".longitude").innerText = "Longitude: "+ lon + " °";
    document.querySelector(".latitude").innerText = "Latitude: "+ lat + " °";
    
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Tokyo");