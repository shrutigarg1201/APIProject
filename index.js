require("dotenv").config();

const express = require("express");
//mongoose
const mongoose = require("mongoose");
//import express from "express";
var bodyParser = require("body-parser");

//Database
const database = require("./Database/database");

//Models
const BookModel = require("./Database/book");
const AuthorModel = require("./Database/author");
const PublicationModel = require("./Database/publication");

//Initialise express
const booky = express();

booky.use(bodyParser.urlencoded({extended: true}));
booky.use(bodyParser.json());

//connect mongoose to mongoDB
mongoose.connect(process.env.MONGO_URL,
{}).then(() => console.log("Connection Established"));

/**
 * Route            /
 * Description      Get all the books
 * Access           Public
 * Parameter        none
 * Methods          GEt
 */
booky.get("/",async(req,res) => {
    const getAllBooks = await BookModel.find();
    return res.json({getAllBooks});
});

/**
 * Route            /is
 * Description      Get specific book on isbn
 * Access           Public
 * Parameter        ISBN
 * Methods          GET
 */
booky.get("/is/:isbn", async(req,res) => {
    const getSpecificBook = await BookModel.findOne(
        {ISBN: req.params.isbn}
    )
    //.length === 0 does not exist for mongoDB
    //mongoDB we have "null"
    //!0 = 1 , !1 = 0
    if(!getSpecificBook){
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
booky.get("/c/:category", async(req,res) => {
    const getSpecificBook = await BookModel.findOne({
        category: req.params.category
    });
    
    if(!getSpecificBook){
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
booky.get("/l/:language", async(req,res) => {
    const getSpecificBook = await BookModel.findOne({
        language: req.params.language
    });

    if(!getSpecificBook){
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
booky.get("/author", async(req,res) => {
    const getAllAuthors = await AuthorModel.find();
    return res.json({getAllAuthors});
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
booky.get("/publication", async (req,res) => {
    const getAllPublication = await PublicationModel.find();
    return res.json({getAllPublication});
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
booky.post("/book/new", async(req,res) => {
    const { newBook } = req.body;  ///body of our request i.e the body of new book
    const addNewBook = BookModel.create(newBook);
    return res.json({
        books: addNewBook,
        message: "Book was added !!!"
    })

    //database.books.push(newBook);  //pushing new book in database
    /// return res.json({updatedBooks: database.books});
});

/**
 * Route            /author/new
 * Description      add new author
 * Access           Public
 * Parameter        none
 * Methods          POST
 */
booky.post("/author/new",async(req,res) => {
    const { newAuthor } = req.body;
    const addNewAuthor = AuthorModel.create(newAuthor);
    return res.json(
        {
            author: addNewAuthor,
            message: "Author was added"
        }
      
    );
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

/*******PUT**********/
/**
 * Route            /book/book
 * Description      Update obook on isbn
 * Access           Public
 * Parameter        isbn
 * Methods          PUT
 */
booky.put("/book/update/:isbn", async(req,res) => {
    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn
        },
        {
            title: req.body.bookTitle  //whatever we want to change
        },
        {
            new: true /// this will update and it will show updated book n frontend
        }
    );

    return res.json(
        {
            books: updatedBook
        }
    );
});

//Updating new author
/**
 * Route            /book/author/update
 * Description      Update /add new author
 * Access           Public
 * Parameter        isbn
 * Methods          PUT
 */
booky.put("/book/author/update/:isbn", async(req,res) => {
    //updating book database
    const updatedBook = await BookModel.findOneAndUpdate(
      {
          ISBN: req.params.isbn
      },
      {
          $addToSet: {   // push wont replace it , it will only pusg what we want but
            //but push will duplicate things if even by mistake we update twice with sam ething 
            // so we use addToSet
              authors: req.body.newAuthor
          }
      },
      {
          new: true
      }  
    );

    //Updating author database
    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        {
            id: req.body.newAuthor
        },
        {
            $addToSet: {
                books: req.params.isbn
            }
        },
        {
            new: true
        }
    );

    return res.json(
        {
            books: updatedBook,
            authors: updatedAuthor,
            message: "New author was added"
        }
    );
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
booky.delete("/book/delete/:isbn",async(req,res) => {
    //whichever book that does not match with isbn send it to an updated database array and it will be filtered out

    const updatedBookDatabase = await BookModel.findOneAndDelete(
        {
            ISBN: req.params.isbn
        }
    );

    return res.json({updatedBookDatabase});
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

