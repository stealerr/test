var http = require('http');
var fs = require('fs');

//404 response
function send404( res ){
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write('Error 404: Page not found!');
    res.end();
}

//Handle a user request
function onRequest( req , res ){

    if( req.method == 'GET' && req.url == '/' ){
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream('./index.html').pipe( res );
    }else if( req.method == 'GET' && fs.existsSync( '.' + req.url ) ){
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream( '.' + req.url ).pipe( res );
    }else{
        send404( res );
    }

}

http.createServer(onRequest).listen(3000);
console.log('Server is running');
