'use strict';

const
  http = require('http'),
  path = require('path'),
  express = require('express');

const spotDiff = require('./app/spot-diff');

const players = [
  { name: 'Adel',
    password: '12345',
    email: 'adeljs@gmail.com',
    level: 4,
    score: 102,
    diffs: 134,
    wins: 45,
    looses: 7,
    games: 53,
    rancking: 6 },
  { name: 'Bob',
    password: 'abcdef',
    email: 'bobjs@gmail.com',
    level: 1,
    score: 74,
    diffs: 56,
    wins: 65,
    looses: 15,
    games: 80,
    rancking: 47 },
  { name: 'John',
    password: '54321',
    email: 'johnny@gmail.com',
    level: 6,
    score: 245,
    diffs: 371,
    wins: 213,
    looses: 11,
    games: 224,
    rancking: 2 }
];

const
  app = express(),
  server = http.createServer( app );

// routes:
const
  login = require('./routes/user-login'),
  adminLogin = require('./routes/admin-login'),
  pictures = require('./routes/pictures'),
  profile = require('./routes/profile'),
  register = require('./routes/register');

app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, './public')));

app.get('/api/pictures', pictures.showPictures);
app.get('/api/pictures/:id', pictures.viewPicture);
app.post('/api/pictures', pictures.createPicture);
app.put('/api/pictures/:id', pictures.updatePicture);
app.delete('/api/pictures/:id', pictures.deletePicture);

app.get('/login', login.form);
app.post('/login', login.submit);
app.get('/logout', login.logout);

app.get('/signup', register.form);
app.post('/signup', register.submit);

app.get('/profile', profile.view);
app.get('/profile/edit/', profile.edit);
app.get('/profile/delete/:id', profile.delete);

app.get('/admin/login', adminLogin.form);
app.post('/admin/login', adminLogin.submit);
app.get('/admin/logout', adminLogin.logout);

server.listen(3000, function () {
  console.log('listening on port 3000');
});

spotDiff( server );