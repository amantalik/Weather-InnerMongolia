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
    windSpeed.innerHTML = 'Wind Speed: ' + weatherData.current.wind_speed + ' meters/sec';

    let sunRise = document.getElementById('sunRise');
    sunRise.innerHTML = 'Sunrise at ' + weatherData.current.sunrise;

    UNIX_timestamp = weatherData.current.sunrise;
    
    function timeConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
        return time;
      }
      console.log(timeConverter(0));
    

    let sunSet = document.getElementById('sunSet');
    sunSet.innerHTML = 'Sunset at ' + weatherData.current.sunset;

    let humidity = document.getElementById('hum');
    humidity.innerHTML = 'Humidity: ' + weatherData.current.humidity + '%';

    let moon = document.getElementById('moon_state');
    let moonPhase;
    moonPhaseNum = weatherData.daily[0].moon_phase;

    let imageElement = document.getElementById('p-img');

    // var windSound = new Audio("windSound.mp3");
    // windSound.play();
    // var windSound = document.getElementById("foobar");
    // windSound.play();  
    



    //since the moonstate given by the weather API is represented in numbers, so I have to set individual cases for different states of the moon, thus the nested if statements below. 0 and 1 are 'new moon', 0.25 is 'first quarter moon', 0.5 is 'full moon' and 0.75 is 'last quarter moon'. The periods in between are called 'waxing crescent', 'waxing gibous', 'waning gibous', and 'waning crescent', respectively.

    if(moonPhaseNum == 1 || moonPhaseNum == 0){
        moonPhase = 'New Moon';
        imageElement.src = 'NewMoon.png';
    }
    if(moonPhaseNum = 0.25){
        moonPhase = 'first quarter moon';
        imageElement.src = 'FirstQuarter.png';
    }
    if(moonPhaseNum = 0.5){
        moonPhase = 'full moon';
        imageElement.src = 'fullMoon.png';
    }
    if(moonPhaseNum = 0.75){
        moonPhase = 'last quarter moon';
        imageElement.src = 'LastQuarter.png';
    }
    if(moonPhaseNum > 0 && moonPhaseNum < 0.25){
        moonPhase = 'waxing crescent';
        imageElement.src = 'WaxingCrescent.png';
    }
    if(moonPhaseNum > 0.25 && moonPhaseNum < 0.5){
        moonPhase = 'waxing gibous';
        imageElement.src = 'WaxingGibbous.png';
    }
    if(moonPhaseNum > 0.5 && moonPhaseNum < 0.75){
        moonPhase = 'waning gibous';
        imageElement.src = 'WanningGibbus.png';
    }
    if(moonPhaseNum > 0.75 && moonPhaseNum < 1){
        moonPhase = 'waning crescent';
        imageElement.src = 'Wanning Crescent.png';
    }

    moon.innerHTML = moonPhase;

    //to make sure we can get access to data anywhere in our code
    astroData = data;
    
    })
});


/*----------p5 Code----------*/

let astroData;
var stars = [];
var speed;
let windSound;

// function preload(){
//     windSound = loadSound("windSound.mp3");
    
// }


function setup(){
    console.log('setUp!!')
    createCanvas(windowWidth, windowHeight);
    for (var i = 0; i < 800; i++) {
        stars[i] = new Star();
      }
    //   windSound.play();
    //   createSlider(10,100,47);

}
function draw(){

    //to make sure that this action is run after astrodata is loaded.
    if(astroData){
        
          speed = map(mouseX, 0, width, 0.5, 2);
          background(0);
          translate(width / 2, height / 2);
          for (var i = 0; i < stars.length; i++) {
            stars[i].update();
            stars[i].show();
          }
          
        
    }else{
        console.log('Not Ready Yet!')
    }
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
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
            
           

            

            

          

            
