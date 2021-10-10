const Router = require("express").Router();
const AuthorModel = require("../../database/author");

/* 
Route              /author
Description        get all authors 
Access             public
Parameter          none
Methods            get  
*/
Router.get("/", async (req, res) => {
    const getAllAuthors = await AuthorModel.find();
    return res.json({ authors: getAllAuthors})
});

/* 
Route              /author/book
Description        get all authors based on books
Access             public
Parameter          isbn
Methods            get  
*/
Router.get("/book/:isbn", (req, res) => {
    const getSpecificAuthor = database.author.filter((author) =>
        author.books.includes(req.params.isbn) 
    );

    if(getSpecificAuthor.length === 0) {
        return res.json({
            error: `No book found for the book of ${req.params.isbn}`,
        });
    }
});

/* 
Route              /author/new
Description        add new author
Access             public
Parameter          none
Methods            POST
*/
Router.post("/new", async (req, res) => {
    const { newAuthor } = req.body;
    AuthorModel.create(newAuthor);
    
    return res.json({message: "author was added"});
});
 
/* 
Route              /author/delete
Description        delete an author
Access             public
Parameter          id
Methods            delete
*/
Router.delete("/delete/:id", (req, res) => {
    const {id} = req.params;
    const filteredAuthors = database.author.filter(
        (author) => author.id !== parseInt(id)
    );
    database.author = filteredAuthors;
    return res.json(database.author);
});

module.exports = Router;