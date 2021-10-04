// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

const API_URL = 'https://api.openweathermap.org/data/2.5/onecall?lat=42&lon=110&units=metric';

const API_KEY = '&appid=678e15a5b6ce81b4c3b54e6c6e9d47e9';

let url = API_URL + API_KEY;






let weatherData;
window.addEventListener('load', function(){
    fetch(url)
        .then(response => response.json())
        .then(data =>{
    weatherData = data;
    console.log(weatherData);

    let temperature = document.getElementById('temp');
    temperature.innerHTML = weatherData.current.temp + ' °C';

    let weather = document.getElementById('weather');
    weather.innerHTML = weatherData.current.weather[0].description;

    let windSpeed = document.getElementById('wind_speed');
    windSpeed.innerHTML = 'Wind Speed: ' + weatherData.current.wind_speed + ' meter/sec';

    let sunRise = document.getElementById('sunRise');
    sunRise.innerHTML = 'Sunrise at ' + weatherData.current.sunrise;

    let sunSet = document.getElementById('sunSet');
    sunSet.innerHTML = 'Sunset at ' + weatherData.current.sunset;

    let humidity = document.getElementById('hum');
    humidity.innerHTML = 'Humidity: ' + weatherData.current.humidity + '%';

    let moon = document.getElementById('moon_state');
    let moonPhase;
    moonPhaseNum = weatherData.daily[0].moon_phase;

    //since the moonstate given by the weather API is represented in numbers, so I have to set individual cases for different states of the moon, thus the nested if statements below. 0 and 1 are 'new moon', 0.25 is 'first quarter moon', 0.5 is 'full moon' and 0.75 is 'last quarter moon'. The periods in between are called 'waxing crescent', 'waxing gibous', 'waning gibous', and 'waning crescent', respectively.

    if(moonPhaseNum == 1 || moonPhaseNum == 0){
        moonPhase = 'New Moon';
    }
    if(moonPhaseNum = 0.25){
        moonPhase = 'first quarter moon';
    }
    if(moonPhaseNum = 0.5){
        moonPhase = 'full moon';
    }
    if(moonPhaseNum = 0.75){
        moonPhase = 'last quarter moon';
    }
    if(moonPhaseNum > 0 && moonPhaseNum < 0.25){
        moonPhase = 'waxing crescent';
    }
    if(moonPhaseNum > 0.25 && moonPhaseNum < 0.5){
        moonPhase = 'waxing gibous';
    }
    if(moonPhaseNum > 0.5 && moonPhaseNum < 0.75){
        moonPhase = 'waning gibous';
    }
    if(moonPhaseNum > 0.75 && moonPhaseNum < 1){
        moonPhase = 'waning crescent';
    }

    moon.innerHTML = moonPhase;

    //to make sure we can get access to data anywhere in our code
    astroData = data;
    
    })
});


/*----------p5 Code----------*/

let astroData;

function setup(){
    console.log('setUp!!')
    createCanvas(600,400);
    background(200,80,110);
}
function draw(){

    //to make sure that this action is run after astrodata is loaded.
    if(astroData){
        for(let i=0;i<astroData.current.humidity; i++){
            ellipse(100+(i * 50),300,30);
        }
    }else{
        console.log('Not Ready Yet!')
    }

    
}










//     let buttonPrev= document.getElementById('prevButton');
//     let buttonNext= document.getElementById('nextButton');
//     let number = 3;
    

//     buttonNext.addEventListener('click', function(){
//         number++;
        
//         // fetch("weather.json")
//         // .then(response => response.json())
//         // .then(data =>{
            
//             let weatherArray = weatherData.days;
//             if(number==weatherArray.length){
//                 alert("Exceeds range given!!");
                
//             }else{
                
//                 // console.log(weatherArray[number])
            
           

            

            

          

            
