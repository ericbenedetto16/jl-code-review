const { User } = require('../models');
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res, next) => {
    try {
        const { fname, lname, password /*, phonenum */ } = req.body;
        const email = req.body['e-mail'];

        const salt = await bcrypt.genSalt(10);
        const pwd = await bcrypt.hash(password, salt);

        const user = await User.create({
            firstName: fname,
            lastName: lname,
            email: email,
            password: pwd,
            // TODO: Add Phone Number to User Model and Migrations
            // phone: phonenum,
        });

        if (!user) throw new Error('User Could Not Be Created');

        req.user = user;

        next();
    } catch (err) {
        console.log(err);

        res.status(500).send('Internal Server Error');
    }
};
