//to implement microServices we have to divde APIs using Routers from express
//Router ->(express by default provide routers)

//Initialising express Router
const Router = require("express").Router();

//DatabaseModel
const BookModel=require("../../database/book");

/* API 
route            /
description      get all books
Access           PUBLIC
Parameters       NONE
Method           GET 
*/

Router.get("/",async (req,res)=>{

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

Router.get("/is/:isbn",async (req,res)=>{

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
  
Router.get("/c/:category",async (req,res)=>{
  
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


/*
route            /book/new
description      add new books
Access           PUBLIC
Parameters       NONE
Method           POST
*/
Router.post("/new", async (req,res)=>{
    try{
        //access body instead of parameter
    const {newBook} =req.body;  //directlycopying the object by destructuring
  
    const  addNewBook = await BookModel.create(newBook);
  
  
    // database.books.push(newBook);
  
    return res.json({books:addNewBook , message:"book was added"});
    }catch(error){
        return res.json({error:error.message});
    }
});


/*
route            /book/update
description      update book title
Access           PUBLIC
Parameters       ISBN
Method           PUT
*/
Router.put("/update/:isbn",async(req,res)=>{

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
Router.put("/author/update/:isbn",async(req,res)=>{
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
route            /book/delete
description      delete a book
Access           PUBLIC
Parameters       isbn
Method           DELETE

 */ 
Router.delete("/delete/:isbn",async(req,res)=>{

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
Router.delete(" /delete/author/:isbn/:authorId",async(req,res)=>{
    
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
  
  
  
module.exports = Router;
