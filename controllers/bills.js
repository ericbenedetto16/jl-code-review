const { Bill } = require('../models');
const path = require('path');

exports.sendBillForm = async (req, res, next) => {
    try {
        res.status(200).sendFile(
            path.join(__dirname, '../static/addBill.html')
        );
    } catch (err) {
        console.log(err);

        res.status(500).send('Internal Server Error');
    }
};

exports.showBillsDashboard = async (req, res, next) => {
    try {
        res.render('results', {
            title: 'Your Bills',
            bills: req.user.bills,
        });
    } catch (err) {
        console.log(err);

        res.status(500).send('Internal Server Error');
    }
};

exports.createNewBillRecord = async (req, res, next) => {
    try {
        const { companyName, date /* ,description */, amount, link } = req.body;
        const bill = await Bill.create({
            user_id: req.user.id,
            company: companyName,
            // TODO: Add Description to Bills Model and Migration
            // description: description,
            due_date: date,
            amount: amount,
            link: link,
        });

        if (!bill) throw new Error('Bill Not Created');

        res.status(200).redirect('/bills');
    } catch (err) {
        console.log(err);

        res.status(500).send('Internal Server Error');
    }
};
