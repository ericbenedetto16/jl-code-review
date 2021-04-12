require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use(
    session({
        secret: process.env.APP_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: process.env.NODE_ENV === 'production' ? true : false,
        },
    })
);

app.get('/', (req, res) => {
    res.redirect('/login');
});

const bills = require('./routes/bills');
const login = require('./routes/login');
const logout = require('./routes/logout');
const register = require('./routes/register');

app.use('/bills', bills);
app.use('/login', login);
app.use('/logout', logout);
app.use('/register', register);

// Static Fallback
app.get('*', express.static(path.join(__dirname, 'static')));

const server = app.listen(process.env.PORT || 5000, () => {
    console.log(
        `App Listening on http://${server.address().address}:${
            server.address().port
        }`
    );
});
