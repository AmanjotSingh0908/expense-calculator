const mongoose = require("mongoose");

function dbConnection(){
    mongoose
    .connect(process.env.MONGO_URL)
    .then((connection) => console.log("Connected to Database"))
    .catch((error) => {
        console.log("Database not connected", error);
        process.exit(1);
    });
}

module.exports = dbConnection;