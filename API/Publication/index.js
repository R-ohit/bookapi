const Router = require("express").Router;

const PublicationModel = require("../../database/publication");

/* 
Route              /publication
Description        get all publications
Access             public
Parameter          none
Methods            get  
*/
Router.get("/", (req, res) => {
    return res.json({ publication: database.publication });
});
 
 
 
/* 
Route              /publication/new
Description        add new publication
Access             public
parameter          none
Methods            POST
*/
Router.post("/new", async (req,res) => {
     const { newPublication } = req.body;
 
     PublicationModel.create(newPublication);
     return res.json({message: "publication was added"});
});
 
 
/* 
Route              /publication/update/book 
Description        update/add new author to a publication
Access             public
Parameter          isbn
Methods            PUT
*/
Router.put("/update/book/:isbn", (req, res) => {
     // update the publication database
     database.publication.forEach((publicatio) => {
         if(publicatio.id === req.body.pubID) {
             return publicatio.books.push(req.params.isbn);
         }
     });
     //update the book database
     database.books.forEach((book) => {
         if(book.ISBN === req.params.isbn) {
             book.publicatio = req.body.pubID;
             return;
         }
     });
 
     return res.json({
         books: database.books,
         publication : database.publication,
         message: "successfully updated publication",
     });
});

//TODO: Student Task
/*
Route               /publication/delete
Description         delete an publication
Access              PUBLIC
Parameters          id
Method              DELETE
*/
// Router.delete("/delete/:id", (req, res) => {
//     const { id } = req.params;

//     const filteredPub = Database.Publication.filter(
//         (pub) => pub.id !== parseInt(id)
//     );

//     Database.Publication = filteredPub;

//     return res.json(Database.Publication);
// });

/* 
Route              /publication/delete/book
Description        delete publication book
Access             public
Parameter          isbn, publication id
Methods            DElete
*/
Router.delete("/delete/book/:isbn/:pubID", (req,res) => {
    //update publication database
    database.publication.forEach((publicatio) => {
        if(publicatio.id === parseInt(req.params.pubID)){
            const newBooksList = publicatio.books.filter(
                (book) => book !== req.params.isbn
            );
            publicatio.books = newBooksList;
            return;
        }
    });
    //update book database
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            book.publication = 0; //no publication
            return;
        }
    });

    return res.json({
        books: database.books,
        publicatio: database.publication,
    })
});

module.exports = Router;