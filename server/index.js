const keys = require('./keys');

// express app setup

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// postgres client setup
const { Pool } = require('pg');
const pgClient = new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort
})

pgClient.on('error', () => {
    console.log('lost pg connection');
})

pgClient
        .query('CREATE  TABLE IF NOT EXIST values (number INT)')
        .catch((err) => console.log(err));

// redis client setup
const redis = require('redis');


