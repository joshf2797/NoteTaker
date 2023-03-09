const express = require('express');
const path = require('path');
const fs = require('fa');
const uuid = require('uuid');

const PORT = process.env.PORT || 3001:
const app = express();

// Use middlware for parsing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
use.express(express.static('public'));

