function darkmode() {
  dark_Mode = localStorage.getItem("dark-mode");
  const element = document.querySelector(".darklight");
  const sec = document.querySelector(".sec");
  const toggle = document.querySelector(".toggle");
  sec.classList.toggle("dark");
  if (element.innerHTML === "Dark") {
    element.innerHTML = "Light";
  } else {
    element.innerHTML = "Dark";
  }
  if (dark_Mode !== "enable") {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
}

let dark_Mode = localStorage.getItem("dark-mode");

const enableDarkMode = () => {
  document.body.classList.add("dark-mode");
  localStorage.setItem("dark-mode", "enable");
};

const disableDarkMode = () => {
  document.body.classList.remove("dark-mode");
  localStorage.setItem("dark-mode", null);
};

if (dark_Mode === "enable") {
  document.querySelector(".sec").classList.toggle("dark");
}

function popup() {
  document.getElementById("popup-1").classList.toggle("active");
}

let weather = {
  apiKey: "21593729ed9c09d28674dcff6e9b81aa",
  fetchWeather: function (city) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey)
      .then((response) => {
        if (!response.ok) {
          alert("Data tidak ditemukan!");
          throw new Error("Data tidak ditemukan!");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    console.log(name, icon, description, temp, humidity, speed);
    document.querySelector(".city").innerText = "Cuaca di " + name;
    document.querySelector(".icon-weather").src = "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".desc").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText = "Kelembaban: " + humidity + "%";
    document.querySelector(".wind").innerText = "Kecepatan angin: " + speed + "km/h";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    weather.search();
  }
});

weather.fetchWeather("Bandung");
