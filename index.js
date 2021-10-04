const express = require("express");
//mongoose
const mongoose = require("mongoose");
//import express from "express";
var bodyParser = require("body-parser");

//Database
const database = require("./database");

//Initialise express
const booky = express();

booky.use(bodyParser.urlencoded({extended: true}));
booky.use(bodyParser.json());

//connect mongoose to mongoDB
mongoose.connect("mongodb+srv://shruti:chinu@mongodb@shapeai.difm6.mongodb.net/Booky?retryWrites=true&w=majority",
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}
).then(() => console.log("Connection Established"));

/**
 * Route            /
 * Description      Get all the books
 * Access           Public
 * Parameter        none
 * Methods          GEt
 */
booky.get("/",(req,res) => {
    return res.json({books: database.books});
});

/**
 * Route            /is
 * Description      Get specific book on isbn
 * Access           Public
 * Parameter        ISBN
 * Methods          GET
 */
booky.get("/is/:isbn", (req,res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.ISBN === req.params.isbn
    );

    if(getSpecificBook.length === 0){
        return res.json({error: `No book found for the ISBN of ${req.params.isbn}`});
    }
    else{
        return res.json({book: getSpecificBook});
    }
});

/**
 * Route            /c
 * Description      Get specific book by category
 * Access           Public
 * Parameter        Category
 * Methods          GET
 */
booky.get("/c/:category", (req,res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.category.includes(req.params.category)
    )
    
    if(getSpecificBook.length === 0){
        return res.json({error: `No book found for the category of ${req.params.category}`})
    }
    
    return res.json({book: getSpecificBook});
});

/**
 * Route            /l
 * Description      Get specific book by language
 * Access           Public
 * Parameter        language
 * Methods          GET
 */
booky.get("/l/:language", (req,res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.language === req.params.language
    )

    if(getSpecificBook.length===0){
        return res.json({error: `No book found for language ${req.params.language}`})
    }

    return res.json({book: getSpecificBook});
})

/**
 * Route            /author
 * Description      Get all the authors
 * Access           Public
 * Parameter        none
 * Methods          GET
 */
booky.get("/author", (req,res) => {
    return res.json({authors: database.authors});
});

/**
 * Route            /author/id
 * Description      Get specific author based on id
 * Access           Public
 * Parameter        id
 * Methods          GET
 */
booky.get("/author/id/:id",(req,res) => {
    const getSpecificAuthor = database.authors.filter(
        (author) => author.id === parseInt(req.params.id)
    )
    console.log(getSpecificAuthor);

    if(getSpecificAuthor.length === 0){
        return res.json({error: `No author found for the id ${req.params.id}`});
    }

    return res.json({author: getSpecificAuthor});
})

/**
 * Route            /author/book
 * Description      Get specific author based on book
 * Access           Public
 * Parameter        ISBN
 * Methods          GET
 */
booky.get("/author/book/:isbn", (req,res) => {
    const getSpecificAuthor = database.authors.filter(
        (author) => author.books.includes(req.params.isbn)
    )

    if(getSpecificAuthor.length === 0){
        return res.json({error: `No author found for the book of ${req.params.isbn}`});
    }
    return res.json({authors: getSpecificAuthor});
});

/**
 * Route            /publication
 * Description      Get all the publications
 * Access           Public
 * Parameter        none
 * Methods          GET
 */
booky.get("/publication", (req,res) => {
    return res.json({publications: database.publications});
});

/**
 * Route            /publication/id
 * Description      Get specific publication by id
 * Access           Public
 * Parameter        id
 * Methods          GET
 */
booky.get("/publication/id/:id", (req,res) => {
    const getSpecificPublication = database.publications.filter(
        (publication) => publication.id === parseInt(req.params.id)
    )

    if(getSpecificPublication.length===0){
        return res.json({error: `No publication found for ${req.params.id}`})
    }
    return res.json({publication: getSpecificPublication})
});

