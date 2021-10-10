const mongoose = require("mongoose");

// creating book schema
const BookSchema = mongoose.Schema({
    ISBN: {
        type:String,
        required: true,
    },
    title: {
    type: String,
     required: true
    },
    pubDate: String,
    language: String,
    numPage: Number,
    author: [Number],
    publication: Number, 
    category: [String],
});

// Create a book model
const BookModel = mongoose.model("books", BookSchema);

module.exports = BookModel;