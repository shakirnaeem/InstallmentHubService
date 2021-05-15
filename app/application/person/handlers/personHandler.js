const personModel = require('../models/person.model.js');

class PersonHandler {
    create = async (req, res) => {
        let response = { errors: [], data: {} }
        try {
            let model = new personModel();
            model = Object.assign(model, req.body);
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
            response.data = await personModel.find({}, {_id: false});
            
        } catch (error) {
            console.log(error);
        }
        res.send(response);
    }
}

module.exports = PersonHandler;