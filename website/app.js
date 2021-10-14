/* Global Variables */



// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
//the api which i got from the weather map website 
const apiKey = "4cb7d0b71a4717dd15273cc2300b64fc";

//get the id of the generate button
const button = document.querySelector("#generate");

//add an event listener to do the following steps when generate is pressed
button.addEventListener("click", async()=> {
    try{
        //get the value entered by the user 
        const zipCode = document.querySelector("#zip").value;
        const message = document.querySelector("#feelings").value;
        if(!zipCode){
            alert("You didn't enter a zip code.");
            return;
        }

        //go to the weather website with the zip code, apikey and fetch the corrossponding weather data
        const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`;
        const res = await fetch(url);
        const weather = await res.json();
        console.log(weather.main.temp);
        const temp = weather.main.temp;

        //get the data from the server using post
        await fetch("/data",{
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                date: newDate,
                temp: temp,
                content: message
            })
        }) 
   }
    catch(err){
        console.log("error",err);
    }
    /* Function to GET Project Data */
    retrieveData();
    
})
const retrieveData = async () =>
    {
        const result = await fetch('/getWeather');
        try {
        // Transform into JSON
        const finalResult = await result.json()
        console.log(finalResult)
        // Write updated data to DOM elements
        document.getElementById('temp').innerHTML = 'Tempreature: ' +Math.round(finalResult.temp)+ ' degrees';
        document.getElementById('content').innerHTML = 'I am feeling '+finalResult.content;
        document.getElementById("date").innerHTML ='date: '+finalResult.date;
        }
        // appropriately handle the error
        catch(error) {
        console.log("error", error);
        }
    }
