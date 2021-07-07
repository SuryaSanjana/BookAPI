const mongoose = require("mongoose");

const AuthorSchema = mongoose.Schema({
    
    id: Number,
    name: String,
    books: [String]
});

//Author model
const AuthorModel = mongoose.model(AuthorSchema);

module.exports = AuthorModel;