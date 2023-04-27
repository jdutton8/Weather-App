var apiKey = 'cb0fb26fe05c92dfa0ba816b9520d228';

var BASE_URL = 'http://api.openweathermap.org/data/2.5/weather?q=';

var city = 'Towanda';

fetch(BASE_URL + city + '&appid=' + apiKey)
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

