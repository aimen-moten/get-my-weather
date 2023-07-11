const express = require("express");
const app = express();
const https =require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req,res){
    const query = req.body.cityName;
    const apiKey = "8e44e5c6e2ef495fb5e12246230802";
    const url = "https://api.weatherapi.com/v1/current.json?key="+apiKey+"&q="+query+"&aqi=no";
    
    https.get(url, function(response){
        console.log("YES");
        
        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.current.temp_c;
            const weatherDesc = weatherData.current.condition.text;
            const icon = weatherData.current.condition.icon;
            const imageURL = "https:" + icon;
            res.write("<h1>The temperature in " +query+ " is " + temp + " degrees Celcius.</h1>");
            res.write("<p>The weather is currently " + weatherDesc + ".</p>");
            res.write("<img src=" + imageURL + ">");
            res.send()

        });
    });
});

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});
