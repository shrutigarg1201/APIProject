const mongoose = require("mongoose");

//create book schema

const BookSchema = mongoose.Schema(
    //key and type of value pairs
    // data will be in mongoDB
    {
        ISBN : String,
        title: String,
        pubDate: String,
        language: String,
        numPage: Number,
        author: [Number],  //id of authors
        publication: [Number],
        category: [String]
    }
);
//Schemas cant be exported or used directly thats why we use models
const BookModel = mongoose.model("books", BookSchema);
module.exports = BookModel;