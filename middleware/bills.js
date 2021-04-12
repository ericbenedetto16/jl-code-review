const { Bill } = require('../models');

exports.getBillsByUser = async (req, res, next) => {
    try {
        const bills = await Bill.findAll({
            where: {
                user_id: req.user.id,
            },
        });

        if (!bills) {
            req.user.bills = [];
        } else {
            req.user.bills = bills;
        }

        next();
    } catch (err) {
        console.log(err);

        res.status(500).send('Internal Server Error');
    }
};
