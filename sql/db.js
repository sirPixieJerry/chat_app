// require spiced-pg
const spicedPg = require("spiced-pg");
// require bycrypt functionality
const { hashPassword, matchPassword } = require("./bycrypt");
// require credentials from config.json
const { DB_USER, DB_PASSWORD, DB_NAME } = require("../config.json");

// decide if db runs in production or development
let db;
if (process.env.DATABASE_URL) {
    // runs app on heroku
    db = spicedPg(process.env.DATABASE_URL);
} else {
    // the app runs locally
    db = spicedPg(
        `postgres:${DB_USER}:${DB_PASSWORD}@localhost:5432/${DB_NAME}`
    );
    console.log(`[db] Connecting to: ${DB_NAME}`);
}

// function to add a new user to the users table
function addUser({ first_name, last_name, email, password }) {
    return hashPassword(password).then((password_hash) => {
        return db
            .query(
                `INSERT INTO users (first_name, last_name, email, password_hash)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
                [first_name, last_name, email, password_hash]
            )
            .then((result) => result.rows[0])
            .catch((err) => {
                console.log(err);
                throw err;
            });
    });
}

// function to login user
function loginUser({ email, password }) {
    return db
        .query(
            `SELECT id, password_hash FROM users 
    WHERE email = $1`,
            [email]
        )
        .then((result) => {
            if (!result.rows[0]) {
                return null;
            }
            const { id, password_hash } = result.rows[0];
            return matchPassword(password, password_hash, id);
        })
        .catch((err) => {
            console.log(err);
            throw err;
        });
}

// function to upload avatar image
function uploadImg(user_id, url) {
    return db
        .query(
            `UPDATE users SET profile_picture_url = $2 
            WHERE id = $1 
            RETURNING *`,
            [user_id, url]
        )
        .then((result) => result.rows[0])
        .catch((err) => console.log(err));
}

// function to update users bio
function updateBio(user_id, bio) {
    return db
        .query(
            `UPDATE users SET bio = $2 
        WHERE id = $1 
        RETURNING *`,
            [user_id, bio]
        )
        .then((result) => result.rows[0])
        .catch((err) => console.log(err));
}

// function createPasswordResetCode()

// function to get user info from database
function getUserInfo(user_id) {
    return db
        .query(`SELECT * FROM users WHERE id = $1`, [user_id])
        .then((result) => result.rows[0])
        .catch((err) => console.log(err));
}

// query to get users by name
function getUsersByName(users, user_id) {
    return db
        .query(
            `SELECT first_name, last_name, profile_picture_url, id
            FROM users WHERE 
            first_name ILIKE $1 AND id != $2 LIMIT 6`,
            [users + "%", user_id]
        )
        .then((result) => result.rows)
        .catch((err) => console.log(err));
}

// query to get recent users ❌
function getRecentUsers(user_id) {
    return db
        .query(
            `SELECT * FROM users 
        WHERE id != $1 
        ORDER BY created 
        DESC LIMIT 4`,
            [user_id]
        )
        .then((result) => result.rows)
        .catch((err) => console.log(err));
}

module.exports = {
    loginUser,
    addUser,
    getUserInfo,
    uploadImg,
    updateBio,
    getUsersByName,
    getRecentUsers,
};
