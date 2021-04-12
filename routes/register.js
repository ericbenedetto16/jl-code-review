const router = require('express').Router();
const { createSession } = require('../middleware/auth');
const { registerUser } = require('../middleware/register');
const path = require('path');

router
    .route('/')
    .get((req, res) =>
        res.sendFile(path.join(__dirname, '../static/sign-up.html'))
    )
    .post(registerUser, createSession, (req, res) =>
        res.redirect('/bills/add')
    );

module.exports = router;
