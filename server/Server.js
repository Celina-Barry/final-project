'use strict';
const { getUserByEmail, createUser, updateUser, createMeeting, getMeetings } = require('./UserHandlers');
const express = require('express');
const morgan = require('morgan');


const PORT = 4000;

const app = express()
  .use(function(req, res, next) {
    res.header(
      'Access-Control-Allow-Methods',
      'OPTIONS, HEAD, GET, PUT, POST, PATCH, DELETE'
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  })
  .use(morgan('tiny'))
  .use(express.static('./server/assets'))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use('/', express.static(__dirname + '/'))

  // REST endpoints?
  //meeting endpoints
  .get('/meetings/:email', getMeetings)
  //.get('/meetings/:id', getMeetingsById)
  .post('/newmeeting/:email', createMeeting)
  
  //user endpoints
  .post('/newuser', createUser)
  //.get('/users', getUsers)
  .get('/users/:email', getUserByEmail)
  .patch('/users/:email', updateUser)


  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
