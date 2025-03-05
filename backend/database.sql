CREATE DATABASE classplanner;

CREATE TABLE classes (
    code VARCHAR(10) PRIMARY KEY NOT NULL,
    units INT NOT NULL,
    category VARCHAR(50) NOT NULL
);

CREATE TABLE schedule (
    id SERIAL PRIMARY KEY, 
    class_id VARCHAR(20) NOT NULL UNIQUE,
    year INT NOT NULL,
    quarter VARCHAR(10) NOT NULL,
    FOREIGN KEY (class_id) REFERENCES classes(code) ON DELETE CASCADE
);