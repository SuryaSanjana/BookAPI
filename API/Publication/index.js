
const Router = require("express").Router();

const PublicationModel=require("../../database/publication");


/* API 
route            /publications
description      get all publications
Access           PUBLIC
Parameters       NONE
Method           GET 
*/
Router.get("/",async(req,res)=>{

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
Router.get("/:id",async(req,res)=>{
  
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
  
Router.get("/:isbn",async(req,res)=>{
  
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
route            /publication/new
description      add new publication
Access           PUBLIC
Parameters       NONE
Method           POST

*/
Router.post("/new", async (req,res)=>{
    const {newPublication} =req.body;  //directlycopying the object by destructuring
  
    const addNewPublication = PublicationModel.create(newPublication);
    // database.publications.push(newPublication);
  
    return res.json({publications:addNewPublication, message:"publication was added"});
});

/*
route            /publication/update
description      update publication  name using id
Access           PUBLIC
Parameters       id
Method           Put

 */
Router.put("/update/:Id",(req,res)=>{
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
Router.put("/update/book/:isbn",(req,res)=>{
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
route            /publication/delete
description      delete a publication
Access           PUBLIC
Parameters       id
Method           DELETE                            //doubt

 */
Router.delete("/delete/:id",(req,res)=>{
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
Router.delete("/delete/book/:isbn/:pubId",(req,res)=>{
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
  
module.exports=Router;