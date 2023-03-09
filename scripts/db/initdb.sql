
CREATE DATABASE spes ;

\c spes 

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4 (),
    username TEXT NOT NULL UNIQUE,
    firstname TEXT ,
    lastname TEXT ,
    password TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    avatar TEXT ,
    proffession TEXT ,
    gender VARCHAR(1) ,
    is_online BOOLEAN,
    phone_number TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
) ;