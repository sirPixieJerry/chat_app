// REQUIRE PACKAGES AND FILES:

// require express
const express = require("express");
// require compression
const compression = require("compression");
// require path
const path = require("path");
// require cookie-session
const cookieSession = require("cookie-session");
// require crypto random string
const cryptoRandomString = require("crypto-random-string");
// require the secret
const secret =
    process.env.NODE_ENV == "production"
        ? process.env
        : require("../config.json");
// require db.js functions
const { addUser, loginUser, createPasswordResetCode } = require("../sql/db");

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
        name: "social-network-session",
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

app.get("/user/id.json", (req, res) => {
    // make sure that even if there is no cookie there is
    // a valid json with "|| null"!
    res.json(req.session.id || null);
});

// POST register request
app.post("/register", (req, res) => {
    addUser(req.body)
        .then((rows) => {
            req.session.id = rows.id;
            res.json({ success: true });
        })
        .catch((err) => {
            res.status(400);
            return err;
        });
});

// POST login request
app.post("/login", (req, res) => {
    console.log("login req done!", req.body);
    loginUser(req.body)
        .then((arg) => {
            if (arg == null) {
                res.json({ success: false });
                console.log("failed!");
            } else {
                console.log("logged in!", arg);
                req.session.id = arg;
                res.json({ success: true });
            }
        })
        .catch((err) => {
            res.status(400);
            return err;
        });
});

// function to send code via email 🔴
function sendEmailWithCode({ email, code }) {
    console.log("[social:email] sending email with code", email, code);
    // here you'll put the SES stuff
}

// POST password reset request 🔴
app.post("/api/password", (req, res) => {
    const code = cryptoRandomString({ length: 6, type: "distinguishable" });
    const email = req.body.email;
    createPasswordResetCode({ email, code }).then((rows) => {
        const { email, code } = rows[0];
        sendEmailWithCode({ email, code });
        res.json({ message: "ok" });
    });
});

// GET logout request
app.get("/logout", (req, res) => {
    req.session = null;
    res.json({ success: true });
});

// always last
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

// server listening to chosen port
app.listen(PORT, function () {
    console.log(`I'm listening to ${PORT}...`);
});
