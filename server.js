// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/timestamp/:date_string?',function(req,res){
  const date = req.params.date_string; 
  const dateNow = new Date(); 

  if (date == undefined) {
    res.json({ "unix": dateNow.getTime(), "utc": dateNow.toUTCString() })
  } else if (isNaN(date) && new Date(date).toString() != "Invalid Date") { // 2015-12-25
    res.json({ "unix": new Date(date).getTime(), "utc": new Date(date).toUTCString() })
  } else if (!isNaN(date) && new Date(date * 1000).toString() != "Invalid Date") { // 1450137600
    res.json({ "unix": date, "utc": new Date(date * 1000).toUTCString() })
  } else {
    res.json({ "error": "Invalid Date" })
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});