const router = require('express').Router();
const { destroySession } = require('../middleware/auth');

router.route('/').get(destroySession, (req, res) => res.redirect('/login'));

module.exports = router;
