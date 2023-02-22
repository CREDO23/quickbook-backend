DROP DATABASE spes ;

CREATE DATABASE spes ;

\c spes ;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4 (),
    username CHAR(32) NOT NULL UNIQUE,
    firstname CHAR(32) ,
    lastname CHAR(32) ,
    password CHAR(32) NOT NULL,
    email CHAR(32) NOT NULL UNIQUE,
    avatar CHAR(255) ,
    proffession CHAR(32) ,
    gender CHAR(1) ,
    isOnline BOOLEAN,
    phoneNumber CHAR(12)
) ;

INSERT INTO users (username, firstname, lastname, password, email, avatar, proffession, gender, isOnline, phoneNumber) VALUES ('John', 'Johnf', 'Johnl', '12345', 'bakerathierry@gmail.com', 'avatar' , '', 'M' , true , '0970721888')