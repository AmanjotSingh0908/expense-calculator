const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/v1/userRoutes");
const dbConnection = require("./config/database/database");
const AWS = require("aws-sdk");
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

app.use(express.json())

const sqs = new AWS.SQS({
    accessKeyId: AWS_Access_Key,
    secretAccessKey: secretAccessKey,
    region: "ap-south-1"
});

const queueURL = queueURL

app.post("/send-mail", async (req,res) => {
    try {
        const { from, to, subject, body } = req.body;
        const sqsBody = {from, to, subject, body};
        const sqsParams = {
            MessageBody : JSON.stringify(sqsBody),
            QueueURL : queueURL
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
})


app.use("/users", userRouter)

app.listen(PORT, () => console.log(`Server started at port no. ${PORT}`))