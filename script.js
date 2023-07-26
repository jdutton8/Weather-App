var apiKey = 'cb0fb26fe05c92dfa0ba816b9520d228';

function getCoordinates(city) {
	var coordinateUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + encodeURI(city) + "&limit=1&appid=" + apiKey;
	fetch(coordinateUrl)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			getWeather(data[0].lat, data[0].lon);
		}).catch(function() {
			alert("Invalid city name. Please try again.");
		});
}

function getWeather(lat, lon) {
	var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial";

	fetch(weatherUrl)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			$("#cityName").text(data.name + " " + dayjs().format("M/D/YYYY"));
			$("#icon").attr("src", "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png");
			$("#temp").text("Temp: " + data.main.temp + " \xB0F");
			$("#wind").text("Wind: " + data.wind.speed + " MPH");
			$("#humidity").text("Humidity: " + data.main.humidity + "%");
			getForecast(lat, lon);
		});
}

function getForecast(lat, lon) {
	var weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial";

	fetch(weatherUrl)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			var counter = 1;
			for (var i=4; i<=36; i=i+8) {
				var forecastDay = data.list[i];
				$("#day"+counter).text(dayjs().add(counter, 'day').format("M/D/YYYY"));
				$("#icon"+counter).attr("src", "http://openweathermap.org/img/wn/" + forecastDay.weather[0].icon + "@2x.png");
				$("#temp"+counter).text("Temp: " + forecastDay.main.temp + " \xB0F");
				$("#wind"+counter).text("Wind: " + forecastDay.wind.speed + " MPH");
				$("#humidity"+counter).text("Humidity: " + forecastDay.main.humidity + "%");
				counter++;
			}
		});
}

//gets and saves to local storage
var searchHistory = JSON.parse(localStorage.getItem("search"));
if (searchHistory == null) { 
	searchHistory = [];
}
function displaySearchHistory() {
	$("#searchList").empty();
    if(searchHistory.length >= 5) {
        searchHistory.splice(5);
    }
	for(var i=0; i<searchHistory.length; i++) {
		var newBtn = $("<button></button>").text(searchHistory[i]);
		newBtn.attr("type", "button");
		newBtn.attr("class", "btn btn-secondary mt-2 historyBtn");
		$("#searchList").append(newBtn);
	}
}

function handleHistorySearch(event) {
	event.preventDefault();
	getCoordinates($(this).text())
}
$("#citySearch").on( "submit", function(event) {
	event.preventDefault();
	searchHistory.unshift($("#city").val());
	localStorage.setItem("search", JSON.stringify(searchHistory));
  getCoordinates($("#city").val());
	displaySearchHistory();
} );

$('#searchList').on('click', '.historyBtn', handleHistorySearch);

displaySearchHistory();