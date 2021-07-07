const mongoose=require("mongoose");

//creating book schema
const BookSchema = mongoose.Schema({
 
    ISBN: String,
    title: String,
    authors: [Number],
    language: String,
    pubDate: String,
    numOfPage: Number,
    category: [String],
    publication: Number
});

// create book model
const BookModel = mongoose.model(BookSchema);
//to have this model in other files
module.exports=BookModel;