Requirements =>

books
 - ISBN             - String
 - Title            - String
 - Author           - [Number]
 - Language         - String
 - Publications     - Number
 - NumOfPages       - Number
 - Categories       - [String]

author
 - id               - Number
 - name             - String
 - books            - [Sting]

publication
 - id               - Number
 - name             - String
 - books            - [Sting]

Type of API used =>
- Get
- Post
- Put
- Delete

BOOKS =>

  || GET
     - to get all books 
     - to get specific book 
     - to get list of books based on category 
     - to get lst of books based on lang.
  || POST
     - to add new books
  || PUT
     - to update book title 
     - to update/add new author for a book
  || DELETE
     - delete a book
     - delete an author
     
-------------------------------------------------- 

AUTHOR =>

  || GET 
     - to get all authors
     - to get specific authors
     - to get list of authors based on books
  || POST 
     - add new author
  || PUT
     - update author name using it's id
  || DELETE
     - delete an author
     
--------------------------------------------------

PUBLICATION =>

  || GET 
     - to get all publication
     - to get specific publication
     - to get list of publication based on books
  || POST
     - add new publications
  || PUT
    - update the publication name using its id
    - update/add new books to publications
  || DELETE
    - delete the publication
    - delete a book from publication
     
    
     
     
