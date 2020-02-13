CREATE DATABASE fieldservdb;
USE fieldservdb;

CREATE TABLE users(
    id INT(11) NOT NULL,
    fullname VARCHAR(100),
    password VARCHAR(500),
    username VARCHAR(100),
    isAdmin BOOLEAN
);

ALTER TABLE users
ADD PRIMARY KEY(id);

ALTER TABLE users
MODIFY id INT(11) NOT NULL AUTO_INCREMENT;

CREATE TABLE news(
    id INT(11) NOT NULL,
    title VARCHAR(200),
    body TEXT(10100),
    image VARCHAR(100),
    summary VARCHAR(550),
    created_at timestamp NOT NULL DEFAULT current_timestamp
);

ALTER TABLE news
ADD PRIMARY KEY(id);

ALTER TABLE news
MODIFY id INT(11) NOT NULL AUTO_INCREMENT;

CREATE TABLE materials(
    id INT(11) NOT NULL,
    description VARCHAR(200),
    category VARCHAR(150),
    rate NUMERIC(5,2)
);

ALTER TABLE materials
ADD PRIMARY KEY(id);

ALTER TABLE materials
MODIFY id INT(11) NOT NULL AUTO_INCREMENT;

CREATE TABLE categories(
    id INT(11) NOT NULL,
    name VARCHAR(150)
);

ALTER TABLE categories
ADD PRIMARY KEY(id);

ALTER TABLE categories
MODIFY id INT(11) NOT NULL AUTO_INCREMENT;

INSERT INTO categories (name) VALUES
('AV and Broadband'),
('CAT5E'),
('CAT6'),
('Patch Panels'),
('Face Plates'),
('Surface Mount Box'),
('Backboards and Hardware'),
('Telco'),
('CCTV Cable and Hardware'),
('Specialty Cable');

