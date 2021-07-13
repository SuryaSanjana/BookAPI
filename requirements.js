
// Requirements

// We are a company that handles book publications

// Book
// ISBN, Title, Author [], Language, Pub Date, Num Page, Category[]

// Authors
// Name, Id, Books[]

// Publications 
// Name, Id, Books[]



// Requirements

// Books

// We need an API
// to get all books
// to get specific book
// to get a list of books based on category
// to get a list of books based on author



//POST
//New book

//PUT
//update book datails
//update or add new author   // 1st  post -add new book , 2nd same post - put book/author/update; next url - add new author by id; come to prev url -put  update author id

//DELETE
//delete  book
//delete a author i.e,remove the book detail by author


// Author

// We need an API
// to get all authors
// to get specific author
// to get a list of authors based on a book isbn.

//POST
//New author

//PUT
// UpdateAuthor name using id

//DELETE
//delete an author himself

// Publication

// We need an API
// to get all publications
// to get specific publication
// to get a list of publications based on a book .

//POST
//Add new publication

//PUT
//update publication title using id
//update or add new to an publication

//DELETE
//delete a book from publication
//delete publication

// {
//     "newBook": {
//         "ISBN": "12345NEW",
//         "title": "Getting started with HTML",
//         "authors": [
//             1
//         ],
//         "language": "en",
//         "pubDate": "2021-07-07",
//         "numOfPage": 2000,
//         "category": [
//             "fiction",
//             "programming",
//             "tech",
//             "web dev",
//             "comedy"
//         ],
//         "publication": 1
//     }
// }


// {
//     "newAuthor": {
//         "id": 3,
//         "name": "aditi",
//         "books": []
//     }
// }

//--------------------------------------------------------------
    //MongoDB operators

 //update operators
     //=>$inc->increment  -to increment by 1 ->+1 , to decrement by 1->-1
     //=>$min->minimum
     //=>$max->maximum
     //=>$seet->sets a data to an object property 
     //$unset-> removes a property from an object
  // for arrays
     //$push
     //$pop
     //$pull->to extract a data from array->similar to filter
    //$addToSet-> checks for duplicates and then push if it is not present 




