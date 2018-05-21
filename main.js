/* ITC 230 Nicole Brown. 
* Assignment 5 Database Integration
* PLEASE NOTE: File shoud be named index.js, I named it main.js by mistake. 
*/

/*routing*/

var Book = require('./models/bookdb');
//var books = require('./book'); //remove this eventually
'use strict';
const express = require("express");
const app = express();

app.set('port', process.env.PORT || 3001);
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(require("body-parser").urlencoded({extended: true})); // parse form submissions

let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");

// send static file as response
app.get('/', (req, res) => {
res.render('home');
});


/*******START OF db SCRIPTS**************************************/
//Find one book in the db
app.get('/get', (req,res) => {
 console.log(req.query.title);
 Book.findOne({ title: req.query.title.toLowerCase()}, (err, book) => {
  console.log(err);
  console.log(book);
  if(err) return (err);
  res.type('text/html');
 res.render('details', {title: req.query.title, result: book });
 });
});

// Post one book from the db
app.post('/get', (req,res) => {
 Book.findOne({title: req.body.title}, (err, book) => {
 if (err) return (err);
  res.type('text/html');
  res.render('details', { title: req.body.title, book });
  });
});

// get all the books in the db
app.get('/getAll', (req, res) => {
 Book.find({}, (err,title) => {
 if (err) return (err);
 console.log(title.length);
 res.render('home', {book: title });
 
 });
});

//DANGER ZONE!!!!! Deletes one book
app.get('/delete', (req,res, next) => {
   Book.remove({title: req.query.title }, (err, result) => {
       //console.log(err);
      let deleted = result;
      //console.log(deleted);
        if (err) return next(err);
            res.type('text/html'); 
            res.render('delete', {title: req.query.title, deleted: deleted});
       });
   }); 
   

//Updates a book.
app.post('/add', (req, res, next) => {
   Book.update({"title": req.body.title, 
   "author": req.body.author, 
   "isbn": req.body.isbn, 
   "pubdate": req.body.pubdate,  
   "quantity": req.body.quantity } , (err, result) => {
      if (err) return next(err);
       let added = result;
            res.type('text/html');
            res.render('add', {title: req.body.title, added: added});
        });
    }); 

//attempts to append a book, however it updates one record as above...
// app.post('/add', (req, res, next) => {
//    Book.insert({"title": req.body.title, 
//    "author": req.body.author, 
//    "isbn": req.body.isbn, 
//    "pubdate": req.body.pubdate,  
//    "quantity": req.body.quantity } , (err, result) => {
//       if (err) return next(err);
//        let added = result;
//             res.type('text/html');
//             res.render('add', {title: req.body.title, added: added});
//         });
//     }); 

//Adds new book. This approach works
app.post('/add', (req, res, next) => {
    let obj = {
        title: req.body.title, 
        author: req.body.author,
        isbn: req.body.isbn,
        pubdate: req.body.pubdate,
        quantity: req.body.quantity,
    };
    Book.create(obj, (err, albums) =>{
        if(err) return next(err);
        res.type('text/html');
        res.render('add', {result: Book, title: req.query.title});
    });
});


// define 404 handler
app.use((req,res) => {
 res.type('text/plain'); 
 res.status(404);
 res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
 console.log('Express started'); 
});



