const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = process.env.PORT

app.use(morgan("combined"));
app.use(cookieParser());
app.use(cors({
    origin : process.env.URL_CLIENT,
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res, next) => {
    res.send("well come to SrcPlace");
})

app.listen(port, () => {
     console.log(`Example app listening on port ${port}`)
})