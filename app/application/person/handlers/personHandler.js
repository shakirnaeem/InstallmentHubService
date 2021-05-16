const personModel = require('../models/person.model.js');

class PersonHandler {
    create = async (req, res) => {
        let response = { errors: [], data: {} }
        try {
            var monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            let model = new personModel();
            model.name = req.body.name;
            model.isDeleted = false;
            model.base.totalAmount = req.body.totalAmount;
            model.base.remainingAmount = 0;
            model.base.months = req.body.months;
            model.detail = [];
            let installmentAmount = (model.base.totalAmount / model.base.months).toFixed(2);

            var date = new Date(`${req.body.startYear}-${req.body.startMonth}-01`);
            let defaultMonth = date.getMonth();
            for (var i = 0; i < req.body.months; i++) {
                date = new Date(date.setMonth(defaultMonth + i))
                model.detail.push({
                    amount: installmentAmount,
                    title: '',
                    month: `${monthList[date.getMonth()]} ${date.getFullYear()}`,
                    isProcessed: false
                });
            }

            //Save Note in the database
            response.data = await model.save();
        } catch (error) {
            console.log(error);
        }
        res.send(response);
    }

    findAll = async (req, res) => {
        let response = { errors: [], data: [] }
        try {
            response.data = await personModel.find({});

        } catch (error) {
            console.log(error);
        }
        res.send(response);
    }

    processAmount = async (req, res) => {
        let response = { errors: [], data: [] }
        try {
            var document = await personModel.findById(req.query.id);
            if(document && document.detail.length > 0) {
                document.detail.forEach(element => {
                    if(element._id == req.query.subId){
                        element.isProcessed = true;
                    }
                });
                response.data = await document.save();
            }

        } catch (error) {
            console.log(error);
        }
        res.send(response);
    }
}

module.exports = PersonHandler;