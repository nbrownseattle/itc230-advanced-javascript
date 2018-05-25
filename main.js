/* ITC 230 Nicole Brown. 
* Assignment 6 Rest APIs
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
// get all the books in the db
app.get('/', (req, res) => {
 Book.find({}, (err,books) => {
 if (err) return (err);
 console.log(books.length);
 res.render('home_app', {books: JSON.stringify(books)});
 
 });
});



/**************START OF API ROUTES*******************************/

//Find one book in the db
app.get('/api/book/:title', (req,res) => {
 Book.findOne({ title: req.params.title.toLowerCase()}, (err, book) => {
  if(err) return (err);
  res.json(book);
 });
});

// get all the books in the db
app.get('/api/book', (req, res) => {
 Book.find({}, (err,books) => {
  if (err) return (err);
  console.log(books.length);
  res.json(books);
 
 });
});

//DANGER ZONE!!!!! Deletes one book
app.get('/api/delete/:title', (req,res, next) => {
   Book.remove({title: req.params.title }, (err, title) => {
       //console.log(err);
        if (err) return next(err);
           res.json(title);
       });
   }); 
   
 /*
 Add a book. This is throwing an error when I run the following test in browser:
 TEST
 https://itc230-workspace-nbrownseattle.c9users.io/api/book/add/:bee6/:test6/:6666666666/:2000/:1
 ERROR:
 CastError: Cast to number failed for value ":6666666666" at path "isbn"
 at new CastError 
 NOTES:
 My test in the url may be faulty or there is a problem with my code below..
 */

app.get('/api/book/add/:title/:author/:isbn/:pubdate/:quantity', (req, res, next) => {
   let title = req.params.title;
   console.log(typeof req.params.title);
   Book.update({title: title}, {title: title, author: req.params.author, 
   isbn: req.params.isbn, pubdate: req.params.pubdate, quantity: req.params.quantity}, {upsert: true }, (err, result) => {
       if (err) return next(err);
       res.json({updated: result.nModified});
   });
});


 //END API ROUTES  

/*******START OF old db SCRIPTS**************************************/

//Find one book in the db
app.get('/get', (req,res) => {
 console.log(req.query.title);
 Book.findOne({ title: req.query.title.toLowerCase()}, (err, book) => {
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
 Book.find({}, (err,books) => {
 if (err) return (err);
 console.log(books.length);
 res.render('home', {books: books });
 
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
   

//Updates a book. This works, but needs a UI
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

//Adds new book. This approach works
app.post('/add', (req, res, next) => {
    let obj = {
        title: req.body.title, 
        author: req.body.author,
        isbn: req.body.isbn,
        pubdate: req.body.pubdate,
        quantity: req.body.quantity,
    };
    
    Book.create(obj, (err, book) =>{
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



