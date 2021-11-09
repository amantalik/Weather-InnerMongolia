// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
//Ref: Daniel Shiffman Coding Train tutorials on creating a starfield n resizing p5 sketch as a background.
// https://www.youtube.com/watch?v=17WoOqgXsRM&list=PLdIowMufw5k9IawKExlslW80jwVYb5bER
// https://www.youtube.com/watch?v=OIfEHD3KqCg


const API_URL = 'https://api.openweathermap.org/data/2.5/onecall?lat=42&lon=110&units=metric';

const API_KEY = '&appid=678e15a5b6ce81b4c3b54e6c6e9d47e9';

let url = API_URL + API_KEY;

let weatherData;


window.addEventListener('load', function(){
    // assign roles to different buttons
    document.getElementById('record-button').addEventListener('click',()=> {
        let travelRecord = document.getElementById('travel-note').value;
        console.log(travelRecord);
        
        //creating objects, 
        let obj = {"comment": travelRecord};

        //clear the input after message is logged
        document.getElementById('travel-note').value = ""
        
        // stringify the objects
        let jsonData = JSON.stringify(obj);


        //fech the travelRecord
        fetch('/travelRecord', {
            method:'POST',
            headers: {
                "Content-type": "application/json"
            },
            body:jsonData
        })
        .then(response => response.json())
        .then(data => {console.log(data)});
    })

    //get info on All the travel status WHEN BUTTON IS CLICKED
    document.getElementById('get-tracker').addEventListener('click', ()=> {
        fetch('/getTravelRecord')
        .then(response =>response.json())
        .then(data => {
            document.getElementById('travel-info').innerHTML = '';
            console.log(data.data);
            for(let i=0; i<data.data.length; i++){
                let string = data.data[i].date + ' : ' + data.data[i].record.comment;

                //create a button element that resembles a star every time a new travel data is logged in
                let elt = document.createElement('button');
                elt.className += "button_star"

                //assign some CSS properties to the stars
                elt.style.position ='absolute'; 
                let radius = getRandomInt(12,24);

                elt.style.height = radius + "px";
                elt.style.width = radius + "px";
                elt.style.background = '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6)
                elt.style.top = Math.floor((Math.random() * 1000) + 1) + "px";
                elt.style.left = Math.floor((Math.random() * 1200) + 1) + "px";
                let buttonX = elt.style.top;
                let buttonY = elt.style.left;
                console.log("button X:" + buttonX);
                console.log("button Y:" + buttonY);

                document.body.appendChild(elt);
                // elt.innerHTML = string;
                // document.getElementById('travel-info').appendChild(elt);

                //show a travel info when mouse hovers over a star
                elt.addEventListener("mouseenter",()=> {
                   console.log("star hovered");
                    let string = data.data[i].date + ' : ' + data.data[i].record.comment;
                    let elt = document.createElement('p');
                    elt.innerHTML = string;
                    let travelInfo = document.getElementById('travel-info');
                    travelInfo.appendChild(elt);
                    travelInfo.style.top = buttonX;
                    travelInfo.style.left = buttonY;
                    travelInfo.style.position = "fixed";

                    travelInfo.style.color = "aliceblue"

                    // elt.style.top = buttonX;
                    // elt.style.left = buttonY;
                    // elt.style.position = "absolute";
                    // elt.style.color = "aliceblue"
                    console.log("travel-info Pos: " + travelInfo.style.top);
                } )
                //when the mouse leaves the star, the travel info disappear.
                elt.addEventListener("mouseleave", ()=> {
                    document.getElementById('travel-info').innerHTML = '';
                });
                
            }
        })
    })
    
    

    //get a random message from the DB storage when mouse is hovered over a star

    
    fetch(url)
        .then(response => response.json())
        .then(data =>{
    weatherData = data;
    // console.log(weatherData);

    //load in each weather info

    let temperature = document.getElementById('temp');
    temperature.innerHTML = weatherData.current.temp + ' °C';

    let weather = document.getElementById('weather');
    weather.innerHTML = weatherData.current.weather[0].description;

    let windSpeed = document.getElementById('wind_speed');
    windSpeed.innerHTML = 'Wind Speed: ' + weatherData.current.wind_speed + ' meters/sec';

    //turn timestamp into human readable time
    timestampRise = (weatherData.current.sunrise *1000);
    var timeRise = new Date(timestampRise).toTimeString();
    // console.log(timeRise);
    let sunRise = document.getElementById('sunRise');
    sunRise.innerHTML = 'Sunrise at ' + timeRise;

    //turn timestamp into human readable time
    timestampSet = (weatherData.current.sunset *1000);
    var timeSet = new Date(timestampSet).toTimeString();
    let sunSet = document.getElementById('sunSet');
    sunSet.innerHTML = 'Sunset at ' + timeSet;

    let humidity = document.getElementById('hum');
    humidity.innerHTML = 'Humidity: ' + weatherData.current.humidity + '%';

    let moon = document.getElementById('moon_state');
    let moonPhase;
    moonPhaseNum = weatherData.daily[0].moon_phase;

    //load in image
    let imageElement = document.getElementById('p-img');

    //audio plays when button is pressed
    let button = document.getElementById('audioButton');
    button.addEventListener('click', function(){
        // console.log("clicked");
        var windSound = new Audio("assets/windSound.mp3");
        windSound.play();
    })

    // 
    // var windSound = document.getElementById("foobar");
    // windSound.play();  


    //since the moonstate given by the weather API is represented in numbers, so I have to set individual cases for different states of the moon, thus the nested if statements below. 0 and 1 are 'new moon', 0.25 is 'first quarter moon', 0.5 is 'full moon' and 0.75 is 'last quarter moon'. The periods in between are called 'waxing crescent', 'waxing gibous', 'waning gibous', and 'waning crescent', respectively.

    if(moonPhaseNum == 1 || moonPhaseNum == 0){
        moonPhase = 'New Moon';
        imageElement.src = 'assets/NewMoon.png';
    }
    if(moonPhaseNum == 0.25){
        moonPhase = 'first quarter moon';
        imageElement.src = 'assets/FirstQuarter.png';
    }
    if(moonPhaseNum == 0.5){
        moonPhase = 'full moon';
        imageElement.src = 'assets/fullMoon.png';
    }
    if(moonPhaseNum == 0.75){
        moonPhase = 'last quarter moon';
        imageElement.src = 'assets/LastQuarter.png';
    }
    if(moonPhaseNum > 0 && moonPhaseNum < 0.25){
        moonPhase = 'waxing crescent';
        imageElement.src = 'assets/WaxingCrescent.png';
    }
    if(moonPhaseNum > 0.25 && moonPhaseNum < 0.5){
        moonPhase = 'waxing gibous';
        imageElement.src = 'assets/WaxingGibbous.png';
    }
    if(moonPhaseNum > 0.5 && moonPhaseNum < 0.75){
        moonPhase = 'waning gibous';
        imageElement.src = 'assets/WanningGibbus.png';
    }
    if(moonPhaseNum > 0.75 && moonPhaseNum < 1){
        moonPhase = 'waning crescent';
        imageElement.src = 'assets/Wanning Crescent.png';
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

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
      }

function setup(){
    // console.log('setUp!!')
    createCanvas(windowWidth, windowHeight);
    // canvas.position(0,0);
    // canvas.style('z-index','-1');
    for (var i = 0; i < 800; i++) {
        stars[i] = new Star();
      }

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


    
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}







