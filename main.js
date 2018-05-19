/* ITC 230 Nicole Brown. 
* Assignment 5 Database Integration
* PLEASE NOTE: File shoud be named index.js, I named it main.js by mistake. 
*/

/*routing*/

var Book = require('./models/bookdb');
var books = require('./book'); //remove this eventually
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
 // console.log(err);
  //console.log(Book);
 if (err) return (err);
 console.log(title.length);
 res.render('home', {book: title });
 
 });
});

//DANGER ZONE!!!!!
app.get('/delete', (req,res, next) => {
   Book.remove({title: req.query.title }, (err, result) => {
       console.log(result);
       console.log(err);
      let deleted = result;
      console.log(deleted);
        if (err) return next(err);
            res.type('text/html'); 
            res.render('delete', {title: req.query.title, deleted: deleted});
       });
   }); 
   

 //add a new book to the db. This should be insert
app.post('/add', function (req, res,next) {
    Book.insert({ "title": req.body.title, "author": req.body.author,
    "pubdate": req.body.pubdate, "quantity": req.body.quantity}, 
     (err, result) => {
        if (err) return next(err);
      
      
            res.type('text/html');
            res.render('Add', { result, total: total });
        });
    }); 

/****************OLD CODE FROM ASSIGNMENT 3**********************************************************/
//send content of 'home' view
app.get('/get', (req,res) => {
let result = books.findTitle(req.query.title);
res.render('details', {title: req.query.title, result: result });
});

//post a title
app.post('/get', (req,res) => {
let result = books.findTitle(req.body.title);
res.render('details', {title: req.body.title, result: result });
});

// //get all books
// app.get('/get', (req, res) => {
// console.log(req.query);
// var found = books.getAllBooks(req.query.title);
// res.render('details', {title: req.query.title, result: found, books: books.getAllBooks()});
// });

//deletes one item
app.get('/delete', (req,res) => {
//console.log(req.query.title);
let result = books.delete(req.query.title);
console.log(result);
res.render('delete', {title: req.query.title, result: result });
});

//posts results of delete action
app.post('/get', function (req, res) {
let result = books.delete(req.body.title);
res.render('details', {title: req.body.title, result: result });
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



