const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const timeout = require("connect-timeout");

app.use(cors());
app.use(express.json());
app.use(timeout(1800000));


const db = require("./models");

const routes = require("./routes/routes.js");
app.use("/", routes);

db.sequelize.sync({ alter: true }).then(() => {
    app.listen(8000, () => {
        console.log("Server listening on port");
    })
})

//50000