const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post('/', function(req, res) {
  const apiKey = "2429aba2d33d3033ae7da4b8cb7e3dfe";
  let zipCode = "609602";
  const unit = "metric";
  console.log(req.body.cityZip);
  zipCode = Number(req.body.cityZip)
  const url = "https://api.openweathermap.org/data/2.5/weather?appid=" + apiKey + "&zip=" + zipCode + ",in&units=" + unit;
  https.get(url, function(response) {
    console.log(response);
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      console.log(weatherData);
      const icon = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png"
      res.write("<h1> Welcome to Amir WeatherApp</h1><br>");
      res.write("<p>The temperature at " + weatherData.name + " is" + weatherData.weather[0].description + "</p>");
      res.write("<img src=" + icon + " alt=" + "iconImage" + ">");
      res.write("<span> Current Temp: " + weatherData.main.temp + "</span>");
      res.send();
    })

  });

});


app.listen(process.env.PORT || 3000, function() {
  console.log('Weather app Server started 3000');
});