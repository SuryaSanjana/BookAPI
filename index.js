require("dotenv").config();


//frame work
const express = require("express");
const mongoose = require("mongoose");



//database
const database = require("./database/index");
//Models
const BookModel = require("./database/book");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publication");

//initialising express
const shapeAI = express();

//configurations
shapeAI.use(express.json());

//establish database connection
mongoose
.connect(process.env.MONGO_URL,
  {
  
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true 
  }
)
 .then(() => console.log("connection established"));


/* API 
route            /
description      get all books
Access           PUBLIC
Parameters       NONE
Method           GET 
*/

shapeAI.get("/",async (req,res)=>{

  const getAllBooks = await BookModel.find(); // nocondition prvided becoz we need all books
   
    return res.json({getAllBooks});
});


 
/* API 
route            /is
description      get specific book based on isbn
Access           PUBLIC
Parameters       isbn
Method           GET 
*/

shapeAI.get("/is/:isbn",async (req,res)=>{

  const getSpecificBook = await BookModel.findOne({ISBN: req.params.isbn}); 
   
    // const getSpecificBook=database.books.filter(
    //     (book)=>book.ISBN===req.params.isbn
    // );
    

    //if mongodb didnt find any data it gives null =>false=>error msg displayed
    if(!getSpecificBook){
      return res.json({
        error :`No book found for the ISBN of ${req.params.isbn}`,
      });  
    }  
  return res.json({book:getSpecificBook});
});


/* API 
route            /c
description      get specific books based on category
Access           PUBLIC
Parameters       category
Method           GET 
*/

shapeAI.get("/c/:category",async (req,res)=>{

  const getSpecificBooks = await BookModel.findOne({category : req.params.category});//even though categry is an array , this works
  // const getSpecificBooks=database.books.filter(
  //   (book)=>book.category.includes(req.params.category)
  // );

 if(!getSpecificBooks){
   return res.json({
    error :`No book found for the category of ${req.params.category}`
   });  
  }  
 return res.json({book:getSpecificBooks});
});


/* API 
route            /ba
description      get specific books based on authors
Access           PUBLIC
Parameters       authors
Method           GET 
*/
 shapeAI.get("/ba/:authors", async(req,res)=>{

const getSpecificAuthorBooks = await BookModel.findOne({authors: req.params.authors});
//   const getSpecificAuthorBooks=database.books.filter(
//     (book)=>book.authors.includes(parseInt(req.params.authors)),
// );

if(!getSpecificAuthorBooks){
  return res.json({
    error :`No book found for  ${req.params.authors}`,
  });  
}  
return res.json({books:getSpecificAuthorBooks}); 
});



/* API 
route            /author
description      get all authors
Access           PUBLIC
Parameters       NONE
Method           GET 
 */

shapeAI.get("/author", async(req,res)=>{

  const getAllAuthors= await AuthorModel.find();
  return res.json({authors:getAllAuthors});
});


/* API 
route            /a
description      get all authors
Access           PUBLIC
Parameters       id
Method           GET 
//  */
shapeAI.get("/author/:id", async(req,res)=>{
  const getSpecificAuthor = await AuthorModel.findOne({id:req.params.id});
//  const getSpecificAuthor=database.authors.filter(
//    (author)=>author.id===parseInt(req.params.id)
//  );
 if(!getSpecificAuthor){
  return res.json({
    error :`No author found for the id  of ${req.params.id}`
  });  
 }
 return res.json({authors:getSpecificAuthor});
});


/* API 
route            /author
description      get authors based on isbn
Access           PUBLIC
Parameters       isbn of book
Method           GET 
 */
shapeAI.get("/a/:isbn",async(req,res)=>{

  const  getSpecificAuthors = await AuthorModel.findOne({books:req.params.isbn});
  //  const getSpecificAuthors = database.authors.filter(
  //     (author)=>author.books.includes(req.params.isbn)
  //   );
  
 if(!getSpecificAuthors){
  return res.json({
    error :`No author found for the isbn of ${req.params.isbn}`
  });
 }
  return  res.json({authors:getSpecificAuthors});
});


/* API 
route            /publications
description      get all publications
Access           PUBLIC
Parameters       NONE
Method           GET 
 */
shapeAI.get("/publications",async(req,res)=>{

  const getAllPublications = await PublicationModel.find();
 return res.json({publications:database.publications});
});



/* API 
route            /publications
description      get specific publication based on isbn
Access           PUBLIC
Parameters       id
Method           GET 
 */
