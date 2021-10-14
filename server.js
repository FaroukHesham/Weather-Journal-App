// Setup empty JS object to act as endpoint for all routes
projectData = {};
const port = 3000;

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
app.listen(port, ()=>{
    console.log(`Your server is running on port ${port}`);
})

// callback function to complete get
app.get("/getWeather", (req,res) => {
    res.send(projectData);
});

// callback function to complete post
app.post("/data", (req,res) => {
    projectData = {...req.body};
    res.end();

});