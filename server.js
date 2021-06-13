// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", (req, res) => {
  try {
    let { date } = req.params;
    let unix;
    let utc;

    if (!isNaN(date)) {
      date = new Date(date * 1000);
    }

    unix = new Date(date).getTime() / 1000;
    utc = new Date(date).toUTCString();

    if (!unix || utc === "Invalid Date") throw new Error("Invalid Date");

    res.status(200);
    res.send({ unix, utc });
  } catch (error) {
    res.status(400);
    res.send({ error: "Invalid Date" });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
