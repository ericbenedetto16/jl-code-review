const { Session, User } = require('../models');
const bcrypt = require('bcrypt');

exports.authUser = async (req, res, next) => {
    try {
        const session = await Session.findOne({
            where: {
                session_token: req.sessionID,
            },
            include: [{ model: User, attributes: ['id'] }],
        });

        if (!session) {
            res.redirect('/login');
            return;
        }

        req.user = session.User;

        next();
    } catch (err) {
        console.log(err);

        res.status(500).send('Internal Server Error');
    }
};

exports.loginUser = async (req, res, next) => {
    try {
        const { usname, psw } = req.body;
        console.log(req.body);

        const user = await User.findOne({
            where: {
                email: usname,
            },
        });

        if (!user) {
            res.redirect('/login'); // FIXME: This is Poor Logic
            return;
        }

        const comp = await bcrypt.compare(psw, user.password);

        if (!comp) {
            res.redirect('/login'); // FIXME: This is Poor Logic
            return;
        }

        req.user = user;

        next();
    } catch (err) {
        console.log(err);

        res.status(500).send('Internal Server Error');
    }
};

exports.createSession = async (req, res, next) => {
    try {
        const session = await Session.create({
            user_id: req.user.id,
            session_token: req.sessionID,
        });

        if (!session) throw Error("Couldn't Create Session");

        next();
    } catch (err) {
        console.log(err);

        res.status(500).send('Internal Server Error');
    }
};

exports.destroySession = async (req, res, next) => {
    try {
        await Session.destroy({
            where: {
                session_token: req.sessionID,
            },
        });

        next();
    } catch (err) {
        console.log(err);

        res.status(500).send('Internal Server Error');
    }
};
