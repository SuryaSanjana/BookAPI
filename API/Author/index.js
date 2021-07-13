const Router = require("express").Router();

const AuthorModel=require("../../database/author");
    
    
/* API 
    route            /ba
    description      get specific books based on authors
    Access           PUBLIC
    Parameters       authors
    Method           GET 
    */
Router.get("/:authors", async(req,res)=>{
    
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
        
Router.get("/", async(req,res)=>{
        
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
Router.get("/:id", async(req,res)=>{
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
Router.get("/:isbn",async(req,res)=>{
        
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
    
    
    
/*
    route            /author/new
    description      add new author
    Access           PUBLIC
    Parameters       NONE
    Method           POST
    
*/
Router.post("/new",async (req,res)=>{
        const {newAuthor} =req.body;  //directlycopying the object by destructuring
      
        const addNewAuthor = AuthorModel.create(newAuthor);
        // database.authors.push(newAuthor);
      
        return res.json({authors:addNewAuthor, message:"author was added"});
});
    
    
    
/*
    route            /author/update
    description      update author name using id
    Access           PUBLIC
    Parameters       id
    Method           PuT
    
*/
Router.put("/update/:Id",(req,res)=>{
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
    route            /author/delete
    description      delete an author
    Access           PUBLIC
    Parameters       id
    Method           DELETE                            //doubt
    
*/
    Router.delete("/delete/:id",(req,res)=>{
        const updatedAuthorDatabase = database.authors.filter((author)=>{
         author.id!== parseInt(req.params.id)
        });
        database.authors = updatedAuthorDatabase;  //filter returns new array so we need to store it in a variable
        return res.json({authors : database.authors});
});
       
      
      
      
        
 module.exports = Router;