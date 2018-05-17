var Book = require('./models/bookdb');

Book.find({},(err, books) => {
    console.log(books)
});