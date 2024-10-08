const wf=document.querySelector(".wf");
const ip=document.querySelector(".ip");
const card=document.querySelector(".card");
const apikey="6b59653611650ba0435c3247d01d01a6";

wf.addEventListener("submit", async event =>{
    event.preventDefault();

    const city=ip.value;

    if(city){
        try{
            const wd=await getweatherData(city);
            displayweatherInfo(wd);


        }
        catch(error){
            console.error(error);
            displayError(error);
        }

    }
    else{
        displayError("Please enter a city");
    }

});

async function getweatherData(city){
    const apiurl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const response=await fetch(apiurl);
    console.log(response);

    if(!response.ok){
        throw new Error("could not fetch weather data");
    }

    return await response.json();
}
async function displayweatherInfo(data){
    console.log(data);
    const {name:city,
           main:{temp,humidity},
           weather:[{description,id}]}=data;

    card.textContent="";
    card.style.display="flex";

    const cdisp=document.createElement("h1");
    const tempd=document.createElement("p");
    const humidityd=document.createElement("p");
    const desc=document.createElement("p");
    const emojid=document.createElement("p");

    cdisp.textContent=city;
    tempd.textContent=`${(temp-273.15).toFixed(1)}\u00B0C`;
    humidityd.textContent=`Humidity:${humidity}%`;
    desc.textContent=description;
    emojid.textContent=getweatherEmoji(id);


    cdisp.classList.add("cd");
    tempd.classList.add("temp");
    humidityd.classList.add("hum");
    desc.classList.add("des");
    emojid.classList.add("emoji");
   
    card.appendChild(cdisp);
    card.appendChild(tempd);
    card.appendChild(humidityd);
    card.appendChild(desc);
    card.appendChild(emojid);
    


    
}
function getweatherEmoji(weatherId){

    switch(true){
        case(weatherId >=200 && weatherId <300):
        return "⛈️";
        case(weatherId >=300 && weatherId <400):
        return "🌦️";
        case(weatherId >=500 && weatherId <600):
        return "🌧️";
        case(weatherId >=600 && weatherId <700):
        return "❄️";
        case(weatherId >=700 && weatherId <800):
        return "🌫️";
        case(weatherId ===800):
        return "☀️";
        case(weatherId >=800 && weatherId <810):
        return "☁️";
        default:
            return "❓";

    }
}
async function displayError(message){

    const errorDisplay=document.createElement("p");
    errorDisplay.textContent=message;
    errorDisplay.classList.add("error");

    card.textContent="";
    card.style.display="flex";
    card.appendChild(errorDisplay);
}