shapeAI.get("/p/:id",async(req,res)=>{

  const getSpecificPublication = await PublicationModel.findOne({id:req.params.id});
  // const getSpecificPublication=database.publications.filter(
  //   (publication)=>publication.id===parseInt(req.params.id)
  // );
  if(!getSpecificPublication){
   return res.json({
     error :`No publication found with the id  of ${req.params.id}`
   });  
  }
  return res.json({authors:getSpecificPublication});
 });
 


/* API 
route            /publications
description      get specific publication based on isbn
Access           PUBLIC
Parameters       isbn
Method           GET 
 */

shapeAI.get("/pub/:isbn",async(req,res)=>{

  const   getSpecificPublications= await PublicationModel.findOne({books:req.params.isbn});
  // const getSpecificPublications=database.publications.filter(
  //   (publication)=>publication.books.includes(req.params.isbn)
  // );
  
 if(!getSpecificPublications){
  return res.json({
    error :`No publication found for the isbn of ${req.params.isbn}`
  });
 }
 return res.json({publications:getSpecificPublications });
});


/*
route            /book/new
description      add new books
Access           PUBLIC
Parameters       NONE
Method           POST

 */
shapeAI.post("/book/new", async (req,res)=>{
  //access body instead of parameter
  const {newBook} =req.body;  //directlycopying the object by destructuring

  const  addNewBook = BookModel.create(newBook);


  // database.books.push(newBook);

  return res.json({books:addNewBook , message:"book was added"});
});



/*
route            /author/new
description      add new author
Access           PUBLIC
Parameters       NONE
Method           POST

 */
shapeAI.post("/author/new",async (req,res)=>{
  const {newAuthor} =req.body;  //directlycopying the object by destructuring

  const addNewAuthor = AuthorModel.create(newAuthor);
  // database.authors.push(newAuthor);

  return res.json({authors:addNewAuthor, message:"author was added"});
});


/*
route            /publication/new
description      add new publication
Access           PUBLIC
Parameters       NONE
Method           POST

 */
shapeAI.post("/publication/new", async (req,res)=>{
  const {newPublication} =req.body;  //directlycopying the object by destructuring

  const addNewPublication = PublicationModel.create(newPublication);
  // database.publications.push(newPublication);

  return res.json({publications:addNewPublication, message:"publication was added"});
});


/*
route            /book/update
description      update book title
Access           PUBLIC
Parameters       ISBN
Method           PUT

 */
shapeAI.put("/book/update/:isbn",async(req,res)=>{

const updatedBook = await BookModel.findOneAndUpdate(
  {
    ISBN:req.params.isbn
  },
  {
    title:req.body.bookTitle,
  },
  {
    new:true,   //to get updated data assigned
  }
  );
  // //use forEach to directly modify the array
  // database.books.forEach((book)=>{
  //  if(book.ISBN===req.params.isbn) {
  //  book.title=req.body.bookTitle;   //update title
  //  return ;
  //  }
  //  });
  return res.json({books:updatedBook});
});


/*
route            /book/author/update
description      update or add new author
Access           PUBLIC
Parameters       ISBN
Method           Put

 */
shapeAI.put("/book/author/update/:isbn",async(req,res)=>{
 //updte book database
  const updatedBook = await BookModel.findOneAndUpdate(
    {
      ISBN:req.params.isbn
    },
    {
      $addToSet:{
        authors:req.body.newAuthor
      }
    },
    {
      new:true,
    }
  );

  
  // database.books.forEach((book)=>{
  //   if(book.ISBN===req.params.isbn) {
  //     return book.authors.push(req.body.newAuthor); //pushing new author id 
  //   }
  // });



  //update author database
   const updatedAuthor = await AuthorModel.findOneAndUpdate(
    {
      id:req.body.newAuthor
    },
    {
      $addToSet:{
        books:req.params.isbn,
      }
    },
    {
      new:true,
    }
   );


  // database.authors.forEach((author)=>{
  // if(author.id===req.body.newAuthor) 
  // return author.books.push(req.params.isbn);
  // });
  return res.json({
    books:updatedBook,
    authors:updatedAuthor,
    message :"new author was added",
  });
});



/*
route            /author/update
description      update author name using id
Access           PUBLIC
Parameters       id
Method           PuT

 */
shapeAI.put("/author/update/:Id",(req,res)=>{
  //use forEach to directly modify the array
  database.authors.forEach((author)=>{
   if(author.id===parseInt(req.params.Id)) {
   author.name=req.body.authorName;   //update author name
   return ;
   }
   });
  return res.json({authors:database.authors});
});


/*
route            /publication/update
description      update publication  name using id
Access           PUBLIC
Parameters       id
Method           Put

 */
