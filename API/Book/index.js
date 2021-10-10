// Initializing express router
const Router = require("express").Router();

const { Error } = require("mongoose");
// Database models
const BookModel = require("../../database/book");

/* 
Route              /
Description        get all books
Access             public
Parameter          none
Methods            get  
*/
Router.get("/", async (req, res) => {
    const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);
});

/* 
Route              /is
Description        get specific books based on ISBN
Access             public
Parameter          ISBN
Methods            get  
*/
Router.get("/is/:isbn", async (req, res) => {

    const getSpecificBook = await BookModel.findOne({ISBN: req.params.isbn})

    if(!getSpecificBook) {
        return res.json({
            error: `No book found for the ISBN of ${req.params.isbn}`,
        });
    }

    return res.json({book: getSpecificBook });
});


/* 
Route              /c
Description        get specific books based on category
Access             public
Parameter          category
Methods            get  
*/
Router.get("/c/:category", async (req, res) => {
    const getSpecificBook = await BookModel.findOne({
        category: req.params.category, 
    });

   //const getSpecificBook = database.books.filter((book) =>
   //     book.category.includes(req.params.category) 
   // );

    if(!getSpecificBook) {
        return res.json({
            error: `No book found for the category of ${req.params.category}`,
        });
    }

    return res.json({book: getSpecificBook });

});

/* 
Route              /l
Description        get specific books based on language
Access             public
Parameter          language
Methods            get  
*/
Router.get("/l/:language", (req, res) => {
    const getSpecificBook = database.books.filter((book) =>
        book.language.includes(req.params.language) 
    );

    if(getSpecificBook.length === 0) {
        return res.json({
            error: `No book found of the ${req.params.language} language`,
        });
    }

    return res.json({book: getSpecificBook });

});

/* 
Route              /book/new
Description        add new book
Access             public
Parameter          none
Methods            POST
*/
Router.post("/new", async (req,res) => {
    try {
        const { newBook } = req.body;

        await BookModel.create(newBook);

   
      return res.json({message: "Book was added!"});
    } catch (error) {
        //throw new Error(error);
        return res.json({error: error.message});
    }
});

/* 
Route              /book/update/title
Description        update title of a book
Access             public
Parameter          none
Methods            PUT
*/
Router.put("/update/title/:isbn", async (req, res) => {

    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn,
        },
        {
            title: req.body.bookTitle,
        },
        {
            new: true,
        }
    );

    return res.json({books: updatedBook})
});

/* 
Route              /book/update/author
Description        update/add new author for a book
Access             public
Parameter          none
Methods            PUT
*/
Router.put("/update/author/:isbn", async (req, res) => {
    //update book database
    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn,
        },
        {
            $addToSet: {
                author: req.body.newAuthor,
            },
        },
        {
            new: true,
        },
    );

// database.books.forEach((book) => {
    //     if (book.ISBN === req.params.isbn){
    //         return book.author.push(parseInt(req.params.authorID));
    //     }
    // });

    //update author database
    
    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        {
            id: req.body.newAuthor,
        },
        {
            $addToSet: {
                books: req.params.isbn,
            },
        },
        {
            new: true
        }
    );



    // database.author.forEach((author) => {
    //     if (author.id === parseInt(req.params.authorID))
    //         return author.books.push(req.params.isbn);
    // });
    return res.json({
        books: updatedBook,
        author: updatedAuthor,
        message: "new author was added", 
    });
});


/* 
Route              /book/delete
Description        delete a book
Access             public
Parameter          isbn
Methods            DElete
*/
Router.delete("/book/delete/:isbn", async (req, res) => {
    const updatedBookDatabase = await BookModel.findOneAndDelete({
        ISBN: req.params.isbn,
    });
    
    
    //     const updatedBookDatabase = database.books.filter(
    //         (book) => book.ISBN !== req.params.isbn
    //     );
    //  database.books = updatedBookDatabase;
     return res.json({ books: updatedBookDatabase});
});


/* 
Route              /book/delete/author
Description        delete an author from a book
Access             public
Parameter          isbn
Methods            DElete
*/
Router.delete("/delete/author/:isbn/:authorID", async (req, res) =>{
    //update the book database

    const updatedBook = await BookModel.findOneAndUpdate({
        ISBN: req.params.isbn,
    },
    {
        $pull: {
            author:parseInt(req.params.authorID),
        },
    },
    {
        new: true
    }
    );



    // database.books.forEach((book) => {
    //     if(book.ISBN === req.params.isbn){
    //         const newAuthorList = book.author.filter(
    //             (auth) => auth !== parseInt(req.params.authorID)
    //         );
    //         book.author = newAuthorList;
    //         return;
    //     }
    // });
    // update the author database
    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        {
            id: parseInt(req.params.authorID),
        },
        {
            $pull: {
                books: req.params.isbn,
            },
        },
        {
            new: true
        });


    // database.author.forEach((auth) => {
    //     if(auth.id === parseInt(req.params.authorID)){
    //         const newBooksList = auth.books.filter(
    //             (book) => book !== req.params.isbn
    //         );
    //         auth.books = newBooksList;
    //     }
    // });

    return res.json({ 
        book: updatedBook, 
        auth: updatedAuthor,
        message: "author was deleted!!!!😢",
    });
});

module.exports = Router;