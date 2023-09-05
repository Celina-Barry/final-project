"use strict"; 

const { MongoClient } = require('mongodb');
require("dotenv").config();
const { MONGO_URI } = process.env;



const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  
//const url = 'mongodb://localhost:27017'; // Connection URL
//const dbName = 'mydatabase'; // Name of the database

// Create a new MongoClient
const client = new MongoClient(url);

// Connect to the server
client.connect().then(() => {
  console.log('Connected to MongoDB');

  // Now you can access the database and collections
  const db = client.db(dbName);

  // Export the MongoDB client instance
  module.exports = db;

}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});
