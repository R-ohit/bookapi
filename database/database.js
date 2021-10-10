let books = [
    { 
      ISBN: "12345Book",
      title: "getting started with MERN",
      pubDate: "2021-07-07",
      language: "en",
      numPage: "250",
      author: [1, 2],
      publication: 1, 
      category: ["tech", "programming", "education", "thriller"],
    },
    { 
        ISBN: "12345Two",
        title: "getting started with python",
        pubDate: "2021-07-07",
        language: "en",
        numPage: "225",
        author: [1, 2],
        publication: 1, 
        category: ["programming", "education"],
      },
];

let author = [
    {
        id: 1,
        name: "Pavan",
        books: ["12345Book", "123456789Secret","12345Two"],
    },
    { id: 2, 
      name: "Elon musk",
      books: ["12345Book","12345Two"]
    },
];

let publication = [
    {
        id: 1,
        name: "writex",
        books: ["12345Book"],
    },
    {
        id: 2,
        name: "wick publications",
        books: [],
    },
];

module.exports = {books, author, publication };