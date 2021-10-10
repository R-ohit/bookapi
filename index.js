require("dotenv").config();

// frame work
const express = require("express");
const mongoose = require("mongoose");

// Microservices routes
const books = require("./API/Book")
const author = require("./API/Author")
const publication = require("./API/Publication");
const { request, response } = require("express");

// initializing express
const booky = express();

// configuration 
booky.use(express.json());

// Establish database connection
mongoose
     .connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
    })
    .then(() => console.log("connection established!!!!!"));

// Initializing Microservices
booky.use("/book", books);
booky.use("/author", author);
booky.use("/publication", publication);

booky.listen(3000, () => console.log("server is running!!!"));
