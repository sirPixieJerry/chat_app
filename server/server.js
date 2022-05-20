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
// require multer
const multer = require("multer");
// require random string generator module (lookup!)
const uidSafe = require("uid-safe");
// ---> require s3 file!
const { upload } = require("./s3");
// require the secret
const secret =
    process.env.NODE_ENV == "production"
        ? process.env
        : require("../config.json");
// require db.js functions
const {
    addUser,
    loginUser,
    createPasswordResetCode,
    getUserInfo,
    uploadImg,
    updateBio,
    getUsersByName,
    getRecentUsers,
    getFriendshipStatus,
    addFriend,
    acceptFriend,
    removeFriend,
    getfriends,
    getChat,
} = require("../sql/db");

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
        secret: secret.SECRET,
        maxAge: 1000 * 60 * 60 * 24 * 14,
        sameSite: true,
    })
);
// Prevent Framing
app.use(function (req, res, next) {
    res.setHeader("x-frame-options", "deny");
    next();
});
// setup multer uploader
const storage = multer.diskStorage({
    // specify directory folder for temp uploads
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, "uploads")); // null (if no err!)
    },
    // specify filename
    filename: (req, file, callback) => {
        // use uidSafe to generate filename ---> (24 digits)
        uidSafe(24).then((randomId) => {
            // build filename + ext from originalname property
            const fileName = `${randomId}${path.extname(file.originalname)}`; // null (if no err!)
            callback(null, fileName);
        });
    },
});
// specify multer middleware ready to use!
const uploader = multer({ storage });
// function to send code via email ❌
function sendEmailWithCode({ email, code }) {
    console.log("[social:email] sending email with code", email, code);
    // here you'll put the SES stuff
}

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
        .then((user_id) => {
            if (user_id == null) {
                res.json({ success: false });
            } else {
                req.session.id = user_id;
                res.json({ success: true });
            }
        })
        .catch((err) => {
            res.status(400);
            return err;
        });
});

// POST password reset request ❌
app.post("/api/password", (req, res) => {
    const code = cryptoRandomString({ length: 6, type: "distinguishable" });
    const email = req.body.email;
    createPasswordResetCode({ email, code }).then((rows) => {
        const { email, code } = rows[0];
        sendEmailWithCode({ email, code });
        res.json({ message: "ok" });
    });
});

// GET user info from database request
app.get("/api/users/me", (req, res) => {
    getUserInfo(req.session.id)
        .then((rows) => res.json(rows))
        .catch((err) => console.log(err));
});

// POST upload picture to upload folder then to s3 (upload) and serve it to main page request
app.post(
    "/api/users/me/upload-avatar",
    uploader.single("image"),
    upload,
    (req, res) => {
        // build data for data to pass it to the database
        const user_id = req.session.id;
        const imgName = req.file.filename;
        const url = `https://imageboard-spiced.s3.eu-central-1.amazonaws.com/${imgName}`;
        if (req.file) {
            // update database then serve the new image to the main page
            uploadImg(user_id, url)
                .then((rows) => res.json(rows))
                .catch((err) => console.log(err));
        } else {
            res.json({ success: false });
        }
    }
);

// PUT new bio text request
app.put("/api/users/bio", (req, res) => {
    updateBio(req.session.id, req.body.bio)
        .then((rows) => res.json(rows))
        .catch((err) => console.log(err));
});

// GET logout request
app.get("/logout", (req, res) => {
    req.session = null;
    res.json({ success: true });
});

// GET users by name
app.get("/api/users/:search", (req, res) => {
    const { search } = req.params;
    getUsersByName(search, req.session.id)
        .then((rows) => res.json(rows))
        .catch((err) => console.log(err));
});

// get recent users that joined the network
app.get("/api/recent-users", (req, res) => {
    getRecentUsers(req.session.id)
        .then((rows) => res.json(rows))
        .catch((err) => console.log(err));
});

// GET user info from database request
app.get("/users/:user_id", (req, res) => {
    getUserInfo(req.params.user_id)
        .then((rows) => res.json(rows))
        .catch((err) => console.log(err));
});

// GET friendship status
app.get("/api/friendships/status/:user_id", (req, res) => {
    getFriendshipStatus(req.params.user_id, req.session.id)
        .then((rows) => {
            if (!rows) {
                return res.json({ success: false });
            }
            return res.json(rows);
        })
        .catch((err) => console.log(err));
});

// POST add friend
app.post("/api/friendships/add", (req, res) => {
    const { user_id } = req.body;
    addFriend(user_id, req.session.id)
        .then((rows) => res.json(rows))
        .catch((err) => console.log(err));
});

// POST accept friend ❌
app.post("/api/friendships/accept", (req, res) => {
    const { sender_id, recipient_id } = req.body;
    acceptFriend(sender_id, recipient_id)
        .then((rows) => res.json(rows))
        .catch((err) => console.log(err));
});

// POST remove friend ❌
app.post("/api/friendships/remove", (req, res) => {
    const { sender_id, recipient_id } = req.body;
    removeFriend(sender_id, recipient_id)
        .then((rows) => res.json(rows))
        .catch((err) => console.log(err));
});

// GET friends ❌
app.get("/api/friends", (req, res) => {
    getfriends(req.session.id)
        .then((rows) => res.json(rows))
        .catch((err) => console.log(err));
});

// always last!
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

// server listening to chosen port
app.listen(PORT, function () {
    console.log(`I'm listening to ${PORT}...`);
});