shapeAI.put("/publication/update/:Id",(req,res)=>{
  //use forEach to directly modify the array
  database.publications.forEach((publication)=>{
   if(publication.id===parseInt(req.params.Id)) {
   publication.name=req.body.publicationName;   //update author name
   return ;
   }
   });
  return res.json({publications:database.publications});
});




/*
route            /publication/update/book
description      update or add new book to a publication
Access           PUBLIC
Parameters       isbn
Method           PUT

 */
shapeAI.put("/publication/update/book/:isbn",(req,res)=>{
 // update publication database
  database.publications.forEach((publication)=>{
     if(publication.id===req.body.pubId){
      return  publications.books.push(req.params.isbn);
     }
  });
  // update book database
  if(book.ISBN===req.params.isbn){
    book.publication= req.body.pubId;
    return ;
  }
  return res.json(
    {books:database.books , 
    publications:database.publications,
    message : "publication updated"
   });
});


/*
route            /book/delete
description      delete a book
Access           PUBLIC
Parameters       isbn
Method           DELETE

 */ 
shapeAI.delete("/book/delete/:isbn",async(req,res)=>{

  const updatedBookDatabase =await BookModel.findOneAndDelete(
    {
      ISBN:req.params.isbn,
    }
  );
  // const updatedBookDatabase = database.books.filter((book)=>{
  //  book.ISBN!== req.params.isbn
  // });
  // database.books = updatedBookDatabase;  //filter returns new array so we need to store it in a variable
  return res.json({books : updatedBookDatabase});
});



/*
route            /book/delete/author
description      delete an author from book
Access           PUBLIC
Parameters       isbn
Method           DELETE

 */
shapeAI.delete(" /book/delete/author/:isbn/:authorId",async(req,res)=>{
  
  // update book database                                    //doubt
  const updatedBook= await BookModel.findOneAndUpdate(
    {
     ISBN:req.params.isbn,
    },
    {
      $pull:{
        authors:parseInt(req.params.authorId)
      }
    },
    {
      new:true
    }
  );

  // //use foreach becoz we update only one property not whole database
  // database.books.forEach((book)=>{
  //   if(book.ISBN===req.params.isbn){
  //    const newAuthorList = book.authors.filter(
  //    (author)=> author!==parseInt(req.arams.authorId)
  //    );
  //    book.authors = newAuthorList;
  //    return ;
  //   }
  // });


  // update author database
const updatedAuthor=await AuthorModel.findOneAndUpdate(
  {
    id:parseInt(req.params.authorId)
  },
  {
    $pull:{
     books:req.params.isbn,
    }
  },
  {
    new:true,
  }
);

  //  database.authors.forEach((author)=>{
  //   if(author.id===parseInt(req.params.authorId)){
  //     const newBooksList= author.books.filter(
  //       (book) => book!==req.params.isbn
  //     );
  //     author.books = newBooksList;
  //     return ;
  //   }
  // });
   return res.json({
    books:updatedBook,
    authors:updatedAuthor,
    message:"author was deleted"
  });
});



/*
route            /author/delete
description      delete an author
Access           PUBLIC
Parameters       id
Method           DELETE                            //doubt

 */
shapeAI.delete("/author/delete/:id",(req,res)=>{
  const updatedAuthorDatabase = database.authors.filter((author)=>{
   author.id!== parseInt(req.params.id)
  });
  database.authors = updatedAuthorDatabase;  //filter returns new array so we need to store it in a variable
  return res.json({authors : database.authors});
});



/*
route            /publication/delete
description      delete a publication
Access           PUBLIC
Parameters       id
Method           DELETE                            //doubt

 */
shapeAI.delete("/publication/delete/:id",(req,res)=>{
  const updatedPublicationDatabase = database.publications.filter((publication)=>{
   publication.id!== parseInt(req.params.id)
  });
  database.publications = updatedPublicationDatabase;  //filter returns new array so we need to store it in a variable
  return res.json({publications : database.publications});
});

/*
route            /publication/delete/book
description      delete book from publications
Access           PUBLIC
Parameters       isbn, pubId
Method           DELETE

 */
shapeAI.delete("/publication/delete/book/:isbn/:pubId",(req,res)=>{
  //update publication database
  database.publications.forEach((publication)=>{
    
    if(publication.id===parseInt(req.params.pubId)){
    const newBooksList=publication.books.filter(
    (book)=> book!==req.params.isbn
    );
    publications.books=newBooksList;
    return;
   }

  });

  // update book database
  database.books.forEach((book)=>{
   
    if(book.ISBN===parseInt(req.params.isbn)){
     
      book.publication = 0; //no publication available
      return;
    }
  });
  return res.json({
   books:database.books,
   publications:database.publications,
  });

});

shapeAI.listen(3000,()=>console.log("Server Running"));
