/* ITC 230 Nicole Brown. 
* Assignment 3 Express yourself
* PLEASE NOTE: File shoud be named index.js, I named it main.js by mistake. 
*/

/*routing*/

var books = require('./book');
'use strict'
const express = require("express");
const app = express();

app.set('port', process.env.PORT || 3001);
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(require("body-parser").urlencoded({extended: true})); // parse form submissions

//
let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html")


{// send static file as response
app.get('/', (req, res) => {
res.render('home');
});
    
app.get('/about', (req, res) => {
 res.type('text/plain');
 res.send('About page');
});

// app.get('/get', (req, res) => {
// res.type('text/plain');
// //res.send('About page');
// });

// send content of 'home' view
app.get('/get', (req,res) => {
let result = books.findTitle(req.query.title);
res.render('details', {title: req.query.title, result: result });
});

app.post('/get', (req,res) => {
let result = books.findTitle(req.body.title);
res.render('details', {title: req.body.title, result: result });
});

app.get('/getall', (req, res) => {
res.type('text/plain');
//res.send('About page');
});
app.get('/delete', (req, res) => {
res.type('text/plain');
//res.send('About page');
});

// define 404 handler
app.use( (req,res) => {
 res.type('text/plain'); 
 res.status(404);
 res.send('404 - Not found');
});

}

app.listen(app.get('port'), () => {
 console.log('Express started'); 
});
  
        
 

