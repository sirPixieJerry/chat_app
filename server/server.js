// REQUIRE PACKAGES AND FILES:

// require express
const express = require("express");
// require compression
const compression = require("compression");
// require path
const path = require("path");
// require cookie-session
const cookieSession = require("cookie-session");
// require the secret
const secret =
    process.env.NODE_ENV == "production"
        ? process.env
        : require("../config.json");
// require db.js functions
const { addUser, loginUser } = require("../sql/db");

// SERVER SETUP:

// start the server
const app = express();
// choose the port
const PORT = process.env.PORT || 3001;

// MIDDLEWARE SETUP
// setup to receive and parse JSON files
app.use(express.json());
// compresses th response
app.use(compression());
// serve static files in /public
app.use(express.static(path.join(__dirname, "..", "client", "public")));
// setup middleware to populate req.body with form data
app.use(express.urlencoded({ extended: false }));
// setup cookie-session
app.use(
    cookieSession({
        name: "petition",
        secret: secret.secret,
        maxAge: 1000 * 60 * 60 * 24 * 14,
        sameSite: true,
    })
);
// Prevent Framing
app.use(function (req, res, next) {
    res.setHeader("x-frame-options", "deny");
    next();
});

// ROUTES:

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

// POST register request
app.post("/register", (req, res) => {
    console.log("data from registration from: ", req.body);
    addUser(req.body)
        .then((rows) => {
            req.session.id = rows.id;
        })
        .catch((err) => {
            res.status(400);
            console.log(err);
        });
});

// POST login request
app.post("/login", (req, res) => {
    loginUser(req.body)
        .then((arg) => {
            if (arg == null) {
                // tell user login failed
            } else {
                req.session.id = arg;
                // redirect to logo
            }
        })
        .catch((err) => {
            res.status(400);
            console.log(err);
        });
});

// server listening to chosen port
app.listen(PORT, function () {
    console.log(`I'm listening to ${PORT}...`);
});
