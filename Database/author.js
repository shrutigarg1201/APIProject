const mongoose = require("mongoose");

//create author schema

const AuthorSchema = mongoose.Schema(
    //key and type of value pairs
    // data will be in mongoDB
    {
        id: Number,
        name: String,
        books: [String]
    }
);

const AuthorModel = mongoose.model("authors", AuthorSchema);
module.exports = AuthorModel;