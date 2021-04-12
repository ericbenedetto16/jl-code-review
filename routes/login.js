const router = require('express').Router();
const path = require('path');
const { loginUser, createSession } = require('../middleware/auth');

router
    .route('/')
    .get((req, res) =>
        res.sendFile(path.join(__dirname, '../static/login.html'))
    )
    .post(loginUser, createSession, (req, res) => res.redirect('/bills/add'));

module.exports = router;
