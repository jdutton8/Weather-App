var apiKey = 'cb0fb26fe05c92dfa0ba816b9520d228';

var BASE_URL = 'http://api.openweathermap.org/data/2.5/forecast?q=';

var city = 'Towanda';


function getCurrentWeather(){
    fetch(BASE_URL + city + '&appid=' + apiKey + '&units=imperial')

    .then(function(res){
        if(!res.ok) throw new Error('ooops');

        return res.json();
    })
    .then(function(data){
        console.log('data :>>', data);
    })
    .catch(function(error){
        console.error(error);
    });
}

