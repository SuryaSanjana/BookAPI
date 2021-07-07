const mongoose = require("mongoose");

const PublicationSchema = mongoose.Schema({
    
    id: Number,
    name: String,
    books: [String]
});

//Publication model
const PublicationModel = mongoose.model(PublicationSchema);

module.exports = PublicationModel;