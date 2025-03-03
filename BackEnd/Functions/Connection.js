const mongoose = require('mongoose');
require("dotenv").config()

const Connection = async () => {
    return mongoose.connect(process.env.MONGO_STRING) ;
}

module.exports = Connection;