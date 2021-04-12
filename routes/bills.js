const { authUser } = require('../middleware/auth');
const {
    sendBillForm,
    showBillsDashboard,
    createNewBillRecord,
} = require('../controllers/bills');
const { getBillsByUser } = require('../middleware/bills');

const router = require('express').Router();

router.route('/').get(authUser, getBillsByUser, showBillsDashboard);

router
    .route('/add')
    .get(authUser, sendBillForm)
    .post(authUser, createNewBillRecord);

module.exports = router;
