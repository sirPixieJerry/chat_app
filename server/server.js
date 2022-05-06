// REQUIRE PACKAGES AND FILES:

// require express
const express = require("express");
// require compression
const compression = require("compression");
// require path
const path = require("path");

// SERVER SETUP:

// start the server
const app = express();
// choose the port
const PORT = process.env.PORT || 3001;

// MIDDLEWARE SETUP
// compresses th response
app.use(compression());
// serve static files in /public
app.use(express.static(path.join(__dirname, "..", "client", "public")));

// ROUTES:

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

// server listening to chosen port
app.listen(PORT, function () {
    console.log(`I'm listening to ${PORT}...`);
});
