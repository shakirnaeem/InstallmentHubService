const personHandler = require('../application/person/handlers/personHandler');

module.exports = (app) => {

    const handler = new personHandler();

    // Retrieve all 
    app.get('/', handler.findAll);
    app.post('/', handler.create);
}