const mongoose=require("mongoose");

//creating book schema
const BookSchema = mongoose.Schema({
 
    // ISBN: String,
    ISBN:{
      type:String,
      required:true,
      minLength:8,
      maxLength:10,
    },
    title: String,
    authors: [Number],
    language: String,
    pubDate: String,
    numOfPage: Number,
    category: [String],
    publication: Number
});

// create book model
const BookModel = mongoose.model("books",BookSchema);
//to have this model in other files
module.exports=BookModel;