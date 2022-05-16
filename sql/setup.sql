-- drop existing table
DROP TABLE IF EXISTS friendships;
DROP TABLE IF EXISTS password_reset;
DROP TABLE IF EXISTS users;

-- create user table:
CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     first_name VARCHAR(255) NOT NULL,
     last_name VARCHAR(255) NOT NULL,
     email VARCHAR(50) NOT NULL UNIQUE,
     profile_picture_url TEXT,
     bio TEXT,
     password_hash VARCHAR NOT NULL,
     created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE password_reset (
     id SERIAL PRIMARY KEY,
     code VARCHAR(6) NOT NULL,
     email VARCHAR(50) NOT NULL,
     created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE friendships(
  id SERIAL PRIMARY KEY,
  sender_id INT REFERENCES users(id) NOT NULL,
  recipient_id INT REFERENCES users(id) NOT NULL,
  accepted BOOLEAN DEFAULT false
);