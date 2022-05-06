// require bycrypt module to hash passwords
const bcrypt = require("bcryptjs");
// require spiced-pg
const spicedPg = require("spiced-pg");
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
        spicedPg(`postgres:${DB_USER}:${DB_PASSWORD}@localhost:5432/${DB_NAME}`)
    );
    console.log(`[db] Connecting to: ${DB_NAME}`);
}

// function to hash passwords ❌
const hashPassword = function (password) {
    return bcrypt.genSalt().then((salt) => bcrypt.hash(password, salt));
};

// function to add a new user to the users table ❌
module.exports.addUser = ({ first_name, last_name, email, password }) => {
    return hashPassword(password).then((password_hash) => {
        return db
            .query(
                `INSERT INTO users (first_name, last_name, email, password_hash)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
                [first_name, last_name, email, password_hash]
            )
            .then((result) => result.rows[0])
            .catch((err) => console.log(err));
    });
};
