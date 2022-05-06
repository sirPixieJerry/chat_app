// require bycrypt module to hash passwords
const bcrypt = require("bcryptjs");

// function to hash passwords ❌
module.exports.hashPassword = function (password) {
    return bcrypt.genSalt().then((salt) => bcrypt.hash(password, salt));
};

// function to match password ❌
module.exports.matchPassword = function (password, password_hash, id) {
    return bcrypt
        .compare(password, password_hash)
        .then((match) => {
            if (match) {
                return id;
            }
            return null;
        })
        .catch((err) => console.log(err));
};