/**
 * Route            /publication
 * Description      Get all the publications
 * Access           Public
 * Parameter        none
 * Methods          GET
 */
booky.get("/publication/book/:isbn",(req,res) => {
    const getSpecificPublication = database.publications.filter(
        (publication) => publication.books.includes(req.params.isbn)
    )

    if(getSpecificPublication.length===0){
        return res.json({error: `No publication found for book of ${req.params.isbn}`})
    }
    return res.json({publication: getSpecificPublication})
});

//POST

/**
 * Route            /book/new
 * Description      add new book
 * Access           Public
 * Parameter        none
 * Methods          POST
 */
booky.post("/book/new", (req,res) => {
    const newBook = req.body;  //body of our request i.e the body of new book
    database.books.push(newBook);  //pushing new book in database
    return res.json({updatedBooks: database.books});
});

/**
 * Route            /author/new
 * Description      add new author
 * Access           Public
 * Parameter        none
 * Methods          POST
 */
booky.post("/author/new",(req,res) => {
    const newAuthor = req.body;
    database.authors.push(newAuthor);
    return res.json({updatedAuthors: database.authors})
});

/**
 * Route            /publication/new
 * Description      add new publication
 * Access           Public
 * Parameter        none
 * Methods          POST
 */
booky.post("/publication/new",(req,res) => {
    const newPublication = req.body;
    database.publications.push(newPublication);
    return res.json(database.publications);
});

/**
 * Route            /publication/update/book
 * Description      Update or add new publication
 * Access           Public
 * Parameter        isbn
 * Methods          PUT
 */
/*
{
    "pubId": 2;
} this will be requested in postman
*/
booky.put("/publication/update/book/:isbn", (req,res) => {
    //Update the publictaion database
    database.publications.forEach((pub) => {
        if(pub.id === req.body.pubId) {
            return pub.books.push(req.params.isbn);
        }
    });

    //Update the book database
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            book.publication = req.body.pubId;
            return;
        }
    });

    return res.json(
        {
            books: database.books,
            publications: database.publications,
            message: "Successfully updated publications"
        }
    )
});

/**
 * Route            /book/delete
 * Description      Delete a book
 * Access           Public
 * Parameter        isbn
 * Methods          DELETE
 */
booky.delete("/book/delete/:isbn",(req,res) => {
    //whichever book that does not match with isbn send it to an updated database array and it will be filtered out

    const updatedBookDatabase = database.books.filter(
        (book) => book.ISBN !== req.params.isbn
    )
    database.books = updatedBookDatabase;
    return res.json({books: database.books});
});

/**
 * Route            /book/delete
 * Description      Delete a book
 * Access           Public
 * Parameter        isbn
 * Methods          DELETE
 */
booky.delete("/book/author/:isbn/:authorId", (req,res) => {
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            const newAuthorList = book.author.filter(
                (eachAuthor) => eachAuthor !== parseInt(req.params.authorId)
            );
            book.author = newAuthorList;
            return;
        }
        return res.json(
            {
                book: database.books,
                message: "successful"
            }
        )
    });

})

//multiple parameters
/**
 * Route            /book/delete/author
 * Description      Delete an author from a book and vice versa
 * Access           Public
 * Parameter        isbn, authorId
 * Methods          DELETE
 */
booky.delete("/book/delete/author/:isbn/:authorId",(req,res) => {
    //Update the book database
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            const newAuthorList = book.author.filter(
                (eachAuthor) => eachAuthor !== parseInt(req.params.authorId)
            );
            book.author = newAuthorList;
            return;
        }
    });

    //Update the author database
    database.authors.forEach((author) => {
        if(author.id === parseInt(req.params.authorId)){
            const newBookList = author.books.filter(
                (book) => book !== req.params.isbn
            );
            author.books = newBookList;
            return;
        }
    });
    return res.json(
        {
            books: database.books,
            author: database.authors,
            message: "successfully"
        }
    )
});

booky.listen(3000,() => {
    console.log("Server is up and rinning");
});