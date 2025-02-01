CREATE DATABASE classplanner;

CREATE TABLE classes (
    code VARCHAR(10) PRIMARY KEY NOT NULL,
    units INT NOT NULL,
    category VARCHAR(50) NOT NULL
);