/* ITC 230 Nicole Brown. 
* Assignment 1 and adds book list portion of assignment 2.
* PLEASE NOTE: File shoud be named index.js, I named it main.js by mistake. 
*/

//*routing*/

var http = require("http"); 
var fs = require("fs");
var getall = require('./book');

http.createServer(function (req,res) {
    //changes url to lower
    var path = req.url.toLowerCase();
    
    //switch to path
    switch(path) {
        case '/':
            fs.readFile('home.html',function(err,data) {
              // if(err) return console.error(err);
              if (err) return console.error(err);
              res.writeHead(200, {'Content-Type':'text/html'});
              res.end(data);
              console.log(data.toString());
            });
            break;
        case '/about':
              res.writeHead(200, {'Content-Type': 'text/plain'});
              res.end('about page');
              break;
        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
              res.end('Not found');
              break;
           
        case'/getall':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write(getall.getAllBooks());
            res.end('results');
              break;
        
    } 
        
        }).listen(process.env.PORT || process.env.IP); 


