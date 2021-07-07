
let books = [
    {
      ISBN: "12345ONE",
      title: "Getting started with MERN",
      authors: [1, 2],
      language: "en",
      pubDate: "2021-07-07",
      numOfPage: 225,
      category: ["fiction", "programming", "tech", "web dev"],
      publication: 1
    },
    {
        ISBN: "12345Two",
        title: "Getting started with PYTHON",
        authors: [1,2],
        language: "en",
        pubDate: "2021-07-07",
        numOfPage: 225,
        category: ["fiction", "tech", "web dev"],
        publication: 1
      },
];
const authors = [
    {
      id: 1,
      name: "pavan",
      books: ["12345ONE","12345Two"]
    },
    {
      id: 2,
      name: "Deepak",
      books: ["12345ONE"]
    },
];

const publications=[
    {
        id:1,
        name:"Chakra",
        books:["12345ONE"]
    },
   
];

//to export a data in nodejs
module.exports={books,authors,publications};

  
  
