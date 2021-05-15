require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');

module.exports = () => {
    // create express app
    const app = express();
    const port = process.env.PORT || 3000;
    const database = require('./dbinit');
    database();
    // parse requests of content-type - application/x-www-form-urlencoded
    app.use(express.urlencoded({ extended: true }))

    // parse requests of content-type - application/json
    app.use(express.json())
    require('./routes')(app);

    //listen for requests
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
}