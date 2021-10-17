const mongoose = require("mongoose");

//create publication schema

const PublicationSchema = mongoose.Schema(
    //key and type of value pairs
    // data will be in mongoDB
    {
        id: Number,
        name: String,
        books: [String]
    }
);

const PublicationModel = mongoose.model("publications", PublicationSchema);
module.exports = PublicationModel;