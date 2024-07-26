const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/v1/userRoutes");
const dbConnection = require("./config/database/database");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./config/env/.env") });

const app = express();
const PORT =  5000;

app.use(express.json());
app.use(cors({
    origin: [
        "http://localhost:3000",

    ],
    credentials: true,
    
}));

dbConnection();

app.use("/users", userRouter)

app.listen(PORT, () => console.log(`Server started at port no. ${PORT}`))