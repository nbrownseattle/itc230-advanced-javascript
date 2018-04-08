// ITC 230 Nicole Brown. Get Node.js up and running.
/* PLEASE NOTE: File shoud be named index.js, I named it main.js. 
Server would not run when I tried to rename file. 
reverted filename back to main.js, and it runs. nbrown*/

//Import module

var http = require("http");

/*Create server*/

http.createServer(function (request, response) {
    //send the HTTP header
    //HTTP Status: 200 : OK
    //Content Type: text/plain
    response.writeHead(200, {'Content-Type': 'text/plain'});
    
    //Send the response body as "Hello World"
    response.end('Ciao Mondo!\n');
    //Use cloud9 port assignment or use port 3000.
}).listen(process.env.PORT || 3000);

