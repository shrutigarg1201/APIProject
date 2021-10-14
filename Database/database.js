const books = [
    {
        ISBN : "12345Book",
        title: "Tesla!!!",
        pubDate: "2021-08-05",
        language: "en",
        numPage: 250,
        author: [1,2],  //id of authors
        publication: [1],
        category: ["tech","space","education"]
    },
    {
        ISBN : "secretBook",
        title: "Secret",
        pubDate: "2021-08-06",
        language: "french",
        numPage: 300,
        author: [1],  //id of authors
        publication: [3],
        category: ["suspense","thrill"]
    }
]

const authors = [
    {
        id: 1,
        name: "Aradhana",
        books: ["12345Book","secretBook"]
    },
    {
        id: 2,
        name: "Elon Musk",
        books: ["12345Book"]
    }
]

const publications = [
    {
        id: 1,
        name: "writex",
        books: ["12345Book"]
    },
    {
        id: 2,
        name: "writex2",
        books: []
    },
    {
        id: 3,
        name: "bikaji",
        books: ["secretBook"]
    }
]

module.exports = {books, authors, publications};