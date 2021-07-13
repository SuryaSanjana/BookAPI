require("dotenv").config();


//frame work
const express = require("express");
const mongoose = require("mongoose");



// //database    
// const database = require("./database/index");
// //Models
// const BookModel = require("./database/book");
// const AuthorModel = require("./database/author");
// const PublicationModel = require("./database/publication");






//Initializing microservices outes
const Books = require("./API/Book");
const Authors=require("./API/Author");
const Publications = require("./API/Publication");
//initialising express
const shapeAI = express();

//configurations
shapeAI.use(express.json());

//establish database connection
mongoose
.connect(process.env.MONGO_URL,
  {
  
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true 
  }
)
 .then(() => console.log("connection established"));


//Initializing MiroServices
shapeAI.use("/book",Books);  // syntax->applicationName.use("prefix",Route);
shapeAI.use("/author",Authors);
shapeAI.use("/publication",Publications);






shapeAI.listen(3000,()=>console.log("Server Running"));
