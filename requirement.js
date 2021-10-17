//Requirement for our project

//We are a book management company

//BOOKS
//ISBN, title, pub date, language, num page, author[], category[]

//AUTHORS
//id, name, books[]

//PUBLICATION
//id, name, books[]

//We have to design and code an API over this

//1. BOOKS
//                                                                          MONGODB
//We need an API :-
//To get all the books---------------------------------------DONE-----------DONE
//To get specific book---------------------------------------DONE-----------DONE
//To get a list of books based on category-------------------DONE-----------DONE
//To get a list of books based on languages------------------COMPLETD-------DONE

//2.AUTHORS
//We need an API :-
//To get all the authors-------------------------------------DONE-----------DONE
//To get a specific author based on id-----------------------COMPLETED------DONE
//To get list of authors based on books----------------------DONE-----------DONE

//PUBLICATIONS
//We need an API:-
//To get all the publications--------------------------------DONE-----------DONE
//To get a specific publication by id------------------------COMLETED-------DONE
//To get a list of publication based on a book---------------COMPLETED------DONE

//POST REQUEST
//1. ADD NEW BOOK--------------------------------------------DONE-----------DONE
//2. ADD NEW PUBLICATION-------------------------------------DONE-----------DONE
//3. ADD NEW AUTHOR------------------------------------------DONE-----------DONE


//PUT
//1. Update book details if publication is changed-----------DONE-----------DONE
//2. Update book title------------------------------------------------------DONE
//3. ADD new author to a book , and book to author--------------------------DONE

//DELETE
//1. Dlete a book--------------------------------------------DONE-----------DONE
//2. Delete author from book---------------------------------COMPLETED------DONE but using PUT not DELETE*****
//3. Delete aythor from book and related book from author----DONE-----------DONE but using PUT not DELETE*****


//MongoDB does not use scheme but mongoose do use it
//Schema->  basically a blueprint of how data has to constructed
//Mongoose helps in validation
//validation -> checking like correct input is given or not, security, helps in checking relationship with other data
//model -> document/datbase,  similar to schema;document model of MongoDB


//Work flow
//Schema -> Model -> use them.
