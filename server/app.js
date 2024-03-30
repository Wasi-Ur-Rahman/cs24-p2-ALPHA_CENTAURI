const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRouter = require('./routes/authRoute');
const profileRouter = require('./routes/profileRoute');
const userRouter = require('./routes/userRoute');
const vehicleRouter = require('./routes/vehicleRoute');
const stsRouter = require("./routes/stsRoute");
const landfillRouter = require("./routes/landfillRoute");
const cors = require("cors");
const app = express();

// 1) middleware
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));


// 2) route
app.use('/auth',authRouter);
app.use('/',profileRouter);
app.use('/',userRouter);
app.use('/',vehicleRouter);
app.use('/',stsRouter);
app.use("/",landfillRouter);

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;
// 3) mongo connection
const dbUrl = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/`;
// const dbUrl = `mongodb://localhost:27017/authentication`;


mongoose.connect(dbUrl)
.then(() => console.log("Connected to MongoDB"))
.catch((e) => console.log(e));

// 4) global error handler
app.use((err,req,res,next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
});

// 5) server

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});