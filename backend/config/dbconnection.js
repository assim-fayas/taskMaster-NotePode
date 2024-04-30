const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
module.exports = {
    dbconnect: () => {
        mongoose.connect(process.env.DB_URL

        ).then(() => {
            console.log(" db connect successfully")
        }).catch((err) => {
            console.log(err);
        })
    }
}