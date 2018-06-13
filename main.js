/* ITC 230 Nicole Brown. 
* Assignment 8 React CRUD
* PLEASE NOTE: File shoud be named index.js, I named it main.js by mistake. 
*/

/*routing*/

var Book = require('./models/bookdb');
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
app.get('/', (req, res, next) => {
 Book.find((err,books) => {
     console.log(books);
 if (err) return next (err);
 res.render('home_app', {books: JSON.stringify(books)});
 
 });
});


/**************START OF API ROUTES*******************************/

// find one book in the db collection
app.get('/api/book/:title', (req, res, next) => {
    let title = req.params.title;
    console.log(title);
    Book.findOne({title: title}, (err, result) => {
        if (err || !result) return next(err);
        res.json( result );    
    });
});

// gets all the books in the db collection
app.get('/api/book', (req, res) => {
 Book.find({}, (err,books) => {
  if (err) return (err);
  console.log(books.length);
  res.json(books);
 
 });
});

//DANGER ZONE!!!!! Deletes one book from the db collection
app.get('/api/delete/:id', (req,res, next) => {
   Book.remove({"_id":req.params.id}, (err, result) => {
        if (err) return next(err);
           res.json({"deleted": result.n});
       });
   }); 
 
 // adds or updates one book to the db collection
app.post('/api/add/', (req, res, next) => {
    // find and update or add new book
  if (!req.body._id) { // insert new book
        let book = new Book({title:req.body.title,author:req.body.author,isbn:req.body.isbn,pubdate:req.body.pubdate,quantity:req.body.quantity});
        book.save((err,newBook) => {
            if (err) return next(err);
            console.log(newBook);
            res.json({updated: 0, _id: newBook._id});
        });
    } else { // update existing book
        Book.updateOne({ _id: req.body._id}, {title:req.body.title,author:req.body.author,isbn:req.body.isbn,pubdate:req.body.pubdate,quantity:req.body.quantity}, (err, result) => {
            if (err) return next(err);
            res.json({updated: result.nModified, _id: req.body._id});
        });
    }
});


/****************END API ROUTES***********************************/  

// define 404 handler
app.use((req,res) => {
 res.type('text/plain'); 
 res.status(404);
 res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
 console.log('Express started'); 
});


