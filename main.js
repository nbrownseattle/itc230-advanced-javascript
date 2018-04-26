/* ITC 230 Nicole Brown. 
* Assignment 1 Get Node.js up and running.
* PLEASE NOTE: File shoud be named index.js, I named it main.js by mistake. 
*/

/*routing*/

var http = require("http"); 
var fs = require("fs");
var books = require('./book');


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
       
        case'/getall':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write(JSON.stringify(books.getAllBooks()));
            res.end('results');
            break;
            
        case'/get':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write(JSON.stringify(books.findTitle('beekeeping for dummies')));
            res.end('results');
            break;
            
        case'/delete':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write(JSON.stringify(books.delete('beekeeping for dummies')));
            res.end('results');
            break; 
            
        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Not found');
            break;
            
}
        
        }).listen(process.env.PORT || 3000); 


